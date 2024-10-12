import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';


Blockly.Blocks['function_definition'] = {
    init: function () {

        // 设置块的样式和其他基本属性
        this.setStyle('function_definition_style');
        this.setTooltip('');
        this.setHelpUrl('');

        // 添加一个字段（函数名称）
        this.appendDummyInput('funName')
            .appendField('函数')
            .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');

        // 添加参数部分，默认无参数
        this.appendDummyInput('Param')

        // 添加执行部分（语句输入区）
        this.appendStatementInput('inner').appendField('执行');
    },
    customContextMenu: function (options) {

        // 过滤掉“复制”选项
        options.forEach(option => {
            if (option.text === "复制") {
                option.enabled = false;
            }
        })
    }
};

Blockly.Themes.Classic.blockStyles["function_definition_style"] = {
    "colourPrimary": "#a5d599",
    "colourSecondary": "#a5d599",
    "colourTertiary": "#a5d599",
    "hat": "cap"
};

javascriptGenerator.forBlock['function_definition'] = function (block, generator) {
    let parm = [];//参数类型
    let fullParm = '';

    block.inputList[1].fieldRow.forEach((field, index) => {
        if (index > 0) {
            fullParm = field.name + '--&&--' + field.value_;
            parm.push(fullParm);
        }
    });


    let code = '';

    //拼接函数名
    const text_name = block.getFieldValue('NAME');
    code = `void ${text_name}(`

    //拼接参数
    parm.forEach((item, index) => {
        let parts = item.split('--&&--');   // 使用 '--&&--' 分隔字符串

        let valueBeforePrefix = parts[0]; // 获取 '--&&--' 前面的部分
        let valueAfterPrefix = parts[1]; // 获取 '--&&--' 后面的部分

        let value = valueBeforePrefix.split('--&--'); //获取参数类型
        let preFix = value[0]; //获取参数名

        preFix = getParmType(preFix); //获取参数类型
        let parmName = getParmName(valueAfterPrefix, value); //获取参数名

        code += `${preFix} ${parmName}`;

        // 如果不是最后一个item，则添加逗号
        if (index < parm.length - 1) {
            code += ',';
        }
    })
    //解决方法：先创建一个数组，然后根据field的name属性来判断是什么类型的，通过判断类型生成int、bool、string
    //等类型的前缀，然后将这些前缀利用一个分隔符拼接起来，然后再将这个分隔符裁剪出来，逐个拼接到code里，最后返回code

    //拼接函数体
    const statement_inner = generator.statementToCode(block, 'inner');
    code += `){\n${statement_inner}}\n`

    //函数--获取参数类型
    function getParmType(preFix) {
        let parmType;

        if (preFix === 'text') {
            parmType = 'char*';
        } else if (preFix == 'boolean') {
            parmType = 'bool';
        } else if (preFix == 'number_int') {
            parmType = 'int';
        } else if (preFix == 'number_double') {
            parmType = 'double';
        } else if (preFix == 'number_long') {
            parmType = 'long';
        } else if (preFix == 'array_int') {
            parmType = 'int*';
        } else if (preFix == 'array_string') {
            parmType = 'string*';
        } else if (preFix == 'array_double') {
            parmType = 'double*';
        }
        return parmType;
    }
    function getParmName(valueAfterPrefix, value) {
        let parmName;
        let full = '';
        full += value[0] + value[1];
        if (valueAfterPrefix == '文本') {
            parmName = full;
        } else if (valueAfterPrefix == '布尔值') {
            parmName = full;
        } else if (valueAfterPrefix == '整形') {
            parmName = full;
        } else if (valueAfterPrefix == '浮点数') {
            parmName = full;
        } else if (valueAfterPrefix == '长整型') {
            parmName = full;
        } else if (valueAfterPrefix == '数字数组') {
            parmName = full;
        } else if (valueAfterPrefix == '字符数组') {
            parmName = full;
        } else if (valueAfterPrefix == '浮点数数组') {
            parmName = full;
        } else {
            parmName = valueAfterPrefix
        }
        return parmName;
    }

    return code;
}