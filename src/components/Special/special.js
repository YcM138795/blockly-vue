import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化


// 基础
{
  // fill:填充
  {
    Blockly.Blocks['fill'] = {
      init: function () {
        this.jsonInit(
          {
            "type": "fill",
            "message0": "",
            "output": null,
            "colour": 180,
            "tooltip": "无作用，填充",
            "helpUrl": ""
          }
        )
      }
    }
    javascript.javascriptGenerator.forBlock['fill'] = function () {
      // TODO: Assemble javascript into code variable.
      var code = '';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.NONE];
    };

  }
  //number_variable:变量
  {
    Blockly.Blocks['number_variable'] = {
      init:function(){
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
    javascript.javascriptGenerator.forBlock['number_variable'] = function(block, generator) {
      var text_value1 = block.getFieldValue('value1');
      var value_value2 = generator.valueToCode(block, 'value2', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
     var code = `int ${text_value1} = ${value_value2};\n`;
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
    javascript.javascriptGenerator.forBlock['string'] = function (block) {
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
    javascript.javascriptGenerator.forBlock['bracket'] = function (block, generator) {
      var value_digit = generator.valueToCode(block, 'digit', javascript.Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = '(' + value_digit + ')';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.NONE];
    };

  }

  // int_main:开始的函数
  {
    Blockly.Blocks['int_main'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("开始入口");
        this.appendStatementInput("operate")
            .setCheck(null);
        this.setColour(180);
     this.setTooltip("开始(唯一且不可删除)");
     this.setHelpUrl("");
     this.setDeletable(false);
      }
    };
    javascript.javascriptGenerator.forBlock['int_main'] = function (block) {
      var statements_operate = javascript.javascriptGenerator.statementToCode(block, 'operate');
      // TODO: Assemble javascript into code variable.
      var code = `int main(){\n${statements_operate} \nreturn 0;\n}`;
      return code;
    };
  }

  //open_led:亮灯
  {
    Blockly.Blocks['open_led'] = {
      init: function () {
        this.jsonInit({
          "type": "open__led",
          "message0": "亮灯      持续时间 %1",
          "args0": [
            {
              "type": "field_number",
              "name": "digital",
              "value": -1
            }
          ],
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180,
          "tooltip": "亮灯",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['open_led'] = function (block) {
      var number_digital = block.getFieldValue('digital');
      var code;
      // TODO: Assemble javascript into code variable.
      if (number_digital >= 0) {
        var time = number_digital * 1000;
        code = `bflb_gpio_set(gpio, GPIO_PIN_32);\nbflb_mtimer_delay_ms(${time});\n`
      } else {
        code = 'bflb_gpio_set(gpio, GPIO_PIN_32);\n';
      }
      return code;
    };
  }

  //close_led:灭灯
  {
    Blockly.Blocks['close_led'] = {
      init: function () {
        this.jsonInit({
          "type": "close_led",
          "message0": "灭灯    持续时间 %1",
          "args0": [
            {
              "type": "field_number",
              "name": "digital",
              "value": -1
            }
          ],
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
          "colour": 180,
          "tooltip": "灭灯",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['close_led'] = function (block) {
      var number_digital = block.getFieldValue('digital');

      var code;
      // TODO: Assemble javascript into code variable.
      if (number_digital >= 0) {
        var time = number_digital * 1000;
        code = `bflb_gpio_reset(gpio, GPIO_PIN_32);\nbflb_mtimer_delay_ms(${time});\n`
      } else {
        code = 'bflb_gpio_reset(gpio, GPIO_PIN_32);\n';
      }

      return code;
    };
  }


  Blockly.Blocks['test'] = {
    init: function () {
      this.jsonInit({
        "type": "test",
        "message0": "%1",
        "args0": [
          {
            "type": "field_image",
            "src": "https://www.zjhzu.edu.cn/_upload/site/00/03/3/logo.png",
            "width": 194,
            "height": 60,
            "alt": "",
            "flipRtl": false
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['test'] = function () {
    // TODO: Assemble javascript into code variable.
    var code = '\
 _   _ _   _ ______   _  ___  _   _       ____ ___  _     _     _____ ____ _____ \n\
| | | | | | |__  / | | |/ _ \\| | | |     / ___/ _\\ \\| |   | |   | ____/ ___| ____|\n\
| |_| | | | | / /| |_| | | | | | | |     | |  | | | | |   | |   |  _|| |   |  _|  \n\
|  _  | |_| |/ /_|  _  | |_| | |_| |     | |__| |_| | |___| |___| |__| |___| |___ \n\
|_| |_|\\___//____|_| |_|\\___/ \\___/       \\____\\___/|_____|_____|_____\\____|_____|\n\
                                                                                       ';
    return code;
  };
  Blockly.Blocks['test2'] = {
    init: function () {
      this.jsonInit({
        "type": "test2",
        "message0": "%1 %2",
        "args0": [
          {
            "type": "field_image",
            "src": "https://course.educg.net/cguserImages?_img=249193891f75c729ab6a0f0f91b13e34.jpg",
            "width": 140,
            "height": 60,
            "alt": "",
            "flipRtl": false
          },
          {
            "type": "input_value",
            "name": "value"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['test2'] = function (block,generator) {
    var value_value = generator.valueToCode(block, 'value', javascript.Order.ATOMIC);
    // TODO: Assemble javascript into code variable.
    return '\n ____         __ _                               _____             _                      _   \n\
/ ___|  ___  / _| |___      ____ _ _ __ ___     | ____|_ __   __ _(_)_ __   ___  ___ _ __(_)_ __   __ _ \n\
\\___\\\\ / _ \\| |_| __\\ \\ /\\ / / _` | \'__/ _ \\    |  _| | \'_ \\ / _` | | \'_ \\ / _ \\/ _ \\ \'__| | \'_ \\ / _` \\|\n\
 ___) | (_) |  _| |_ \\ V  V / (_| | | |  __/    | |___| | | | (_| | | | | |  __/  __/ |  | | | | | (_| \\|\n\
|____/ \\___/|_|  \\__| \\_/\\_/ \\__,_|_|  \\___|    |_____|_| |_|\\__, |_|_| |_|\\___|\\___|_|  |_|_| |_|\\__, \\|\n\
                                                             |___/                                |___/ \n'+value_value;
  };

}


