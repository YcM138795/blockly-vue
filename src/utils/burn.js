import {
    kermit_type_get,
    kermit_packet_size,
    kermit_packet_max,
    kermit_enc_max,
    kermit_header_make,
    kermit_data_push,
    kermit_sum_set,
    kermit_sum_make,
    kermit_recv_reset,
    KSTA_SUM_OK,
    kermit_recv,
    kermit_seq_inc
} from './kermit.js';

import { EventBus } from './eventBus';

"use strict";



if ("serial" in navigator) {
    console.log('支持端口通信');
} else {
    console.log('不支持端口通信');
}

var comport = undefined;
var baudrate = 2000000;

var comport_opened = false;

async function serial_request(refs) {
    var stat = refs.stat;
    try {
        // 请求串口
        comport = await navigator.serial.requestPort();
        console.log(comport.getInfo());

        if(comport){
            stat.value = "端口连接";
        }
        // 添加连接事件监听器
        // comport.addEventListener("connect", () => {
        //     stat.value = "端口连接";
        // });

        // 添加断开连接事件监听器
        // comport.addEventListener("disconnect", () => {
        //     stat.value = "COM PORT DISCONNECTED";
        //     comport.forget();
        //     comport = undefined;
        //     comport_opened = false;
        // });

    } catch (error) {
        console.error('Error requesting serial port:', error);
        stat.value = "请求串口失败"
    }
}





async function serial_forget(refs) {
    var stat = refs.stat;
    if (comport == undefined) {
        return;
    }
    try {
        await comport.forget();
        comport_opened = false;
        comport = undefined;
        stat.value = "已忘记这个端口";
    } catch (e) {
        stat.value = "忘记端口失败";
        console.error(e);
    }
}

async function serial_open(refs) {
    var stat = refs.stat;
    if (comport == undefined) {
        stat.value = "请先连接端口";
        return;
    }
    if (comport_opened) {
        stat.value = "端口已打开";
        return;
    }
    try {
        await comport.open({ baudRate: baudrate });
        comport_opened = true;
        stat.value = "端口打开成功";
        serial_rx();
    } catch (e) {
        stat.value = "端口打开失败";
        comport_opened = false;
        console.error(e);
    }
}

var reader;

async function serial_close(refs) {
    var stat = refs.stat;
    if ((comport != undefined) && comport_opened) {
        try {
            reader.cancel();
            reader.releaseLock();
            comport_opened = false;
            await comport.close();
            stat.value = "COM PORT CLOSE OK";
        } catch (e) {
            comport_opened = true;
            stat.value = "COM PORT CLOSE FAIL";
            console.error(e);
        }
        return;
    }
}

var krun = false;

var krxfifo_limit = 8192;
var krxfifo = [];

function krxfifo_push(val) {
    if (krxfifo.length >= krxfifo_limit) {
        return;
    }
    krxfifo.push(val);
}

function krxfifo_count() {
    return krxfifo.length;
}

function krxfifo_pop() {
    return krxfifo.shift();
}

async function serial_rx() {
    if (!comport_opened) {
        return;
    }
    var i;
    // var x;
    while (comport.readable && comport_opened) {
        let flag = 1
        reader = comport.readable.getReader();
        try {
            while (flag == 1) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                for (i = 0; i < value.length; i++) {
                    // x = String.fromCharCode(value[i]);
                    if (krun) {
                        krxfifo_push(value[i]);
                    }
                }
                //console.log(value);
            }
        } catch (e) {
            console.log(e);
        } finally {
            reader.releaseLock();
        }
    }
}

function strarr2intarr(strarr) {
    var i;
    var intarr = new Array(strarr.length);
    for (i = 0; i < strarr.length; i++) {
        intarr[i] = strarr[i].charCodeAt();
    }
    return intarr;
}

async function serial_txs(str) {
    var arr;
    arr = str.split('');
    await serial_txa(strarr2intarr(arr));
}

function delay_ms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function serial_txa(arr) {
    if (comport == undefined) {
        // stat.value = "PLEASE CLICK REQUEST";
        return;
    }
    if (comport_opened == false) {
        // stat.value = "PLEASE OPEN COM PORT";
        return;
    }
    try {
        while (comport.writable.locked == true) {
            await delay_ms(1);
        }
        var writer = comport.writable.getWriter();
        var buf = new Uint8Array(arr);
        await writer.write(buf);
        writer.releaseLock();
    } catch (e) {
        console.log(e);
    }
}






function kermit_packet_make_msg(pkt, seq, type, msg) {
    kermit_header_make(pkt, seq, type);
    var msg_array = msg.split('');
    var i;
    for (i = 0; (i < msg_array.length) &&
        (kermit_packet_size(pkt) < (kermit_packet_max() - kermit_enc_max()))
        ; i++) {
        kermit_data_push(pkt, msg_array[i].charCodeAt());
    }
    kermit_sum_set(pkt, kermit_sum_make(pkt));
    console.log(pkt);
}


