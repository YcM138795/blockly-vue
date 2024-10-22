import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import '@blockly/field-bitmap';


//高级
{
    //函数
    {
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
            "colourPrimary": '#4FD284',
            "colourSecondary": '#4FD284',
            "colourTertiary": '#4FD284',
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
                    parmType = 'char**';
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
    }

    //常量
    {
        javascriptGenerator.forBlock['constantBlock'] = function (block) {
            var dropdown_operation = block.getFieldValue('CONSTANT');
            var number = block.getFieldValue('NUMBER');
            return `double ${dropdown_operation} = ${number};\n`;
        };
    }

    //常量改变
    {
        javascriptGenerator.forBlock['constantBlock_change'] = function (block) {
            var dropdown_operation = block.getFieldValue('CONSTANT');
            var number = block.getFieldValue('NUMBER');
            if (number >= 0) {
                return `${dropdown_operation} + =${number};\n`;

            } else {
                let numberABS = Math.abs(number);
                return `${dropdown_operation} - =${numberABS};\n`;
            }
        };
    }


    //文本
    {
        //string:字符串
        {
            Blockly.Blocks['string'] = {
                init: function () {
                    this.jsonInit({
                        "type": "string",
                        "message0": "\" %1 \"",
                        "args0": [
                            {
                                "type": "field_input",
                                "name": "value",
                                "text": " "
                            }
                        ],
                        "inputsInline": true,
                        "output": "String",
                        "colour": '#4FD284',
                        "tooltip": "字符串",
                        "helpUrl": ""
                    })
                }
            }
            javascriptGenerator.forBlock['string'] = function (block) {
                var text_value = block.getFieldValue('value');
                // TODO: Assemble javascript into code variable.
                var code = `${text_value}`;
                // TODO: Change ORDER_NONE to the correct strength.
                return [code, Order.MEMBER];
            };
        }
        //string_length:求长度
        {
            Blockly.Blocks['string_length'] = {
                init: function () {
                    this.jsonInit({
                        "message0": 'length of %1',
                        "args0": [
                            {
                                "type": "input_value",
                                "name": "VALUE",
                            }
                        ],
                        "output": "Number",
                        "colour": '#4FD284',
                        "tooltip": "求长度",
                    });
                }
            }

            javascriptGenerator.forBlock['string_length'] = function (block, generator) {
                // String or array length.
                var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
                var code = `strlen("${argument0}")`;
                return [code, Order.MEMBER];
            };
        }

    }

    // barcket:括号
    {
        {
            Blockly.Blocks['bracket'] = {
                init: function () {
                    this.jsonInit(
                        {
                            "type": "bracket",
                            "message0": "( %1 %2 )",
                            'icons': {
                                // Your state goes here!
                                'my_icon': 'my_icon',
                            },
                            "args0": [
                                {
                                    "type": "input_dummy"
                                },
                                {
                                    "type": "input_value",
                                    "name": "digit"
                                }
                            ],
                            "inputsInline": false,
                            "output": null,
                            "colour": '#4FD284',
                            "icon": 'my_icon',
                            "tooltip": "括号",
                            "helpUrl": ""
                        }
                    );
                }
            }
            javascriptGenerator.forBlock['bracket'] = function (block, generator) {
                var value_digit = generator.valueToCode(block, 'digit', Order.ATOMIC);
                // TODO: Assemble javascript into code variable.
                var code = '(' + value_digit + ')';
                // TODO: Change ORDER_NONE to the correct strength.
                return [code, Order.NONE];
            };

        }
    }

    //显示框
    {
        Blockly.defineBlocksWithJsonArray([
            {
                type: 'test_field_bitmap',
                message0: 'bitmap: %1',
                args0: [
                    {
                        type: 'field_bitmap',
                        name: 'FIELDNAME',
                        width: 5,
                        height: 5,
                        colours: { filled: '#4d8c8c', empty: '#fff' }
                    },
                ],
                "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
                "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
                "colour": '#4FD284'
            },
        ]);
        javascriptGenerator.forBlock['test_field_bitmap'] = function () {
            // TODO: Assemble javascript into code variable.
            var code = ``;
            return code;
        };
    }

}


//数组
// 定义块
// Blockly.Blocks['dynamic_array_block'] = {
//     init: function () {
//         this.appendDummyInput('constant')

//         let constantInput;
//         constantInput = this.getInput('constant');
//         constantInput.appendField("将");

//         // // 添加常数选项
//         // let constantDropdownOptions = this.getConstant(that.advancedBlockStore.constantBlock);
//         // this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
//         // this.addConstant(constantInput, this.dropdownField);


//         // constantInput.appendField("设置为")
//         //     .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), "NUMBER") // 获取传递的动态函数名


//         this.appendDummyInput()
//             .appendField(new Blockly.FieldImage(
//                 "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%8A%A0%E5%8F%B7.aeaaeea0.svg",
//                 15, 15, "*", false), 'ADD_IMAGE');
//         this.appendDummyInput()
//             .appendField(new Blockly.FieldImage(
//                 "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%8A%A0%E5%8F%B7.aeaaeea0.svg",
//                 15, 15, "*", false), 'RE_IMAGE');
//         // 设置点击事件
//         const imageFieldADD = this.getField('ADD_IMAGE');
//         const imageFieldRE = this.getField('RE_IMAGE');

