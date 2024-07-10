

// const kermit_mark = 1;
// const kermit_offset_mark = 0;
// const kermit_offset_len = 1;
// const kermit_offset_seq = 2;
// const kermit_offset_type = 3;
// const kermit_offset_data = 4;
// const kermit_packet_size_min = 5;
// const kermit_packet_size_max = 96;
// const kermit_packet_seq_min = 0;
// const kermit_packet_seq_max = 63;
// const kermit_bctsize = 1;
// const kermit_qctl = '#';
// const kermit_ebq = '&';


// function kermit_tochar(x) {
//     return x + 32;
// }

// function kermit_unchar(x) {
//     return x - 32;
// }

// function kermit_length(packet) {
//     return kermit_unchar(packet[kermit_offset_len]) + 2;
// }

// function kermit_tosum(x) {
//     return kermit_tochar(((x) + (((x) & 192) >> 6)) & 63);
// }

// function kermit_check(packet) {
//     let pktlen = kermit_length(packet);
//     if (pktlen < kermit_packet_size_min) {
//         console.log("kermit packet too small");
//         return false;
//     }
//     if (packet.length < pktlen) {
//         console.log("kermit packet is incomplete");
//         return false;
//     }
//     return true;
// }

// function kermit_gensum(packet) {
//     if (kermit_check(packet) == false) {
//         return -1;
//     }
//     let i = kermit_offset_len;
//     let sum = 0x00;
//     for (; i < (kermit_length(packet) - kermit_bctsize); i++) {
//         sum += packet[i];
//     }
//     return kermit_tosum(sum);
// }

// function kermit_getsum(packet) {
//     if (kermit_check(packet) == false) {
//         return -1;
//     }
//     return packet[kermit_length(packet) - kermit_bctsize];
// }

// function kermit_setsum(packet, sum) {
//     if (kermit_check(packet) == false) {
//         return -1;
//     }
//     return (packet[kermit_length(packet) - kermit_bctsize] = sum);
// }

// function kermit_chksum(packet) {
//     let local_sum = kermit_getsum(packet);
//     let remote_sum = kermit_gensum(packet);
//     if ((local_sum == -1) || (remote_sum == -1)) {
//         return false;
//     }
//     if (local_sum != remote_sum) {
//         return false;
//     }
//     return true;
// }

// function kermit_is_control(c) {
//     if (((c >= 0) && (c <= 31)) || (c == 127)) {
//         return true;
//     }
//     return false;
// }

// function kermit_ctl(x) {
//     return ((x) ^ 64);
// }

// function kermit_encode(type, data) {
//     let encoded = new Array();
//     if (typeof (data) != typeof (0)) {
//         console.log("only allow number");
//         return -1;
//     }
//     if (type == 'S') { // dont encode data when type is SINIT
//         encoded.push(data);
//         return encoded;
//     }
//     if (data & (1 << 7)) {
//         // [EBQ][DATA]
//         encoded.push(kermit_ebq.codePointAt());
//         data &= ~(1 << 7); // clear bit7
//     }
//     // [QCTL][QCTL]
//     if (data == kermit_qctl.codePointAt()) {
//         encoded.push(kermit_qctl.codePointAt());
//         encoded.push(kermit_qctl.codePointAt());
//         return encoded;
//     }
//     // [QCTL][EBQ]
//     if (data == kermit_ebq.codePointAt()) {
//         encoded.push(kermit_qctl.codePointAt());
//         encoded.push(kermit_ebq.codePointAt());
//         return encoded;
//     }
//     // [QCTL][DATA]
//     if (kermit_is_control(data)) {
//         encoded.push(kermit_qctl.codePointAt());
//         data = kermit_ctl(data);
//     }
//     // [DATA]
//     encoded.push(data);
//     return encoded;
// }

// function kermit_packet_make(seq, type, payload) {
//     let packet = new Array();
//     // make kermit header
//     packet.push(kermit_mark);
//     packet.push(kermit_tochar(0));
//     packet.push(kermit_tochar(seq)); packet[kermit_offset_len]++;
//     packet.push(type.codePointAt()); packet[kermit_offset_len]++;

