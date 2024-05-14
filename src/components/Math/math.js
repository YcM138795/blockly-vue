import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化



// 数学
{

    // number_single：整数输入-单向
    {
      Blockly.Blocks['number_single'] = {
        init: function () {
          this.jsonInit({
            "type": "number_single",
            "message0": "%1 %2",
            "args0": [
              {
                "type": "field_number",
                "name": "digit",
                "value": 1
              },
              {
                "type": "input_end_row"
              }
            ],
            "output": "Number",
            "colour": 150,
            "tooltip": "整数输入-单向",
            "helpUrl": ""
          })
        }
      }
      javascript.javascriptGenerator.forBlock['number_single'] = function (block) {
        var number_digit = block.getFieldValue('digit');
        // TODO: Assemble javascript into code variable.
        var code = number_digit;
        // Blockly.basic.showString("Hello!")
        // TODO: Change ORDER_NONE to the correct strength. 
        return [code, Order.MEMBER];
      };
      
    }
  
    // number_double：整数输入-双向
    {
      Blockly.Blocks['number_double'] = {
        init: function () {
          this.jsonInit(
            {
              "type": "number_double",
              "message0": "%1 %2",
              "args0": [
                {
                  "type": "field_number",
                  "name": "digit",
                  "value": 1
                },
                {
                  "type": "input_value",
                  "name": "operate"
                }
              ],
              "output": "Number",
              "colour": 150,
            }
          )
        }
      }
      javascript.javascriptGenerator.forBlock['number_double'] = function (block, generator) {
        var number_digit = block.getFieldValue('digit');
        var value_operate = generator.valueToCode(block, 'operate', javascript.Order.NONE);
        // TODO: Assemble javascript into code variable.
        var code = number_digit + value_operate;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
     
    }
  
    // single_operation:单运算
    {
      Blockly.Blocks['single_operation'] = {
        init: function () {
          this.jsonInit(
            {
              "type": "single_operation",
              "message0": "%1 %2",
              "args0": [
                {
                  "type": "field_dropdown",
                  "name": "maths",
                  "options": [
                    [
                      "+",
                      "+"
                    ],
                    [
                      "-",
                      "-"
                    ],
                    [
                      "×",
                      "*"
                    ],
                    [
                      "÷",
                      "/"
                    ],
                    [
                      "%",
                      "%"
                    ]
                  ]
                },
                {
                  "type": "input_value",
                  "name": "operate",
                  "check": "Number"
                }
              ],
              "output": null,
              "colour": 150,
              "tooltip": "单运算",
              "helpUrl": ""
            }
          )
        }
      }
      javascript.javascriptGenerator.forBlock['single_operation'] = function (block, generator) {
        var dropdown_maths = block.getFieldValue('maths');
        var value_operate = generator.valueToCode(block, 'operate', javascript.Order.ATOMIC);
        // TODO: Assemble javascript into code variable.
        var code = dropdown_maths + value_operate;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
      
    }
  
    // operation:数学运算
    {
      Blockly.Blocks['operation'] = {
        init: function () {
          this.jsonInit({
            "type": "compute",
            "message0": "%1 %2 %3 %4",
            "args0": [
              {
                "type": "field_number",
                "name": "digit1",
                "value": 0
              },
              {
                "type": "field_dropdown",
                "name": "maths1",
                "options": [
                  [
                    "+",
                    "+"
                  ],
                  [
                    "–",
                    "-"
                  ],
                  [
                    "×",
                    "*"
                  ],
                  [
                    "÷",
                    "/"
                  ]
                ]
              },
              {
                "type": "field_number",
                "name": "digit2",
                "value": 0
              },
              {
                "type": "field_dropdown",
                "name": "maths2",
                "options": [
                  [
                    "空",
                    "null"
                  ],
                  [
                    "+",
                    "+"
                  ],
                  [
                    "–",
                    "-"
                  ],
                  [
                    "×",
                    "*"
                  ],
                  [
                    "÷",
                    "/"
                  ]
                ]
              },
              // {
              //   "type": "input_value",
              //   "name": "operate",
              //   "check": "Number",
              //   "align": "CENTRE"
              // }
            ],
            "output": "Number",
            "colour": 150,
            "tooltip": "运算",
            "helpUrl": ""
          })
          this.operationChange();
        },

        operationChange:function(){
          const dropdown = this.getField('maths2');
          dropdown.setValidator((newValue) =>{
            if(newValue!=='null'){
              if(!this.getInput('digit3')){
                this.appendValueInput('digit3')
                .setCheck('Number')
              }
            }else{
              if(this.getInput('digit3')){
                this.removeInput('digit3')
              }
            }
          })
        }
      }
  
      javascript.javascriptGenerator.forBlock['operation'] = function (block, generator) {
        11
        var number_digit1 = block.getFieldValue('digit1');
        var dropdown_maths1 = block.getFieldValue('maths1');
        var number_digit2 = block.getFieldValue('digit2');
        var dropdown_maths2 = block.getFieldValue('maths2');
        var digit3 = generator.valueToCode(block, 'digit3', javascript.Order.ATOMIC);
        var code
        if (dropdown_maths2==='null') {
          code = number_digit1 + dropdown_maths1 + number_digit2;
        } else {
          code = '(' + number_digit1 + dropdown_maths1 + number_digit2 + ')' + dropdown_maths2 + digit3;
        }
        return [code, Order.MEMBER];
      };
      
    }
  
    // remainder:余数计算
    {
      Blockly.Blocks['remainder'] = {
        init: function () {
          this.jsonInit({
            "type": "remainder",
            "message0": "%1 %% %2 %3",
            "args0": [
              {
                "type": "input_value",
                "name": "digit1",
                "check": "Number"
              },
              {
                "type": "field_number",
                "name": "digit2",
                "value": 1
              },
              {
                "type": "input_end_row"
              }
            ],
            "inputsInline": true,
            "output": "Number",
            "colour": 150,
            "tooltip": "余数",
            "helpUrl": ""
          })
        }
      }
      javascript.javascriptGenerator.forBlock['remainder'] = function (block, generator) {
        var value_digit1 = generator.valueToCode(block, 'digit1', javascript.Order.ATOMIC) || 0;
        var number_digit2 = block.getFieldValue('digit2');
        if (number_digit2 === 0) {
          number_digit2 = 1
          block.setFieldValue(1, 'digit2');
        }
        // TODO: Assemble javascript into code variable.
        var code = value_digit1 + " % " + number_digit2;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
      
    }
  
   
  
    // big_small:两个数中较大的或较小的
    {
      Blockly.Blocks['big_small'] = {
        init: function () {
          this.jsonInit(
            {
              "type": "big_small",
              "message0": "%1 和 %2 %3 中 %4 的",
              "args0": [
                {
                  "type": "input_value",
                  "name": "digit1",
                  "check": "Number"
                },
                {
                  "type": "input_dummy"
                },
                {
                  "type": "input_value",
                  "name": "digit2",
                  "check": "Number"
                },
                {
                  "type": "field_dropdown",
                  "name": "maths",
                  "options": [
                    [
                      "较大",
                      ">="
                    ],
                    [
                      "较小",
                      "<"
                    ]
                  ]
                }
              ],
              "inputsInline": true,
              "output": "Number",
              "colour": 150,
              "tooltip": "",
              "helpUrl": ""
            }
          )
        }
      }
      javascript.javascriptGenerator.forBlock['big_small'] = function (block, generator) {
        var value_digit1 = generator.valueToCode(block, 'digit1', javascript.Order.ATOMIC);
        var value_digit2 = generator.valueToCode(block, 'digit2', javascript.Order.ATOMIC);
        var dropdown_maths = block.getFieldValue('maths');
        // TODO: Assemble javascript into code variable.
        var code = `if(${value_digit1}${dropdown_maths}${value_digit2}){\n return ${value_digit1} }\n else{\n return ${value_digit2}}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
  
    }
  
    //math_fun:方法
    {
      Blockly.Blocks['math_fun'] = {
        init: function () {
          this.jsonInit({
            "type": "math_fun",
            "message0": "方法 %1",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "maths",
                "options": [
                  [
                    "sin",
                    "sin"
                  ],
                  [
                    "cos",
                    "cos"
                  ],
                  [
                    "tan",
                    "tan"
                  ],
                  [
                    "绝对值",
                    "abs"
                  ],
                  [
                    "平方根",
                    "sqrt"
                  ],
                  [
                    "平方",
                    "pow"
                  ]
                ]
              }
            ],
            "inputsInline": true,
            "output": "Number",
            "colour": 150,
            "tooltip": "数学方法",
            "helpUrl": ""
          });
          // 改变输入个数的函数
          this.mathFunChange();
        },
  
        mathFunChange: function () {
          const dropdown = this.getField('maths');
          dropdown.setValidator((newValue) => {
            // 如果选定值不是"pow"，添加一个输入
            if (newValue !== 'pow') {
              // 如果选择 'Option 1'，添加一个输入
              this.removeInput('input2', true);
              if (!this.getInput('input1')) {
                this.appendValueInput('input1')
                  .setCheck('Number')
              }
            } else {
              if (!this.getInput('input2')) {
                this.appendValueInput('input2')
                  .setCheck('Number')
                  .appendField('的平方');
              }
            }
          })
        }
      }
      javascript.javascriptGenerator.forBlock['math_fun'] = function (block, generator) {
        var dropdown_maths = block.getFieldValue('maths');
        var value_input1 = generator.valueToCode(block, 'input1', javascript.Order.ATOMIC);
        var value_input2 = generator.valueToCode(block, 'input2', javascript.Order.ATOMIC);
        var code
        if (dropdown_maths !== 'pow') {
          code = 'Math.' + dropdown_maths + value_input1
        } else {
          code = 'Math.pow(' + value_input1 + ',' + value_input2 + ')'
        }
        // TODO: Assemble javascript into code variable.
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
    }
  
    // random:随机数
    {
      Blockly.Blocks['random'] = {
        init: function () {
          this.jsonInit(
            {
              "type": "random",
              "message0": "随机数：从 %1 到 %2",
              "args0": [
                {
                  "type": "field_number",
                  "name": "digit1",
                  "value": 0
                },
                {
                  "type": "field_number",
                  "name": "digit2",
                  "value": 1
                }
              ],
              "inputsInline": true,
              "output": "Number",
              "colour": 150,
              icon: "./pilcrow.png",
            }
          )
        }
  
      }
      javascript.javascriptGenerator.forBlock['random'] = function (block,) {1
        var number_digit = block.getFieldValue('digit1');
        var number_name = block.getFieldValue('digit2');
        // TODO: Assemble javascript into code variable.
        var code = `Math.floor(Math.random() * (${number_name} - ${number_digit} + 1)) + ${number_digit}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Order.MEMBER];
      };
    
    }
  
  }
