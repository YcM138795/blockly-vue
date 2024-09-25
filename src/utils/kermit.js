"use strict";

export function kermit_qctl() {
    return '#'.charCodeAt();
}

export function kermit_ebq() {
    return '&'.charCodeAt();
}

export function kermit_qctl_enable() {
    return (kermit_qctl() != ' '.charCodeAt());
}

export function kermit_ebq_enable() {
    return (kermit_ebq() != ' '.charCodeAt());
}

export function kermit_mark() {
    return 0x01;
}

export function kermit_mark_offset() {
    return 0;
}

export function kermit_mark_get(pkt) {
    return pkt[kermit_mark_offset()];
}

export function kermit_mark_set(pkt, val) {
    pkt[kermit_mark_offset()] = val;
}

export function kermit_len_offset() {
    return 1;
}

export function kermit_unchar(x) {
    return x - 32;
}

export function kermit_len_get(pkt) {
    return kermit_unchar(pkt[kermit_len_offset()]);
}

export function kermit_tochar(x) {
    return x + 32;
}

export function kermit_len_set(pkt, val) {
    pkt[kermit_len_offset()] = kermit_tochar(val);
}

export function kermit_seq_offset() {
    return 2;
}

export function kermit_seq_get(pkt) {
    return kermit_unchar(pkt[kermit_seq_offset()]);
}

export function kermit_seq_set(pkt, val) {
    pkt[kermit_seq_offset()] = kermit_tochar(val);
}

export function kermit_type_offset() {
    return 3;
}

export function kermit_type_get(pkt) {
    return pkt[kermit_type_offset()];
}

export function kermit_type_set(pkt, val) {
    return pkt[kermit_type_offset()] = val;
}

export function kermit_data_offset() {
    return 4;
}

export function kermit_mark_size() {
    return 1;
}

export function kermit_len_size() {
    return 1;
}

export function kermit_seq_size() {
    return 1;
}

export function kermit_type_size() {
    return 1;
}

export function kermit_sum_size() {
    return 1;
}

export function kermit_header_size() {
    return kermit_mark_size() + kermit_len_size() +
            kermit_seq_size() + kermit_type_size();
}

export function kermit_packet_size(pkt) {
    return kermit_mark_size() + kermit_len_size() + kermit_len_get(pkt);
}

export function kermit_packet_max() {
    return kermit_mark_size() + kermit_len_size() + kermit_len_max();
}

export function kermit_enc_max() {
    var x = 1;
    if (kermit_qctl_enable()) {
        x++;
    }
    if (kermit_ebq_enable()) {
        x++;
    }
    return x;
}

export function kermit_data_size(pkt) {
    return kermit_packet_size(pkt) - kermit_header_size() - kermit_sum_size();
}

export function kermit_len_min() {
    return kermit_seq_size() + kermit_type_size() + kermit_sum_size();
}

export function kermit_header_make(pkt, seq, type) {
    kermit_mark_set(pkt, kermit_mark());
    kermit_len_set(pkt, kermit_len_min());
    kermit_seq_set(pkt, seq);
    kermit_type_set(pkt, type);
}

export function kermit_data_next(pkt) {
    return kermit_header_size() + kermit_data_size(pkt);
}

export function kermit_len_add(pkt, val) {
    kermit_len_set(pkt, kermit_len_get(pkt) + val);
}

export function kermit_have_bit7(val) {
    if ((val & (1 << 7)) == 0) {
        return false;
    }
    return true;
}

export function kermit_is_control(val) {
    if ((val < 32) || (val == 127)) {
        return true;
    }
    return false;
}

export function kermit_is_prefix(val) {
    if (val == kermit_qctl()) {
        return true;
    }
    if (val == kermit_ebq()) {
        return true;
    }
    return false;
}

export function kermit_ctl(data) {
    return data ^ 64;
}

export function char2int(c) {
    return c.charCodeAt();
}

export function arr2str(arr) {
    var str = '';
    var i;
    var tmp;
    for (i = 0; i < arr.length; i++) {
        tmp = String.fromCharCode(arr[i]);
        str = str.concat(tmp);
    }
    return str;
}

