// import Blockly from 'blockly'
// import { pythonGenerator, Order } from 'blockly/python';
// import { javascriptGenerator } from 'blockly/javascript';
// import * as hans from 'blockly/msg/zh-hans'
// Blockly.setLocale(hans);//汉化
// //  自定义组件注册

// //string_length:长度
// {
// Blockly.Blocks['string_length'] = {
//   init: function () {
//     this.jsonInit({
//       "message0": 'length of %1',
//       "args0": [
//         {
//           "type": "input_value",
//           "name": "VALUE",
//           "check": "String"
//         }
//       ],
//       "output": "Number",
//       "colour": 160,
//       "tooltip": "Returns number of letters in the provided text.",
//       "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
//     });
//   }
// }


// pythonGenerator.forBlock['string_length'] = function (block, generator) {
//   var value = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || "''";
//   return [value + '.length' + '  py', Order.ORDER_MEMBER];
// };

// javascriptGenerator.forBlock['string_length'] = function (block, generator) {
//   // String or array length.
//   var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
//   return [argument0 + '.length' + '  js', Order.MEMBER];
// };
// }

// // 调整tooltips提示消息，继承父类提示消息
// {

//   Blockly.Extensions.register(
//     'parent_tooltip_extension',
//     function() { // this refers to the block that the extension is being run on
//       var thisBlock = this;
//       this.setTooltip(function() {
//         var parent = thisBlock.getParent();
//         return (parent && parent.getInputsInline() && parent.tooltip) ||
//             Blockly.Msg.MATH_NUMBER_TOOLTIP;
            
//       });
//     });

//     Blockly.Blocks['child_block'] = {
//       init: function() {
//           this.appendValueInput('VALUE')
//               .setCheck('Number')
//               .appendField('Child block:');
//           this.setColour(160);
//           this.setTooltip('This is the child block');
  
//           // 应用 parent_tooltip_extension 扩展
//           Blockly.Extensions.apply('parent_tooltip_extension', this);
//       }
//   }

// }

// //自定义icon图标
// {
//   class MyIcon extends Blockly.icons.Icon {
//     // The constructor should always take in the source block so that svg elements
//     // can be properly created.
//     constructor(sourceBlock) {
//       super(sourceBlock);
//     }
//     getType() {
//       return new Blockly.icons.IconType('my_icon');
//     }
//     initView(pointerdownListener) {
//       if (this.svgRoot) return;  // Already initialized.

//       // This adds the pointerdownListener to the svgRoot element.
//       // If you do not call `super` you must do this yourself.
//       super.initView(pointerdownListener);

//       Blockly.utils.dom.createSvgElement(
//         Blockly.utils.Svg.IMAGE,  // 使用 Blockly.utils.Svg.IMAGE 来表示创建 image 元素
//         {
//           'href': '1_lychee.png',  // 图标的 URL，确保提供正确的图标路径
//           'width': '16',  // 图标的宽度
//           'height': '16',  // 图标的高度
//           'x': '0',  // 图标在 x 轴的位置
//           'y': '0',  // 图标在 y 轴的位置
//           'class': 'my-css-class'  // CSS 类（如果需要，可以指定样式）
//         },

//         this.svgRoot  // Append to the svgRoot.
//       );

//     } getSize() {
//       return new Blockly.utils.Size(16, 16);
//     }
//     getWeight() {
//       return 10;
//     }
//     onClick() {
//       // Do something when clicked.
//     }
//   }
//   Blockly.icons.registry.register(
//     new Blockly.icons.IconType('my_icon'), MyIcon);
// }

// // 数学
// {

