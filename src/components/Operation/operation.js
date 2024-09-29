import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';


//操作
{
  //输出
  {
    //string_printf:输出
    {
      Blockly.Blocks['string_printf'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "字符输出 %1",
            "args0": [
              {
                "type": "input_value",
                "name": "value"
              }
            ],
            "inputsInline": true,
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230,
            "tooltip": "字符输出函数",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['string_printf'] = function (block, generator) {
        var value_value = generator.valueToCode(block, 'value', Order.NONE);
        var code = '';
        code = `printf("${value_value}");\n`;
        return code;
      };
      dartGenerator.forBlock['string_printf'] = function (block, generator) {
        var value_value = generator.valueToCode(block, 'value', Order.NONE);
        var code = '';
        code = `console.log("${value_value}");\n`;
        return code;
      };
    }

    //number_printf:输出
    {
      Blockly.Blocks['number_printf'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "数字输出 %1",
            "args0": [
              {
                "type": "input_value",
                "name": "value"
              }
            ],
            "inputsInline": true,
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230,
            "tooltip": "数字输出函数",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['number_printf'] = function (block, generator) {
        var value_value = generator.valueToCode(block, 'value', Order.NONE);
        var code = '';
        code = `printf("%d",${value_value});\n`;
        return code;
      };
      dartGenerator.forBlock['number_printf'] = function (block, generator) {
        var value_value = generator.valueToCode(block, 'value', Order.NONE);
        var code = '';
        code = `console.log(${value_value});\n`;
        return code;
      };
    }
  }

  //输入
  {
    //when_button_dowm:当按钮被按下执行 
    {
      Blockly.Blocks['when_button_dowm'] = {
        init: function () {
          this.jsonInit({
            "type": "when_button_dowm",
            "tooltip": "当按钮被按下执行",
            "helpUrl": "",
            "message0": "当 %1 被按下 %2 %3",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "choose",
                "options": [
                  [
                    "A",
                    "A"
                  ],
                  [
                    "B",
                    "B"
                  ]
                ]
              },
              {
                "type": "input_dummy",
                "name": "NAME"
              },
              {
                "type": "input_statement",
                "name": "operation",
                "check": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task']
              }
            ],
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230
          });
        }
      }

      javascriptGenerator.forBlock['when_button_dowm'] = function (block, generator) {
        const dropdown_choose = block.getFieldValue('choose');

        const statement_operation = generator.statementToCode(block, 'operation');

        // TODO: Assemble javascript into the code variable.
        const code = `if(${dropdown_choose}){\n${statement_operation}}\n`;
        return code;
      }
    }
    //cheak_button_dowm:校验按钮按下 
    {
      Blockly.Blocks['cheak_button_dowm'] = {
        init: function () {
          this.jsonInit({
            "type": "cheak_button_dowm",
            "tooltip": "校验按钮按下",
            "helpUrl": "",
            "message0": "当 %1 被按下 %2",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "choose",
                "options": [
                  [
                    "A",
                    "A"
                  ],
                  [
                    "B",
                    "B"
                  ]
                ]
              },
              {
                "type": "input_dummy",
                "name": "NAME"
              }
            ],
            "output": "Boolean",
            "colour": 230
          });
        }
      }

      javascriptGenerator.forBlock['cheak_button_dowm'] = function (block) {
        const dropdown_choose = block.getFieldValue('choose');

        // TODO: Assemble javascript into the code variable.
        const code = `${dropdown_choose}`;
        // TODO: Change Order.NONE to the correct operator precedence strength
        return [code, Order.NONE];
      }
    }
  }



  //函数跳出
  {
    //break:跳出
    {
      Blockly.Blocks['break'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "break",
            "inputsInline": true,
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230,
            "tooltip": "函数跳出函数",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['break'] = function () {
        return `break;\n`;
      };
      //   dartGenerator.forBlock['break'] = function (block, generator) {
      //     var value_value = generator.valueToCode(block, 'value', Order.NONE);
      //     var code = '';
      //       code = `console.log("${value_value}");\n`;
      //     return code;
      //   };
    }

    //continue:继续
    {
      Blockly.Blocks['continue'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "continue ",
            "inputsInline": true,
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230,
            "tooltip": "函数继续函数",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['continue'] = function () {
        return `continue;\n`;
      };
      //   dartGenerator.forBlock['continue'] = function (block, generator) {
      //     var value_value = generator.valueToCode(block, 'value', Order.NONE);
      //     var code = '';
      //       code = `console.log("${value_value}");\n`;
      //     return code;
      //   };
    }

  }

  //常量操作
  {
    //number_variable:变量
    {
      Blockly.Blocks['number_variable'] = {
        init: function () {
          this.jsonInit({
            "type": "number_variable",
            "message0": "定义 %1 = %2 %3",
            "args0": [
              {
                "type": "field_input",
                "name": "value1",
                "text": "a"
              },
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "value2"
              }
            ],
            "inputsInline": true,
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230,
            "tooltip": "数字常量定义",
            "helpUrl": ""
          })
        }
      }
      javascriptGenerator.forBlock['number_variable'] = function (block, generator) {
        var text_value1 = block.getFieldValue('value1');
        var value_value2 = generator.valueToCode(block, 'value2', Order.ATOMIC);
        // TODO: Assemble javascript into code variable.
        var code = `int ${text_value1} = ${value_value2};\n`;
        return code;
      };
    }
    //Decrease:变量自减
    {
      Blockly.Blocks['Decrease'] = {
        init: function () {
          this.jsonInit({
            "type": "Decrease",
            "tooltip": "变量自减",
            "helpUrl": "",
            "message0": "自减 %1 每次自减 %2 %3",
            "args0": [
              {
                "type": "field_input",
                "name": "target_value",
                "text": "a"
              },
              {
                "type": "field_number",
                "name": "digit",
                "value": 1
              },
              {
                "type": "input_dummy",
                "name": "target"
              }
            ],
            "previousStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "nextStatement": ['XTask_light_task', 'XTask_fmq_task', 'XTask_servo_task', 'XTask_motors_task', 'XTask_ultrasonic_task'],
            "colour": 230
          })
        }
      }
      javascriptGenerator.forBlock['Decrease'] = function (block) {
        const text_target_value = block.getFieldValue('target_value');
        const number_digit = block.getFieldValue('digit');

        // TODO: Assemble javascript into the code variable.
        const code = `${text_target_value} -= ${number_digit};\n`;
        return code;
      }
    }

  }


}

