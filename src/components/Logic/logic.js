import Blockly from 'blockly'
import javascript from 'blockly/javascript';
import dart from 'blockly/dart';

import { Order } from 'blockly/javascript';

import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);//汉化
import "./if"



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
        "colour": 210,
        "tooltip": "循环",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['cycle'] = function (block, generator) {
    var value_times = generator.valueToCode(block, 'times', javascript.Order.ATOMIC) || 0;
    var statements_operate = generator.statementToCode(block, 'operate');
    // TODO: Assemble javascript into code variable.
    var code = `for(int i=0;i<${value_times};i++){\n${statements_operate}}`;
    return code;
  };
  dart.dartGenerator.forBlock['cycle'] = function(block, generator) {
    var value_times = generator.valueToCode(block, 'times', dart.Order.ATOMIC) || 0;
    var statements_operate = generator.statementToCode(block, 'operate');

    // TODO: Assemble dart into code variable.
    var code = `
    for (let i = 0; i < ${value_times}; i++) {
        ${statements_operate}
    }
    `;
    return code;
  };

}

// compare:比较
{
  Blockly.Blocks['compare'] = {
    init: function () {
      this.jsonInit({
        "type": "compare",
        "message0": "%1 %2 %3",
        "args0": [
          {
            "type": "field_number",
            "name": "digit1",
            "value": 0,
            "precision": 0
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
                "=",
                "=="
              ]
            ]
          },
          {
            "type": "field_number",
            "name": "digit2",
            "value": 0,
            "precision": 0
          }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "做比较",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['compare'] = function(block) {
  var number_digit1 = block.getFieldValue('digit1');
  var dropdown_maths = block.getFieldValue('maths');
  var number_digit2 = block.getFieldValue('digit2');
  // TODO: Assemble javascript into code variable.
  var code = number_digit1+dropdown_maths+number_digit2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.MEMBER];
};
dart.dartGenerator.forBlock['compare'] = function(block) {
  var number_digit1 = block.getFieldValue('digit1');
  var dropdown_maths = block.getFieldValue('maths');
  var number_digit2 = block.getFieldValue('digit2');
  // TODO: Assemble dart into code variable.
  var code = number_digit1+dropdown_maths+number_digit2;

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.MEMBER];
};
}

//single_compare:单比较
{
  Blockly.Blocks['single_compare'] = {
    init:function(){
      this.jsonInit({
        "type": "single_compare",
        "message0": "%1 %2 %3 %4",
        "args0": [
          {
            "type": "input_value",
            "name": "digit1",
            "check": "Number"
          },
          {
            "type": "field_dropdown",
            "name": "operation",
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
                "=",
                "=="
              ]
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "digit2",
            "value": 0
          }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": 210,
        "tooltip": "单判断",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['single_compare'] = function(block, generator) {
    var value_digit1 = generator.valueToCode(block, 'digit1', javascript.Order.ATOMIC) || 0;
    var dropdown_operation = block.getFieldValue('operation');
    var number_digit2 = block.getFieldValue('digit2');
    // TODO: Assemble javascript into code variable.
    var code = value_digit1+dropdown_operation+number_digit2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dart.dartGenerator.forBlock['single_compare'] = function(block, generator) {
    var value_digit1 = generator.valueToCode(block, 'digit1', dart.Order.ATOMIC) || 0;
    var dropdown_operation = block.getFieldValue('operation');
    var number_digit2 = block.getFieldValue('digit2');
    // TODO: Assemble dart into code variable.
    var code = value_digit1+dropdown_operation+number_digit2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}

//if_judge:if单判断
{
  Blockly.Blocks['if_judge'] = {
    init :function(){
      this.jsonInit({
        "type": "if_judge",
        "message0": "如果 %1 则执行 %2 %3",
        "args0": [
          {
            "type": "input_value",
            "name": "judge",
            "check": [
              "Boolean",
              "Number"
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "operation"
          }
        ],

        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210,
        "tooltip": "if单判断",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['if_judge'] = function(block, generator) {
    var value_judge  = generator.valueToCode(block, 'judge', javascript.Order.ATOMIC);
    var statements_operation = generator.statementToCode(block, 'operation');
    // TODO: Assemble javascript into code variable.
    var code = `if(${value_judge}){\n${statements_operation}}`;
    return code;
  };
  dart.dartGenerator.forBlock['if_judge'] = function(block, generator) {
    var value_judge  = generator.valueToCode(block, 'judge', dart.Order.ATOMIC);
    var statements_operation = generator.statementToCode(block, 'operation');
    // TODO: Assemble javascript into code variable.
    var code = `if(${value_judge}){\n${statements_operation}}`;
    return code;
  };
}

//and_judge:与判断
{
  Blockly.Blocks['and_judge'] = {
    init:function(){
      this.jsonInit({
        "type": "and_judge",
        "message0": "当 %1 与 %2 %3 都正确",
        "args0": [
          {
            "type": "input_value",
            "name": "judge1",
            "check": [
              "Boolean",
              "Number"
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "judge2",
            "check": [
              "Boolean",
              "Number"
            ]
          }     
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "与判断",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['and_judge'] = function(block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC)|| false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1}&&${value_judge2}`;
    return  [code,Order.MEMBER];
  };
  dart.dartGenerator.forBlock['and_judge'] = function(block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC)|| false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1}&&${value_judge2}`;
    return  [code,Order.MEMBER];
  };
}

//or_judge:或判断
{
  Blockly.Blocks['or_judge'] = {
    init:function(){
      this.jsonInit({
        "type": "or_judge",
        "message0": "当 %1 或 %2 %3 有正确",
        "args0": [
          {
            "type": "input_value",
            "name": "judge1",
            "check": [
              "Boolean",
              "Number"
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "judge2",
            "check": [
              "Boolean",
              "Number"
            ]
          }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "或判断",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['or_judge'] = function(block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', javascript.Order.ATOMIC) || false;
    var value_judge2 = generator.valueToCode(block, 'judge2', javascript.Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1} || ${value_judge2}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dart.dartGenerator.forBlock['or_judge'] = function(block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC)|| false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1} || ${value_judge2}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}

//and_or:与判断和或判断
{
  Blockly.Blocks['and_or'] = {
    init:function(){
      this.jsonInit({
        "type": "and_or",
        "message0": "%1 %2 %3 %4",
        "args0": [
          {
            "type": "input_value",
            "name": "judge1",
            "check": [
              "Number",
              "Boolean"
            ]
          },
          {
            "type": "field_dropdown",
            "name": "operation",
            "options": [
              [
                "与",
                "&&"
              ],
              [
                "或",
                "||"
              ]
            ]
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "judge2",
            "check": [
              "Number",
              "Boolean"
            ]
          }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "与或判断",
        "helpUrl": ""
      })
    }
  }
  javascript.javascriptGenerator.forBlock['and_or'] = function(block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC)|| false;
    var dropdown_operation = block.getFieldValue('operation');
    var value_judge2 = generator.valueToCode(block, 'j  udge2', Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = value_judge1+dropdown_operation+value_judge2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dart.dartGenerator.forBlock['and_or'] = function(block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC)|| false;
    var dropdown_operation = block.getFieldValue('operation');
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = value_judge1+dropdown_operation+value_judge2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}