//   // number_single：整数输入-单向
//   {
//     Blockly.Blocks['number_single'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "number_single",
//           "message0": "%1 %2",
//           "args0": [
//             {
//               "type": "field_number",
//               "name": "digit",
//               "value": 1
//             },
//             {
//               "type": "input_end_row"
//             }
//           ],
//           "output": "Number",
//           "colour": 150,
//           "tooltip": "整数输入-单向",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['number_single'] = function (block) {
//       var number_digit = block.getFieldValue('digit');
//       // TODO: Assemble javascript into code variable.
//       var code = number_digit;
//       console.log(Blockly.basic);
//       // Blockly.basic.showString("Hello!")
//       // TODO: Change ORDER_NONE to the correct strength. 
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['number_single'] = function (block) {
//       var number_digit = block.getFieldValue('digit');
//       // TODO: Assemble python into code variable.
//       var code = number_digit;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//   }

//   // number_double：整数输入-双向
//   {
//     Blockly.Blocks['number_double'] = {
//       init: function () {
//         this.jsonInit(
//           {
//             "type": "number_double",
//             "message0": "%1 %2",
//             "args0": [
//               {
//                 "type": "field_number",
//                 "name": "digit",
//                 "value": 1
//               },
//               {
//                 "type": "input_value",
//                 "name": "operate"
//               }
//             ],
//             "output": "Number",
//             "colour": 150,
//           }
//         )
//       }
//     }
//     javascript.javascriptGenerator.forBlock['number_double'] = function (block, generator) {
//       var number_digit = block.getFieldValue('digit');
//       var value_operate = generator.valueToCode(block, 'operate', javascript.Order.NONE);
//       // TODO: Assemble javascript into code variable.
//       var code = number_digit + value_operate;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['number_double'] = function (block, generator) {
//       var number_digit = block.getFieldValue('digit');
//       var value_operate = generator.valueToCode(block, 'operate', python.Order.NONE);
//       // TODO: Assemble python into code variable.
//       var code = number_digit + value_operate;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.NONE];
//     };
//   }

//   // single_operation:单运算
//   {
//     Blockly.Blocks['single_operation'] = {
//       init: function () {
//         this.jsonInit(
//           {
//             "type": "single_operation",
//             "message0": "%1 %2",
//             "args0": [
//               {
//                 "type": "field_dropdown",
//                 "name": "maths",
//                 "options": [
//                   [
//                     "+",
//                     "+"
//                   ],
//                   [
//                     "-",
//                     "-"
//                   ],
//                   [
//                     "×",
//                     "*"
//                   ],
//                   [
//                     "÷",
//                     "/"
//                   ],
//                   [
//                     "%",
//                     "%"
//                   ]
//                 ]
//               },
//               {
//                 "type": "input_value",
//                 "name": "operate",
//                 "check": "Number"
//               }
//             ],
//             "output": null,
//             "colour": 150,
//             "tooltip": "单运算",
//             "helpUrl": ""
//           }
//         )
//       }
//     }
//     javascript.javascriptGenerator.forBlock['single_operation'] = function (block, generator) {
//       var dropdown_maths = block.getFieldValue('maths');
//       var value_operate = generator.valueToCode(block, 'operate', javascript.Order.ATOMIC);
//       // TODO: Assemble javascript into code variable.
//       var code = dropdown_maths + value_operate;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['single_operation'] = function (block, generator) {
//       var dropdown_maths = block.getFieldValue('maths');
//       var value_operate = generator.valueToCode(block, 'operate', python.Order.ATOMIC);
//       // TODO: Assemble python into code variable.
//       var code = dropdown_maths + value_operate;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//   }

//   // operation:数学运算
//   {
//     Blockly.Blocks['operation'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "compute",
//           "message0": "%1 %2 %3 %4 %5",
//           "args0": [
//             {
//               "type": "field_number",
//               "name": "digit1",
//               "value": 0
//             },
//             {
//               "type": "field_dropdown",
//               "name": "maths1",
//               "options": [
//                 [
//                   "+",
//                   "+"
//                 ],
//                 [
//                   "–",
//                   "-"
//                 ],
//                 [
//                   "×",
//                   "*"
//                 ],
//                 [
//                   "÷",
//                   "/"
//                 ]
//               ]
//             },
//             {
//               "type": "field_number",
//               "name": "digit2",
//               "value": 0
//             },
//             {
//               "type": "field_dropdown",
//               "name": "maths2",
//               "options": [
//                 [
//                   "空",
//                   " "
//                 ],
//                 [
//                   "+",
//                   "+"
//                 ],
//                 [
//                   "–",
//                   "-"
//                 ],
//                 [
//                   "×",
//                   "*"
//                 ],
//                 [
//                   "÷",
//                   "/"
//                 ]
//               ]
//             },
//             {
//               "type": "input_value",
//               "name": "operate",
//               "check": "Number",
//               "align": "CENTRE"
//             }
//           ],
//           "output": "Number",
//           "colour": 150,
//           "tooltip": "运算",
//           "helpUrl": ""
//         })
//       }
//     }

//     javascriptGenerator.forBlock['operation'] = function (block, generator) {
//       11
//       var number_digit1 = block.getFieldValue('digit1');
//       var dropdown_maths1 = block.getFieldValue('maths1');
//       var number_digit2 = block.getFieldValue('digit2');
//       var dropdown_maths2 = block.getFieldValue('maths2');
//       var value_operate = generator.valueToCode(block, 'operate', javascript.Order.ATOMIC);
//       var code
//       if (!value_operate) {
//         code = number_digit1 + dropdown_maths1 + number_digit2;
//       } else {
//         if (dropdown_maths2 === ' ') {
//           block.setFieldValue('+', 'maths2');
//           console.log(dropdown_maths2);
//         }

//         code = '(' + number_digit1 + dropdown_maths1 + number_digit2 + ')' + dropdown_maths2 + value_operate;
//       }
//       return [code, Order.MEMBER];
//     };

//     python.pythonGenerator.forBlock['operation'] = function (block, generator) {
//       var text_digit1 = block.getFieldValue('digit1');
//       var dropdown_name1 = block.getFieldValue('maths1');
//       var number_digit2 = block.getFieldValue('digit2');
//       var dropdown_name2 = block.getFieldValue('maths2');
//       var value_name = generator.valueToCode(block, 'operate', python.Order.ATOMIC);
//       var code
//       if (!value_name) {
//         code = text_digit1 + dropdown_name1 + number_digit2;
//       } else {
//         if (dropdown_name2 === ' ') {
//           block.setFieldValue('+', 'maths2');
//         }
//         code = '(' + text_digit1 + dropdown_name1 + number_digit2 + ')' + dropdown_name2 + value_name;
//       }
//       return [code, Order.MEMBER];
//     };
//   }

//   // remainder:余数计算
//   {
//     Blockly.Blocks['remainder'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "remainder",
//           "message0": "%1 %% %2 %3",
//           "args0": [
//             {
//               "type": "input_value",
//               "name": "digit1",
//               "check": "Number"
//             },
//             {
//               "type": "field_number",
//               "name": "digit2",
//               "value": 1
//             },
//             {
//               "type": "input_end_row"
//             }
//           ],
//           "inputsInline": true,
//           "output": "Number",
//           "colour": 150,
//           "tooltip": "余数",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['remainder'] = function (block, generator) {
//       var value_digit1 = generator.valueToCode(block, 'digit1', javascript.Order.ATOMIC) || 0;
//       var number_digit2 = block.getFieldValue('digit2');
//       if (number_digit2 === 0) {
//         number_digit2 = 1
//         block.setFieldValue(1, 'digit2');
//       }
//       // TODO: Assemble javascript into code variable.
//       var code = value_digit1 + " % " + number_digit2;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['remainder'] = function (block, generator) {
//       var value_digit1 = generator.valueToCode(block, 'digit1', python.Order.ATOMIC) || 0;
//       var number_digit2 = block.getFieldValue('digit2');
//       if (number_digit2 === 0) {
//         number_digit2 = 1
//         block.setFieldValue(1, 'digit2');
//       }

//       // TODO: Assemble python into code variable.
//       var code = value_digit1 + " % " + number_digit2;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//   }

//   // compare:比较
//   {
//     Blockly.Blocks['compare'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "compare",
//           "message0": "%1 %2 %3 %4",
//           "args0": [
//             {
//               "type": "field_number",
//               "name": "digit1",
//               "value": 0,
//               "precision": 1
//             },
//             {
//               "type": "field_dropdown",
//               "name": "maths",
//               "options": [
//                 [
//                   ">",
//                   ">"
//                 ],
//                 [
//                   ">=",
//                   ">="
//                 ],
//                 [
//                   "<",
//                   "<"
//                 ],
//                 [
//                   "<=",
//                   "<="
//                 ],
//                 [
//                   "==",
//                   "=="
//                 ]
//               ]
//             },
//             {
//               "type": "field_number",
//               "name": "digit2",
//               "value": 0,
//               "precision": 1
//             },
//             {
//               "type": "input_value",
//               "name": "operate",
//               "check": "Number"
//             }
//           ],
//           "output": "Boolean",
//           "colour": 150,
//           "tooltip": "做比较",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['compare'] = function (block, generator) {
//       var number_digit1 = block.getFieldValue('digit1');
//       var dropdown_name = block.getFieldValue('maths');
//       var number_digit2 = block.getFieldValue('digit2');
//       var value_name = generator.valueToCode(block, 'operate', javascript.Order.ATOMIC);
//       // TODO: Assemble javascript into code variable.
//       var code = number_digit1 + dropdown_name + number_digit2 + value_name;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['compare'] = function (block, generator) {
//       var number_digit1 = block.getFieldValue('digit1');
//       var dropdown_name = block.getFieldValue('maths');
//       var number_digit2 = block.getFieldValue('digit2');
//       var value_name = generator.valueToCode(block, 'operate', python.Order.ATOMIC);
//       // TODO: Assemble python into code variable.
//       var code = number_digit1 + dropdown_name + number_digit2 + value_name;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//   }

//   // big_small:两个数中较大的或较小的
//   {
//     Blockly.Blocks['big_small'] = {
//       init: function () {
//         this.jsonInit(
//           {
//             "type": "big_small",
//             "message0": "%1 和 %2 %3 中 %4 的",
//             "args0": [
//               {
//                 "type": "input_value",
//                 "name": "digit1",
//                 "check": "Number"
//               },
//               {
//                 "type": "input_dummy"
//               },
//               {
//                 "type": "input_value",
//                 "name": "digit2",
//                 "check": "Number"
//               },
//               {
//                 "type": "field_dropdown",
//                 "name": "maths",
//                 "options": [
//                   [
//                     "较大",
//                     ">="
//                   ],
//                   [
//                     "较小",
//                     "<"
//                   ]
//                 ]
//               }
//             ],
//             "inputsInline": true,
//             "output": "Number",
//             "colour": 150,
//             "tooltip": "",
//             "helpUrl": ""
//           }
//         )
//       }
//     }
//     javascript.javascriptGenerator.forBlock['big_small'] = function (block, generator) {
//       var value_digit1 = generator.valueToCode(block, 'digit1', javascript.Order.ATOMIC);
//       var value_digit2 = generator.valueToCode(block, 'digit2', javascript.Order.ATOMIC);
//       var dropdown_maths = block.getFieldValue('maths');
//       // TODO: Assemble javascript into code variable.
//       var code = `if(${value_digit1}${dropdown_maths}${value_digit2}){\n return ${value_digit1} }\n else{\n return ${value_digit2}}`;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['big_small'] = function (block, generator) {
//       var value_digit1 = generator.valueToCode(block, 'digit1', python.Order.ATOMIC);
//       var value_digit2 = generator.valueToCode(block, 'digit2', python.Order.ATOMIC);
//       var dropdown_maths = block.getFieldValue('maths');
//       // TODO: Assemble python into code variable.
//       var code = `if${value_digit1}${dropdown_maths}${value_digit2}:\n    return${value_digit1}\nelse:\n    return${value_digit2}  `;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };

//   }

//   //math_fun
//   {
//     Blockly.Blocks['math_fun'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "math_fun",
//           "message0": "方法 %1",
//           "args0": [
//             {
//               "type": "field_dropdown",
//               "name": "maths",
//               "options": [
//                 [
//                   "sin",
//                   "sin"
//                 ],
//                 [
//                   "cos",
//                   "cos"
//                 ],
//                 [
//                   "tan",
//                   "tan"
//                 ],
//                 [
//                   "绝对值",
//                   "abs"
//                 ],
//                 [
//                   "平方根",
//                   "sqrt"
//                 ],
//                 [
//                   "平方",
//                   "pow"
//                 ]
//               ]
//             }
//           ],
//           "inputsInline": true,
//           "output": "Number",
//           "colour": 230,
//           "tooltip": "数学方法",
//           "helpUrl": ""
//         });
//         // 改变输入个数的函数
//         this.mathFunChange();
//       },

//       mathFunChange: function () {
//         const dropdown = this.getField('maths');
//         dropdown.setValidator((newValue) => {
//           // 如果选定值不是"pow"，添加一个输入
//           if (newValue !== 'pow') {
//             // 如果选择 'Option 1'，添加一个输入
//             this.removeInput('input2', true);
//             if (!this.getInput('input1')) {
//               this.appendValueInput('input1')
//                 .setCheck('Number')
//                 .appendField('  ');
//             }
//           } else {
//             if (!this.getInput('input2')) {
//               this.appendValueInput('input2')
//                 .setCheck('Number')
//                 .appendField('的平方');
//             }
//           }
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['math_fun'] = function (block, generator) {
//       var dropdown_maths = block.getFieldValue('maths');
//       var value_input1 = generator.valueToCode(block, 'input1', javascript.Order.ATOMIC);
//       var value_input2 = generator.valueToCode(block, 'input2', javascript.Order.ATOMIC);
//       var code
//       if (dropdown_maths !== 'pow') {
//         code = 'Math.' + dropdown_maths + value_input1
//       } else {
//         code = 'Math.pow(' + value_input1 + ',' + value_input2 + ')'
//       }
//       // TODO: Assemble javascript into code variable.
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['math_fun'] = function (block, generator) {
//       var dropdown_maths = block.getFieldValue('maths');
//       var value_input1 = generator.valueToCode(block, 'input1', python.Order.ATOMIC);
//       var value_input2 = generator.valueToCode(block, 'input2', python.Order.ATOMIC);
//       var code
//       if (dropdown_maths !== 'pow') {
//         if (dropdown_maths === 'abs') {
//           code = dropdown_maths + value_input1
//         } else {
//           code = 'math.' + dropdown_maths + value_input1
//         }
//       } else {
//         // python里的平方
//         code = '(' + value_input1 + '**' + value_input2 + ')'
//       }
//       // TODO: Assemble python into code variable.
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//   }

//   // random:随机数
//   {
//     Blockly.Blocks['random'] = {
//       init: function () {
//         this.jsonInit(
//           {
//             "type": "random",
//             "message0": "随机数：从 %1 到 %2",
//             "args0": [
//               {
//                 "type": "field_number",
//                 "name": "digit1",
//                 "value": 0
//               },
//               {
//                 "type": "field_number",
//                 "name": "digit2",
//                 "value": 1
//               }
//             ],
//             "inputsInline": true,
//             "output": "Number",
//             "colour": 150,
//             icon: "./pilcrow.png",
//           }
//         )
//       }

//     }
//     javascript.javascriptGenerator.forBlock['random'] = function (block,) {
//       var number_digit = block.getFieldValue('digit1');
//       var number_name = block.getFieldValue('digit2');
//       // TODO: Assemble javascript into code variable.
//       var code = `Math.floor(Math.random() * (${number_name} - ${number_digit} + 1)) + ${number_digit}`;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//     python.pythonGenerator.forBlock['random'] = function (block,) {
//       var number_digit = block.getFieldValue('digit1');
//       var number_name = block.getFieldValue('digit2');
//       // TODO: Assemble python into code variable.
//       var code = `random.randint(${number_digit}, ${number_name})`;
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.MEMBER];
//     };
//   }

// }

// // 基础
// {
//   // fill:填充
//   {
//     Blockly.Blocks['fill'] = {
//       init: function () {
//         this.jsonInit(
//           {
//             "type": "fill",
//             "message0": "",
//             "output": null,
//             "colour": 180,
//             "tooltip": "无作用，填充",
//             "helpUrl": ""
//           }
//         )
//       }
//     }
//     javascript.javascriptGenerator.forBlock['fill'] = function () {
//       // TODO: Assemble javascript into code variable.
//       var code = '';
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.NONE];
//     };
//     python.pythonGenerator.forBlock['fill'] = function () {
//       // TODO: Assemble python into code variable.
//       var code = '';
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.NONE];
//     };
//   }