Blockly.Blocks['function_definition'] = {
  init: function () {
    this.jsonInit({
      "type": "function_definition",
      "tooltip": "",
      "helpUrl": "",
      "message0": "",
      "args0": [
      ],
      "style": "function_definition_style",
      // "extensions": ["custom_function_extension"],
    });
  }
};
Blockly.Themes.Classic.blockStyles["function_definition_style"] = {
  "colourPrimary": "#5b67a5",
  "colourSecondary": "#4a56a3",
  "colourTertiary": "#3a46a1",
  "hat": "cap"
};
javascriptGenerator.forBlock['function_definition'] = function (block, generator) {
  // console.log(block.inputList[1].fieldRow);
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
    console.log(preFix);

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
      parmType = 'string';
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
    } else if (valueAfterPrefix == '数字数字') {
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
Blockly.ContextMenuRegistry.registry.register({
  displayText: '编辑函数',
  preconditionFn: function (object) {
    console.log('注册了');
    
    return object instanceof Blockly.Block && object.type === 'function_definition';
  },
  callback: function (object) {
    var functionName = object.getFieldValue('NAME');
    console.log(functionName);
    
    // 弹出编辑对话框
    openEditDialog(object);
  }
});
function openEditDialog(block) {
  var currentName = block.getFieldValue('NAME');
  var newName = prompt("编辑函数名", currentName);
  if (newName) {
    block.setFieldValue(newName, 'NAME');
  }
}



