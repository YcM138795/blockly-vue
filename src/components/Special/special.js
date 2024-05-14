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
    
    //string:字符串
    {
      Blockly.Blocks['string'] = {
        init:function(){
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
      javascript.javascriptGenerator.forBlock['string'] = function(block) {
        var text_value = block.getFieldValue('value');
        // TODO: Assemble javascript into code variable.
        var code = `"${text_value}"`;
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
  
    // when_start:开始的函数
    {
      Blockly.Blocks['when_start'] = {
        init: function () {
          this.jsonInit({
            "type": "when_start",
            "message0": "%1",
            "args0": [
              {
                "type": "input_statement",
                "name": "operate"
              }
            ],
            "colour": 180,
            "tooltip": "开始",
            "helpUrl": ""
          })
        }
      }
      javascript.javascriptGenerator.forBlock['when_start'] = function (block) {
        var statements_operate = javascript.javascriptGenerator.statementToCode(block, 'operate');
        // TODO: Assemble javascript into code variable.
        var code = `int main(){\n${statements_operate} }`;
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
}