//   // barcket:括号
//   {
//     Blockly.Blocks['bracket'] = {
//       init: function () {
//         this.jsonInit(
//           {
//             "type": "bracket",
//             "message0": "( %1 %2 )",
//             'icons': {
//               // Your state goes here!
//               'my_icon': 'my_icon',
//             },
//             "args0": [
//               {
//                 "type": "input_dummy"
//               },
//               {
//                 "type": "input_value",
//                 "name": "digit"
//               }
//             ],
//             "inputsInline": false,
//             "output": null,
//             "colour": 180,
//             "icon": 'my_icon',
//             "tooltip": "括号",
//             "helpUrl": ""
//           }
//         );
//       }
//     }
//     javascript.javascriptGenerator.forBlock['bracket'] = function (block, generator) {
//       var value_digit = generator.valueToCode(block, 'digit', javascript.Order.ATOMIC);
//       // TODO: Assemble javascript into code variable.
//       var code = '(' + value_digit + ')';
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.NONE];
//     };
//     python.pythonGenerator.forBlock['bracket'] = function (block, generator) {
//       var value_digit = generator.valueToCode(block, 'digit', python.Order.ATOMIC);
//       // TODO: Assemble python into code variable.
//       var code = '(' + value_digit + ')';
//       // TODO: Change ORDER_NONE to the correct strength.
//       return [code, Order.NONE];
//     };
//   }

