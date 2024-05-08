import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化




// cycle:循环
{
    Blockly.Blocks['cycle'] = {
        init: function () {
            this.jsonInit({
                "type": "cycle",
                "message0": "重复 %1 次 %2 执行 %3",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "times",
                        "check": "Number"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "operate"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 105,
                "tooltip": "循环",
                "helpUrl": ""
            })
        }
    }
    javascript.javascriptGenerator.forBlock['cycle'] = function (block, generator) {
        var value_times = generator.valueToCode(block, 'times', javascript.Order.ATOMIC);
        var statements_operate = generator.statementToCode(block, 'operate');
        // TODO: Assemble javascript into code variable.
        var code = `for(int i=0;i<${value_times};i++){\n${statements_operate}}`;
        return code;
    };
}

 // compare:比较
 {
    Blockly.Blocks['compare'] = {
      init: function () {
        this.jsonInit({
          "type": "compare",
          "message0": "%1 %2 %3 %4",
          "args0": [
            {
              "type": "field_number",
              "name": "digit1",
              "value": 0,
              "precision": 1
            },
            {
              "type": "field_dropdown",
              "name": "maths",
              "options": [
                [
                  ">",
                  ">"
                ],
                [
                  ">=",
                  ">="
                ],
                [
                  "<",
                  "<"
                ],
                [
                  "<=",
                  "<="
                ],
                [
                  "==",
                  "=="
                ]
              ]
            },
            {
              "type": "field_number",
              "name": "digit2",
              "value": 0,
              "precision": 1
            },
            {
              "type": "input_value",
              "name": "operate",
              "check": "Number"
            }
          ],
          "output": "Boolean",
          "colour": 150,
          "tooltip": "做比较",
          "helpUrl": ""
        })
      }
    }
    javascript.javascriptGenerator.forBlock['compare'] = function (block, generator) {
      var number_digit1 = block.getFieldValue('digit1');
      var dropdown_name = block.getFieldValue('maths');
      var number_digit2 = block.getFieldValue('digit2');
      var value_name = generator.valueToCode(block, 'operate', javascript.Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = number_digit1 + dropdown_name + number_digit2 + value_name;
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Order.MEMBER];
    };
  }