export function kermit_data_push(pkt, data) {
    if (kermit_ebq_enable() && kermit_have_bit7(data)) {
        pkt.push(kermit_ebq());
        kermit_len_add(pkt, 1);
        data = data & ~(1 << 7);
    }
    if (kermit_qctl_enable() && kermit_is_prefix(data)) {
        pkt.push(kermit_qctl());
        kermit_len_add(pkt, 1);
    }
    if (kermit_qctl_enable() && kermit_is_control(data)) {
        pkt.push(kermit_qctl());
        kermit_len_add(pkt, 1);
        data = kermit_ctl(data);
    }
    pkt.push(data);
    kermit_len_add(pkt, 1);
}

export function kermit_sum_offset(pkt) {
    return kermit_header_size() + kermit_data_size(pkt);
}

export function kermit_sum_get(pkt) {
    return pkt[kermit_sum_offset(pkt)];
}

export function kermit_sum_set(pkt, val) {
    pkt[kermit_sum_offset(pkt)] = val;
}

export function kermit_tosum(sum) {
    return (kermit_tochar(((sum) + (((sum) & 192) >> 6)) & 63));
}

export function kermit_sum_make(pkt) {
    var sum = 0;
    var i;
    for (i = kermit_len_offset(); i < kermit_sum_offset(pkt); i++) {
        sum += pkt[i];
    }
    return kermit_tosum(sum);
}

export function kermit_sum_check(pkt) {
    var remote_sum;
    var local_sum;
    remote_sum = kermit_sum_get(pkt);
    local_sum = kermit_sum_make(pkt);
    return (remote_sum == local_sum);
}

export function kermit_recv_reset(pkt) {
    pkt.length = 0;
}

export function kermit_visible_max() {
    return 127;
}

export function kermit_len_max() {
    return kermit_unchar(kermit_visible_max());
}

export function kermit_seq_min() {
    return 0;
}

export function kermit_seq_max() {
    return 63;
}

export function KSTA_MARK_OK() {
    return 0;
}

export function KSTA_LEN_OK() {
    return 1;
}

export function KSTA_SEQ_OK() {
    return 2;
}

export function KSTA_TYPE_OK() {
    return 3;
}

export function KSTA_DATA_OK() {
    return 4;
}

export function KSTA_SUM_OK() {
    return 5;
}

export function KSTA_MARK_BAD() {
    return -60;
}

export function KSTA_LEN_BAD() {
    return -61;
}

export function KSTA_SEQ_BAD() {
    return -62;
}

export function KSTA_TYPE_BAD() {
    return -63;
}

export function KSTA_DATA_BAD() {
    return -64;
}

export function KSTA_SUM_BAD() {
    return -65;
}

export function kermit_recv(pkt, data) {
    if (pkt.length == kermit_mark_offset()) {
        pkt.push(data);
        if (kermit_mark_get(pkt) != kermit_mark()) {
            kermit_recv_reset(pkt);
            return KSTA_MARK_BAD();
        }
        return KSTA_MARK_OK();
    } 
    if (pkt.length == kermit_len_offset()) {
        pkt.push(data);
        if ((kermit_len_get(pkt) < kermit_len_min()) ||
            (kermit_len_get(pkt) > kermit_len_max())) {
            kermit_recv_reset(pkt);
            return KSTA_LEN_BAD();
        }
        return KSTA_LEN_OK();
    }
    if (pkt.length == kermit_seq_offset()) {
        pkt.push(data);
        if ((kermit_seq_get(pkt) < kermit_seq_min()) ||
            (kermit_seq_get(pkt) > kermit_seq_max())) {
            kermit_recv_reset(pkt);
            return KSTA_SEQ_BAD();
        }
        return KSTA_SEQ_OK();
    }
    if (pkt.length == kermit_type_offset()) {
        pkt.push(data);
        return KSTA_TYPE_OK();
    }
    if ((pkt.length >= kermit_data_offset()) && (pkt.length < kermit_packet_size(pkt))) {
        pkt.push(data);
        if (pkt.length == kermit_packet_size(pkt)) {
            if (kermit_sum_check(pkt)) {
                return KSTA_SUM_OK();
            }
            return KSTA_SUM_BAD();
        }
        return KSTA_DATA_OK();
    }
    return KSTA_DATA_BAD();
}

export function kermit_seq_inc(seq) {
    return (seq + 1) & 63;
}