//   // when_start:开始的函数
//   {
//     Blockly.Blocks['when_start'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "when_start",
//           "message0": "%1",
//           "args0": [
//             {
//               "type": "input_statement",
//               "name": "operate"
//             }
//           ],
//           "colour": 105,
//           "tooltip": "开始",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['when_start'] = function (block,) {
//       var statements_operate = javascriptGenerator.statementToCode(block, 'operate');
//       // TODO: Assemble javascript into code variable.
//       var code = `int main(){\n${statements_operate} }`;
//       return code;
//     };
//   }

//   // cycle:循环
//   {
//     Blockly.Blocks['cycle'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "cycle",
//           "message0": "重复 %1 次 %2 执行 %3",
//           "args0": [
//             {
//               "type": "input_value",
//               "name": "times",
//               "check": "Number"
//             },
//             {
//               "type": "input_dummy"
//             },
//             {
//               "type": "input_statement",
//               "name": "operate"
//             }
//           ],
//           "previousStatement": null,
//           "nextStatement": null,
//           "colour": 105,
//           "tooltip": "循环",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['cycle'] = function (block, generator) {
//       var value_times = generator.valueToCode(block, 'times', javascript.Order.ATOMIC);
//       var statements_operate = generator.statementToCode(block, 'operate');
//       // TODO: Assemble javascript into code variable.
//       var code = `for(int i=0;i<${value_times};i++){\n${statements_operate}}`;
//       return code;
//     };
//   }

