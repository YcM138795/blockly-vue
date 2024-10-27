//函数块的代码生成器
function generateCallFunctionCode(block) {
    const functionName = block.getFieldValue('NAME'); // 获取函数名
    const params = [];

    let value_;
    // 获取参数字段
    if (block.inputList.length == 3) {
        block.inputList[2].fieldRow.forEach((fiel, index) => {
            if (index > 0) {
                value_ = fiel.value_;
                if (fiel.name == '文本') {
                    value_ = `"${fiel.value_}"`;
                }
                if (fiel.name == '字符串数组') {
                    value_ = `${fiel.value_}`;
                    if (fiel.value_ == '无数组') {
                        value_ = 'NULL';
                    }
                }
                if (fiel.name == '浮点数数组') {
                    value_ = `${fiel.value_}`;
                    if (fiel.value_ == '无数组') {
                        value_ = 'NULL';
                    }
                }
                params.push(value_);
            }
        })
        return `${functionName}(${params.map(p => (p)).join(', ')});\n`;

    }

    // 生成调用函数的 JavaScript 代码
    return `${functionName}();\n`;

}

export { generateCallFunctionCode };