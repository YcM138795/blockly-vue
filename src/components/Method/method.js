import * as Blockly from 'blockly/core';
import {javascriptGenerator, Order} from 'blockly/javascript';
import {dartGenerator} from 'blockly/dart';



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
          "previousStatement": null,
          "nextStatement": null,
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

    javascriptGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `strlen("${argument0}")`;
      return [code, Order.MEMBER];
    };
    dartGenerator.forBlock['string_length'] = function (block, generator) {
      // String or array length.
      var argument0 = generator.valueToCode(block, 'VALUE', Order.FUNCTION_CALL) || '\'\'';
      var code = `("${argument0}").length`;
      return [code, Order.MEMBER];
    };
  }

  //break:跳出
  {
    Blockly.Blocks['break'] = {
      init: function () {
        this.jsonInit({
          "type": "printf",
          "message0": "break",
          "inputsInline": true,
          "previousStatement": null,
          "nextStatement": null,
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
          "previousStatement": null,
          "nextStatement": null,
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


