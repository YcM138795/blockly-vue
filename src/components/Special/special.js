import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import dart from 'blockly/dart';

import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化


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
    javascript.javascriptGenerator.forBlock['number_variable'] = function (block, generator) {
      var text_value1 = block.getFieldValue('value1');
      var value_value2 = generator.valueToCode(block, 'value2', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = `int ${text_value1} = ${value_value2};\n`;
      return code;
    };
    dart.dartGenerator.forBlock['number_variable'] = function (block, generator) {
      var text_value1 = block.getFieldValue('value1');
      var value_value2 = generator.valueToCode(block, 'value2', Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = `let ${text_value1} = ${value_value2};\n`;
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
    dart.dartGenerator.forBlock['string'] = function (block) {
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
      var value_digit = generator.valueToCode(block, 'digit', dart.Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = '(' + value_digit + ')';
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.NONE];
    };
    dart.dartGenerator.forBlock['bracket'] = function (block, generator) {
      var value_digit = generator.valueToCode(block, 'digit', dart.Order.ATOMIC);
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



}