//   //open_led:亮灯
//   {
//     Blockly.Blocks['open_led'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "open__led",
//           "message0": "亮灯      持续时间 %1",
//           "args0": [
//             {
//               "type": "field_number",
//               "name": "digital",
//               "value": -1
//             }
//           ],
//           "previousStatement": null,
//           "nextStatement": null,
//           "colour": 230,
//           "tooltip": "亮灯",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['open_led'] = function (block) {
//       var number_digital = block.getFieldValue('digital');
//       var code;
//       // TODO: Assemble javascript into code variable.
//       if (number_digital >= 0) {
//         var time = number_digital * 1000;
//         code = `bflb_gpio_set(gpio, GPIO_PIN_32);\nbflb_mtimer_delay_ms(${time});\n`
//       } else {
//         code = 'bflb_gpio_set(gpio, GPIO_PIN_32);\n';
//       }
//       return code;
//     };
//   }
//   //close_led:灭灯
//   {
//     Blockly.Blocks['close_led'] = {
//       init: function () {
//         this.jsonInit({
//           "type": "close_led",
//           "message0": "灭灯    持续时间 %1",
//           "args0": [
//             {
//               "type": "field_number",
//               "name": "digital",
//               "value": -1
//             }
//           ],
//           "inputsInline": true,
//           "previousStatement": null,
//           "nextStatement": null,
//           "colour": 230,
//           "tooltip": "灭灯",
//           "helpUrl": ""
//         })
//       }
//     }
//     javascript.javascriptGenerator.forBlock['close_led'] = function (block) {
//       var number_digital = block.getFieldValue('digital');

