import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import dart from 'blockly/dart';

import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化


//功能
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
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "字符输出函数",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['string_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
        code = `printf("${value_value}");\n`;
      return code;
    };
    dart.dartGenerator.forBlock['string_printf'] = function (block, generator) {
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
          "previousStatement": null,
          "nextStatement": null,
          "colour": 230,
          "tooltip": "数字输出函数",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['number_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
      code = `printf("%d",${value_value});\n`;
      return code;
    };
    dart.dartGenerator.forBlock['number_printf'] = function (block, generator) {
      var value_value = generator.valueToCode(block, 'value', Order.NONE);
      var code = '';
      code = `console.log(${value_value});\n`;
      return code;
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
          "colour": 230,
          "tooltip": "求长度",
        });
      }
    }

    javascript.javascriptGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `strlen("${argument0}")`;
      return [code, Order.MEMBER];
    };
    dart.dartGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `("${argument0}").length`;
      return [code, Order.MEMBER];
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
          "colour": 230,
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