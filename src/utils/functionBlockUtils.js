// 共同函数: 该文件用于存放函数块相关的工具函数

// 该函数用于获取字段名
function getFieldName(param, index) {
    let parts = param.split('--&&--');   // 使用 "--" 分隔字符串
    let valueAfterPrefix = parts[1]; // 获取 "--" 后面的部分

    if (valueAfterPrefix === '文本') {
        return 'text--&--' + index;
    } else if (valueAfterPrefix === '布尔值') {
        return 'boolean--&--' + index;
    } else if (valueAfterPrefix === '浮点数') {
        return 'number_double--&--' + index;
    } else if (valueAfterPrefix === '字符串数组') {
        return 'array_string--&--' + index;
    } else if (valueAfterPrefix === '浮点数数组') {
        return 'array_double--&--' + index;
    }
    return '';
}

export { getFieldName };