//     // encode payload into packet
//     let offset_payload;
//     let encoded;
//     let data;
//     for (offset_payload = 0,
//         encoded = 0;
//         ((offset_payload < payload.length) &&
//             (packet.length < (kermit_packet_size_max - kermit_bctsize - 3)))
//         ;) {
//         data = payload[offset_payload]; offset_payload++;
//         encoded = kermit_encode(type, data);
//         if (encoded.length > 0) {
//             packet.push(encoded[0]); packet[kermit_offset_len]++;
//         }
//         if (encoded.length > 1) {
//             packet.push(encoded[1]); packet[kermit_offset_len]++;
//         }
//         if (encoded.length > 2) {
//             packet.push(encoded[2]); packet[kermit_offset_len]++;
//         }
//     }

//     // make kermit sum
//     packet.push(0x00); packet[kermit_offset_len]++; // fill dummy [SUM]
//     let sum;
//     sum = kermit_gensum(packet);
//     if (sum < 0) {
//         return -1;
//     }
//     kermit_setsum(packet, sum);
//     return packet;
// }



// function kermit_recv(packet_in, data) {
//     let packet = new Array();
//     let i;
//     for (i = 0; i < packet_in.length; i++) {
//         packet[i] = packet_in[i];
//     }
//     if (packet.length == kermit_offset_mark) {
//         if (data != kermit_mark) {
//             return false;
//         }
//         packet.push(data);
//         return packet;
//     }
//     if (packet.length == kermit_offset_len) {
//         packet.push(data);
//         if (kermit_length(packet) > kermit_packet_size_max) {
//             return false;
//         }
//         if (kermit_length(packet) < kermit_packet_size_min) {
//             return false;
//         }
//         return packet;
//     }
//     if (packet.length == kermit_offset_seq) {
//         if (kermit_unchar(data) < kermit_packet_seq_min) {
//             return false;
//         }
//         if (kermit_unchar(data) > kermit_packet_seq_max) {
//             return false;
//         }
//         packet.push(data);
//         return packet;
//     }
//     if (packet.length == kermit_offset_type) {
//         packet.push(data);
//         return packet;
//     }
//     if (packet.length >= kermit_offset_data) {
//         // recv ok, stop recv
//         if (packet.length >= kermit_length(packet)) {
//             return packet;
//         }
//         // recv sum
//         if (packet.length == (kermit_length(packet) - 1)) {
//             packet.push(data);
//             if (kermit_chksum(packet) == false) {
//                 // mask packet is bad sum
//                 packet[kermit_offset_type] = 'Q'.codePointAt();
//             }
//             return packet;
//         }
//         // recv data
//         packet.push(data);
//         return packet;
//     }
// }






// function kermit_seqnext(x) {
//     return ((x + 1) & 63);
// }


// // 串口通信函数
// async function kermit_trans(port, packet) {
//     console.log(port);
//     console.log("发送数据包:", packet);
//     let a = [];
//     let flag = 1;
//     let time_start = Date.now();
//     let writer;
//     let reader;

//     try {
//         // 获取写入器
//         writer = port.writable.getWriter();
//         const encoder = new TextEncoder();

//         // 发送数据包
//         await writer.write(encoder.encode(packet));
//         console.log("已发送数据包:", packet);

//         // 获取读取器
//         reader = port.readable.getReader();

//         while (flag === 1) {
//             const { value, done } = await reader.read();

//             console.log("读取到数据:", value, done);
//             if (done) {
//                 console.log("串口已关闭或读取结束");
//                 break;
//             }

//             // 处理接收到的数据
//             for (const byte of value) {
//                 let c = byte;
//                 a = kermit_recv(a, c);

//                 // 如果接收到了完整的数据包
//                 if (a.length === kermit_length(a)) {
//                     return a;
//                 }
//             }