//         if (imageFieldADD) {
//             imageFieldADD.setOnClickHandler(() => this.onClickHandlerADD(constantInput));
//         }
//         if (imageFieldRE) {
//             imageFieldRE.setOnClickHandler(() => this.onClickHandlerRE(constantInput));
//         }

//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour('#4FD284');
//         this.setTooltip("");
//         this.setHelpUrl("");
//     },
//     // 增加数组数据
//     onClickHandlerADD: function (constantInput) {
//         console.log("Image clicked!");
//         if (constantInput) {
//             constantInput
//                 .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), "NUMBER"); // 获取传递的动态函数名
//         }
//     },
//     // 删除数组数据
//     onClickHandlerRE: function (constantInput) {
//         console.log("Image clicked!");
//         if (constantInput) {
//             constantInput.removeField("NUMBER");
//         }
//     },
//     getConstant: function (constantBlock) {
//         let constantDropdownOptions = []
//         for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
//             constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
//         }
//         return constantDropdownOptions;
//     },
//     addConstant: function (constantInput, dropdownField) {
//         constantInput.appendField(dropdownField, "CONSTANT");
//     },
//     addNewConstant: function (currentOptions, constantDropdownOptions) {
//         currentOptions.unshift(constantDropdownOptions[0]);
//     },
// };


Blockly.Blocks['arrayBlock_double'] = {
    init: function () {        
        this.appendDummyInput('constant')
            .appendField("将");

        this.numberCount = 0; // 初始化计数器
        const constantInput = this.getInput('constant');

        if (this.arrayBlock) {
            // // 添加常数选项
            let constantDropdownOptions = this.getConstant(this.arrayBlock);
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            this.addConstant(constantInput, this.dropdownField);
        }

        // 添加点击事件
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(
                "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%8A%A0%E5%8F%B7.aeaaeea0.svg",
                15, 15, "*", false), 'ADD_IMAGE')
            .appendField(new Blockly.FieldImage(
                "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E5%8A%A0%E5%8F%B7.aeaaeea0.svg",
                15, 15, "*", false), 'RE_IMAGE');

        const imageFieldADD = this.getField('ADD_IMAGE');
        const imageFieldRE = this.getField('RE_IMAGE');

        if (imageFieldADD) {
            imageFieldADD.setOnClickHandler(() => this.onClickHandlerADD());
        }
        if (imageFieldRE) {
            imageFieldRE.setOnClickHandler(() => this.onClickHandlerRE());
        }

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#4FD284');
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getConstant: function (constantBlock) {
        let constantDropdownOptions = []
        for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
            constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
        }
        return constantDropdownOptions;
    },
    addConstant: function (constantInput, dropdownField) {
        constantInput.appendField(dropdownField, "CONSTANT");
    },
    addNewConstant: function (currentOptions, constantDropdownOptions) {
        currentOptions.unshift(constantDropdownOptions[0]);
    },
    // 增加数组数据
    onClickHandlerADD: function () {
        const constant = this.getInput('constant');
        const fieldName = "NUMBER_" + this.numberCount; // 生成唯一字段名称
        constant.appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), fieldName);
        this.numberCount++; // 更新计数器
    },

    // 删除数组数据
    onClickHandlerRE: function () {
        const constant = this.getInput('constant');
        if (this.numberCount > 0) {
            const fieldName = "NUMBER_" + (this.numberCount - 1); // 获取最后一个字段的名称
            if (this.getField(fieldName)) {
                constant.removeField(fieldName, true); // 移除输入字段
                this.numberCount--; // 更新计数器
            }
        }
    },

    saveExtraState: function () {
        return {
            'itemCount': this.numberCount,
            'arrayBlock': this.arrayBlock,
        };
    },

    loadExtraState: function (state) {
        console.log(state);
        this.numberCount = state['itemCount'];
        this.arrayBlock = state['arrayBlock'];
        if (this.arrayBlock) {
            // // 添加常数选项
            let constantDropdownOptions = this.getConstant(this.arrayBlock);
            let dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            this.addConstant(this.getInput('constant'), dropdownField);
        }
        console.log(this.arrayBlock);

        for (let i = 0; i < this.numberCount; i++) {
            const fieldName = "NUMBER_" + i;
            this.getInput('constant').appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), fieldName);
        }
    },
};




javascriptGenerator.forBlock['arrayBlock_double'] = function (block) {
    var dropdown_operation = block.getFieldValue('CONSTANT');
    
    let array = [];
    for (let i = 0; i < block.numberCount; i++) {
        let number = block.getFieldValue('NUMBER_' + i);
        array.push(number);
    }
    
    // 拼接成 double myNumbers[] = {...};
    let arrayString = array.join(', ');
    let code = `double ${dropdown_operation}[] = {${arrayString}};\n`;
    
    return code; // 返回拼接的代码
};

javascriptGenerator.forBlock['arrayBlock_string'] = function (block) {
    var dropdown_operation = block.getFieldValue('CONSTANT');
    
    let array = [];
    for (let i = 0; i < block.numberCount; i++) {
        let string = block.getFieldValue('STRING_' + i);
        array.push(string);
    }
    
    // 拼接成 double myNumbers[] = {...};
    let arrayString = array.map(str => `"${str}"`).join(', ');
    let code = `char* ${dropdown_operation}[] = {${arrayString}};\n`;
    
    return code; // 返回拼接的代码
};



