import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';
import '@blockly/field-bitmap';

// 基础
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
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180,
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
    dartGenerator.forBlock['number_variable'] = function (block, generator) {
      var text_value1 = block.getFieldValue('value1');
      var value_value2 = generator.valueToCode(block, 'value2', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = `let ${text_value1} = ${value_value2};\n`;
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
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180
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
    dartGenerator.forBlock['Decrease'] = function (block) {
      const text_target_value = block.getFieldValue('target_value');
      const number_digit = block.getFieldValue('digit');

      // TODO: Assemble dart into the code variable.
      const code = `${text_target_value} -= ${number_digit};\n`;
      return code;
    };
  }

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
          "colour": 180,
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
    dartGenerator.forBlock['string'] = function (block) {
      var text_value = block.getFieldValue('value');
      // TODO: Assemble javascript into code variable.
      var code = `${text_value}`;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.MEMBER];
    };

  }

  // barcket:括号
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
            "colour": 180,
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
    dartGenerator.forBlock['bracket'] = function (block, generator) {
      var value_digit = generator.valueToCode(block, 'digit', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = '(' + value_digit + ')';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.NONE];
    };

  }

  // int_main:开始的函数
  {
    Blockly.Blocks['int_main'] = {
      init: function () {
        this.appendDummyInput()
          .appendField("开始入口");
        this.appendStatementInput("operate")
          .setCheck(null);
        this.setColour(180);
        this.setTooltip("开始(唯一且不可删除)");
        this.setPreviousStatement(true, null);
        this.setHelpUrl("");
        this.setDeletable(false);
      }
    };
    javascriptGenerator.forBlock['int_main'] = function (block) {
      var statements_operate = javascriptGenerator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      var code = `int main(void){
  board_init();
  usbdev_init();
  board_sdh_gpio_init();
  fatfs_sdh_driver_register();
  ota_init();
  cdc_acm_init();\n
${statements_operate}
  vTaskStartScheduler();
	while (1);\n}`;
      return code;
    };
    dartGenerator.forBlock['int_main'] = function (block, generator) {
      var statements_operate = generator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      // var code =`int main(){\n${statements_operate} \nreturn 0;\n}` ;
      var code = `${statements_operate}`;
      return code;
    };
  }

  // light_task:灯操作函数
  {
    Blockly.Blocks['light_task'] = {
      init: function () {
        this.jsonInit({
          "type": "light_task",
          "tooltip": "灯操作函数(仅一个)",
          "helpUrl": "",
          "message0": "灯操作函数 %1 %2",
          "args0": [
            {
              "type": "input_dummy",
              "name": "NAME"
            },
            {
              "type": "input_statement",
              "name": "operate"
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180
        })
      }
    };
    javascriptGenerator.forBlock['light_task'] = function (block, generator) {
      var statements_operate = generator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      var code = `void light_task(void *param){\n${statements_operate}}\n`;
      return code;
    };
  }

  // fmq_task:蜂鸣器操作函数
  {
    Blockly.Blocks['fmq_task'] = {
      init: function () {
        this.jsonInit({
          "type": "fmq_task",
          "tooltip": "蜂鸣器操作函数(仅一个)",
          "helpUrl": "",
          "message0": "蜂鸣器操作函数 %1 %2",
          "args0": [
            {
              "type": "input_dummy",
              "name": "NAME"
            },
            {
              "type": "input_statement",
              "name": "operate"
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180
        })
      }
    };
    javascriptGenerator.forBlock['fmq_task'] = function (block, generator) {
      var statements_operate = generator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      var code = `void fmq_task(void *param){\n${statements_operate}}\n`;
      return code;
    };
  }

  // motors_task:电机操作函数
  {
    Blockly.Blocks['motors_task'] = {
      init: function () {
        this.jsonInit({
          "type": "motors_task",
          "tooltip": "电机操作函数(仅一个)",
          "helpUrl": "",
          "message0": "电机操作函数 %1 %2",
          "args0": [
            {
              "type": "input_dummy",
              "name": "NAME"
            },
            {
              "type": "input_statement",
              "name": "operate"
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180
        })
      }
    };
    javascriptGenerator.forBlock['motors_task'] = function (block, generator) {
      var statements_operate = generator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      var code = `void motors_task(void *param){\n${statements_operate}}\n`;
      return code;
    };
  }

  // ultrasonic_task:超声波操作函数
  {
    Blockly.Blocks['ultrasonic_task'] = {
      init: function () {
        this.jsonInit({
          "type": "ultrasonic_task",
          "tooltip": "超声波操作函数(仅一个)",
          "helpUrl": "",
          "message0": "超声波操作函数 %1 %2",
          "args0": [
            {
              "type": "input_dummy",
              "name": "NAME"
            },
            {
              "type": "input_statement",
              "name": "operate"
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180
        })
      }
    };
    javascriptGenerator.forBlock['ultrasonic_task'] = function (block, generator) {
      var statements_operate = generator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      var code = `void ultrasonic_task(void *param){\n${statements_operate}}\n`;
      return code;
    };
  }

  // // light_task:灯操作函数
  // {
  //   Blockly.Blocks['light_task'] = {
  //     init: function () {
  //       this.jsonInit({
  //         "type": "light_task",
  //         "tooltip": "灯操作函数(仅一个)",
  //         "helpUrl": "",
  //         "message0": "灯操作函数 %1 %2",
  //         "args0": [
  //           {
  //             "type": "input_dummy",
  //             "name": "NAME"
  //           },
  //           {
  //             "type": "input_statement",
  //             "name": "operate"
  //           }
  //         ],
  //         "previousStatement": null,
  //         "nextStatement": null,
  //         "colour": 180
  //       })
  //     }
  //   };
  //   javascriptGenerator.forBlock['light_task'] = function (block,generator) {
  //     var statements_operate = generator.statementToCode(block, 'operate');
  //     // TODO: Assemble javascript into code variable.
  //     var code = `void light_task(void *param){\n${statements_operate}}\n`;
  //     return code;
  //   };
  // }





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
      "previousStatement": null,
      "nextStatement": null,
      "colour": 180
    },
  ]);
  javascriptGenerator.forBlock['test_field_bitmap'] = function () {
    // TODO: Assemble javascript into code variable.
    var code = ``;
    return code;
  };


}