//             // 如果超时，则重新发送数据
//             if ((Date.now() - time_start) > 1000) {
//                 console.log("超时，重新发送数据");
//                 await writer.write(encoder.encode(packet));
//                 time_start = Date.now();
//                 a = [];
//             }
//         }
//     } catch (error) {
//         console.error("串口通信发生错误:", error);
//         throw error; // 抛出异常以便上层函数处理
//     } finally {
//         try {
//             if (reader) {
//                 await reader.cancel();
//             }
//             if (writer) {
//                 await writer.close();
//             }
//         } catch (error) {
//             console.error("关闭读取器、写入器时发生错误:", error);
//         }
//     }

// }

// // 发送文件函数
// async function kermit_sendfile(port, file, filesize) {
//     let sended = 0;
//     let buf;
//     let limit = kermit_packet_size_max - kermit_bctsize - 3;
//     let seq = 0;

//     try {
//         console.log("发送文件头部到远程设备");
//         let packet_tx = kermit_packet_make(seq, 'F', []);


//         let packet_rx;
//         do {
//             packet_rx = await kermit_trans(port, packet_tx);
//         } while (packet_rx[kermit_offset_type] !== 'Y'.codePointAt());
//         seq = kermit_seqnext(seq);


//         console.log("发送文件数据到远程设备");
//         const reader = new FileReader();
//         reader.onload = async function (event) {
//             const fileData = new Uint8Array(event.target.result);

//             while (sended < filesize) {
//                 buf = [];
//                 for (let i = 0; i < limit && sended < filesize; i++) {
//                     buf.push(fileData[sended]);
//                     sended++;
//                 }
//                 packet_tx = kermit_packet_make(seq, 'D', buf);
//                 do {
//                     packet_rx = await kermit_trans(port, packet_tx);
//                 } while (String.fromCharCode(packet_rx[kermit_offset_type]) !== 'Y');
//                 seq = kermit_seqnext(seq);
//                 console.log("已发送/总共: %d/%d", sended, filesize);
//             }

//             console.log("发送文件结束标志到远程设备");
//             packet_tx = kermit_packet_make(seq, 'Z', []);
//             do {
//                 packet_rx = await kermit_trans(port, packet_tx);
//             } while (String.fromCharCode(packet_rx[kermit_offset_type]) !== 'Y');
//             seq = kermit_seqnext(seq);
//         };

//         reader.readAsArrayBuffer(file);
//     } catch (error) {
//         console.error("发送文件过程中发生错误:", error);
//         throw error; // 抛出异常以便上层函数处理
//     }
// }

// async function burn(blob) {
//     let port;
//     try {
//         console.log('二进制文件数据', blob);

//         // 选择并请求串口
//         port = await navigator.serial.requestPort();
//         console.log("已选择串口:", port);

//         // 打开串口并设置波特率
//         await port.open({ baudRate: 115200 });
//         console.log("已打开串口:", port);

//         // 执行文件发送
//         await kermit_sendfile(port, blob, blob.size);

//     } catch (error) {
//         console.error("烧录过程中发生错误:", error);
//         throw error; // 抛出异常以便上层函数处理
//     } finally {
//         try {
//             // 关闭串口
//             if (port) {
//                 await port.close();
//                 console.log("已关闭串口:", port);
//             }
//         } catch (error) {
//             console.error("关闭串口时发生错误:", error);
//         }
//     }
// }

// // 导出函数，使其可在模块外部使用
// export { burn };


async function burn(blob) {
    let port;
    try {
        console.log('二进制文件数据', blob);

        // 选择并请求串口
        port = await navigator.serial.requestPort();
        console.log("已选择串口:", port);

        // 打开串口并设置波特率
        await port.open({ baudRate: 115200 });
        console.log("已打开串口:", port);
        // 读取 blob 数据并写入串口
        const reader = new FileReader();
        reader.onload = async function (event) {
            const fileData = new Uint8Array(event.target.result);
            const writer = port.writable.getWriter();
            await writer.write(fileData);
            writer.releaseLock();
            console.log("文件数据已发送完毕");
        };

        reader.readAsArrayBuffer(blob);

    } catch (error) {
        console.error("烧录过程中发生错误:", error);
        throw error; // 抛出异常以便上层函数处理
    }
}


// 导出函数，使其可在模块外部使用
export { burn };

