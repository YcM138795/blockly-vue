import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化


//功能
{
    //string_length:求长度
{
        Blockly.Blocks['string_length'] = {
            init: function() {
              this.jsonInit({
                "message0": 'length of %1',
                "args0": [
                  {
                    "type": "input_value",
                    "name": "VALUE",
                  }
                ],
                "output": "Number",
                "colour": 160,
                "tooltip": "求长度",
              });
            }
          }

          javascript.javascriptGenerator.forBlock['string_length'] = function(block, generator) {
    // String or array length.
    var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length'+'  js', Order.MEMBER];
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
          "colour": 230,
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
          "colour": 230,
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

  //direction：方向与角度
  {
    Blockly.Blocks['direction'] = {
      init: function () {
        this.jsonInit({
          "type": "turn",
          "message0": "方向 %1 %2 角度 %3",
          "args0": [
            {
              "type": "field_dropdown",
              "name": "方向",
              "options": [
                [
                  "lrft",
                  "左边",
  
                ],
                [
                  "right",
                  "右边",
  
                ]
              ]
            },
            {
              "type": "input_dummy"
            },
            {
              "type": "field_angle",
              "name": "角度",
              "angle": 90
            }
          ],
          "inputsInline": true,
          "output": "String",
          "colour": 195,
          "tooltip": "",
          "helpUrl": ""
        }
        );
      }
    }
    javascript.javascriptGenerator.forBlock['direction'] = function (block,) {
      var dropdown___ = block.getFieldValue('方向');
      var angle___ = block.getFieldValue('角度');
      // TODO: Assemble python into code variable.
      // TODO: Change ORDER_NONE to the correct strength.
      // return 'turn('+dropdown___+','+angle___+')';
      direction(dropdown___, angle___);
      return ''
    };
    
  }
  

}
function direction(direction, angle) {
    console.log(`向${direction}转了${angle}度`);
  }