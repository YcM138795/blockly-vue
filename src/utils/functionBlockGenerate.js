//函数块的代码生成器
function generateCallFunctionCode(block) {
    const functionName = block.getFieldValue('NAME'); // 获取函数名
    const params = [];

    // 获取参数字段
    if (block.inputList.length == 3) {
        block.inputList[2].fieldRow.forEach((fiel, index) => {
            if (index > 0) {
                params.push(fiel.value_);
            }
        })
        return `${functionName}(${params.map(p => (p)).join(', ')});\n`;

    }

    // 生成调用函数的 JavaScript 代码
    return `${functionName}();\n`;

}

export { generateCallFunctionCode };