var kermit_send_time;
var kermit_timeout = 8000;

async function kermit_send(pkt) {
    kermit_send_time = Date.now();
    await serial_txa(pkt);
}

async function kermit_transloop(pkt) {
    var rpkt = [];
    var ret;

    await kermit_send(pkt);
    while (krun) {
        if ((Date.now() - kermit_send_time) > kermit_timeout) {
            //console.log("kermit recv ack packet timeout, resend");
            await kermit_send(pkt);
        }
        if (krxfifo_count() > 0) {
            ret = kermit_recv(rpkt, krxfifo_pop());
            if (ret == KSTA_SUM_OK()) {
                if (kermit_type_get(rpkt) == 'Y'.charCodeAt()) {
                    //console.log("kermit ack packet is recived, end loop");
                    break;
                } else {
                    await kermit_send(pkt);
                    //console.log("not a kermit ack packet, resend");
                }
            }
            if (ret < 0) {
                //console.log("recv err, resend", ret);
                kermit_recv_reset(rpkt);
                //console.log(rpkt);
            }
        } else {
            await delay_ms(1);
        }
    }
}

async function kermit_start(refs) {
    const kermit_stat = refs.kermit_stat;

    if (comport == undefined) {
        kermit_stat.value = "烧录失败：请先选择串口"
        return
    }

    var upload_file = refs.upload_file.files[0];
    console.log(upload_file);

    if (upload_file == undefined) {
        kermit_stat.value = "请先选择烧录文件"
        return;
    }
    if (krun) {
        return;
    }
    console.log("开始烧录");

    var seq = 0;
    var pkt = [];
    krun = true;
    serial_txs("kermit\n\r");
    delay_ms(1);
    serial_txs("kermit\n\r");
    delay_ms(1);
    serial_txs("kermit\n\r");
    delay_ms(1);
    serial_txs("kermit\n\r");
    delay_ms(1);
    serial_txs("kermit\n\r");
    delay_ms(1);
    serial_txs("kermit\n\r");
    delay_ms(1);

    pkt = [];
    kermit_packet_make_msg(pkt, seq, 'C'.charCodeAt(), 'ota-flash-erase');
    kermit_stat.value = "烧录程序初始化中"
    await kermit_transloop(pkt);
    seq = kermit_seq_inc(seq);

    pkt = [];
    kermit_packet_make_msg(pkt, seq, 'C'.charCodeAt(), 'ota-flash-write-reset');
    kermit_stat.value = "FLASH WRITE RESET"
    await kermit_transloop(pkt);
    seq = kermit_seq_inc(seq);

    var sended = 0;
    var firmware_content = new Uint8Array(await upload_file.arrayBuffer());
    var total = firmware_content.length;

    while (sended < total) {
        console.log('循环烧录');
        EventBus.$emit('progress', { sended, total }); // 触发进度事件

        const percentage = (sended / total) * 100;
        kermit_stat.value = `烧录中：${percentage.toFixed(2)}%`;
        pkt = [];
        kermit_header_make(pkt, seq, 'D'.charCodeAt());
        while ((kermit_packet_size(pkt) < (kermit_packet_max() - kermit_enc_max())) &&
            (sended < total)) {
            kermit_data_push(pkt, firmware_content[sended]);
            sended += 1;
        }
        kermit_sum_set(pkt, kermit_sum_make(pkt));
        await kermit_transloop(pkt);
        seq = kermit_seq_inc(seq);
    }

    pkt = [];
    kermit_packet_make_msg(pkt, seq, 'C'.charCodeAt(), 'ota-header-info');
    kermit_stat.value = "OTA HEADER INFO"
    await kermit_transloop(pkt);
    seq = kermit_seq_inc(seq);

    pkt = [];
    kermit_packet_make_msg(pkt, seq, 'C'.charCodeAt(), 'ota-part-switch');
    kermit_stat.value = "OTA PART SWITCH"
    await kermit_transloop(pkt);
    seq = kermit_seq_inc(seq);

    pkt = [];
    kermit_packet_make_msg(pkt, seq, 'C'.charCodeAt(), 'flash-dump-part');
    kermit_stat.value = "烧录完成"
    await kermit_transloop(pkt);
    seq = kermit_seq_inc(seq);


    // send some ctrl-c
    var i;
    for (i = 0; i < 40; i++) {
        serial_txs("\x03");
    }
    // send some CR
    for (i = 0; i < 20; i++) {
        serial_txs("\x0D");
    }

    krun = false;
    console.log("烧录完成");
    serial_forget(refs);
    EventBus.$emit('progress', { sended: total, total }); // 最终进度
}

function kermit_stop() {
    krun = false;
}



export { serial_request, serial_forget, serial_open, serial_close, kermit_start, kermit_stop }