//       var code;
//       // TODO: Assemble javascript into code variable.
//       if (number_digital >= 0) {
//         var time = number_digital * 1000;
//         code = `bflb_gpio_reset(gpio, GPIO_PIN_32);\nbflb_mtimer_delay_ms(${time});\n`
//       } else {
//         code = 'bflb_gpio_reset(gpio, GPIO_PIN_32);\n';
//       }

//       return code;
//     };
//   }
// }

// // turn：转向方向与角度
// {
//   Blockly.Blocks['direction'] = {
//     init: function () {
//       this.jsonInit({
//         "type": "turn",
//         "message0": "方向 %1 %2 角度 %3",
//         "args0": [
//           {
//             "type": "field_dropdown",
//             "name": "方向",
//             "options": [
//               [
//                 "lrft",
//                 "左边",

//               ],
//               [
//                 "right",
//                 "右边",

//               ]
//             ]
//           },
//           {
//             "type": "input_dummy"
//           },
//           {
//             "type": "field_angle",
//             "name": "角度",
//             "angle": 90
//           }
//         ],
//         "inputsInline": true,
//         "output": "String",
//         "colour": 195,
//         "tooltip": "",
//         "helpUrl": ""
//       }
//       );
//     }
//   }
//   pythonGenerator.forBlock['direction'] = function (block,) {
//     var dropdown___ = block.getFieldValue('方向');
//     var angle___ = block.getFieldValue('角度');
//     // TODO: Assemble python into code variable.
//     // TODO: Change ORDER_NONE to the correct strength.
//     // return 'turn('+dropdown___+','+angle___+')';
//     direction(dropdown___, angle___);
//     return ''
//   };
//   javascriptGenerator.forBlock['direction'] = function (block,) {
//     var dropdown___ = block.getFieldValue('方向');
//     var angle___ = block.getFieldValue('角度');
//     // TODO: Assemble python into code variable.
//     // TODO: Change ORDER_NONE to the correct strength.
//     // return 'turn('+dropdown___+','+angle___+')';
//     direction(dropdown___, angle___);
//     return ''
//   };
// }
// function direction(direction, angle) {
//   console.log(`向${direction}转了${angle}度`);
// }