import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { dartGenerator } from 'blockly/dart';
import '@blockly/block-plus-minus';
import { XTaskCheckTypes } from '../config/config';
// 检查语言包是否已加载

// import "./if"

// false:逻辑块false
{
  Blockly.Blocks['false'] = {
    init: function () {
      this.jsonInit({
        "type": "false",
        "tooltip": "逻辑块false",
        "helpUrl": "",
        "message0": "false %1",
        "args0": [
          {
            "type": "input_dummy",
            "name": "NAME"
          }
        ],
        "output": "Boolean",
        "colour": '#FF962E'
      })
    }
  }
  javascriptGenerator.forBlock['false'] = function () {

    // TODO: Assemble javascript into the code variable.
    const code = 'false';
    // TODO: Change Order.NONE to the correct operator precedence strength
    return [code, Order.NONE];
  }

}
// true:逻辑块true
{
  Blockly.Blocks['true'] = {
    init: function () {
      this.jsonInit({
        "type": "true",
        "tooltip": "逻辑块true",
        "helpUrl": "",
        "message0": "true %1",
        "args0": [
          {
            "type": "input_dummy",
            "name": "NAME"
          }
        ],
        "output": "Boolean",
        "colour": '#FF962E'
      })
    }
  }
  javascriptGenerator.forBlock['true'] = function () {

    // TODO: Assemble javascript into the code variable.
    const code = 'true';
    // TODO: Change Order.NONE to the correct operator precedence strength
    return [code, Order.NONE];
  }

}

// if_else:if-else的执行块
{
  Blockly.Blocks['if_else'] = {
    init: function () {
      this.jsonInit({
        "type": "if_else",
        "tooltip": "if-else的执行块",
        "helpUrl": "",
        "message0": "如果 %1 %2 否则 %3",
        "args0": [
          {
            "type": "input_value",
            "name": "if",
            "check": "Boolean"
          },
          {
            "type": "input_statement",
            "name": "do",
            "check": XTaskCheckTypes
          },
          {
            "type": "input_statement",
            "name": "else",
            "check": XTaskCheckTypes
          }
        ],
        "previousStatement": XTaskCheckTypes,
        "nextStatement": XTaskCheckTypes,
        "colour": '#FF962E',
        "inputsInline": true
      })
    }
  }
  javascriptGenerator.forBlock['if_else'] = function (block, generator) {
    // TODO: change Order.ATOMIC to the correct operator precedence strength
    const value_if = generator.valueToCode(block, 'if', Order.ATOMIC);

    const statement_do = generator.statementToCode(block, 'do');

    const statement_else = generator.statementToCode(block, 'else');

    // TODO: Assemble javascript into the code variable.
    const code = `if (${value_if}) {\n${statement_do}} else {\n${statement_else}}`;
    return code;
  }

}
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
            "name": "operate",
            "check": XTaskCheckTypes
          }
        ],
        "previousStatement": XTaskCheckTypes,
        "nextStatement": XTaskCheckTypes,
        "colour": '#FF962E',
        "tooltip": "循环",
        "helpUrl": ""
      })
    },
  }

  javascriptGenerator.forBlock['cycle'] = function (block, generator) {
    var value_times = generator.valueToCode(block, 'times', Order.ATOMIC) || 0;
    var statements_operate = generator.statementToCode(block, 'operate');
    var indexVar = block.indexVar || "index1"; // 确保 index 变量存在

    var code = `for(int ${indexVar}=0; ${indexVar}<${value_times}; ${indexVar}++){\n${statements_operate}}\n`;
    return code;
};
 dartGenerator.forBlock['cycle'] = function (block, generator) {
    var value_times = generator.valueToCode(block, 'times', Order.ATOMIC) || 0;
    var statements_operate = generator.statementToCode(block, 'operate');
    var indexVar = block.indexVar || "index1"; // 确保 index 变量存在

    var code = `
    for (int ${indexVar} = 0; ${indexVar} < ${value_times}; ${indexVar}++) {
        ${statements_operate}
    }\n`;
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
        "colour": '#FF962E',
        "tooltip": "做比较",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['compare'] = function (block) {
    var number_digit1 = block.getFieldValue('digit1');
    var dropdown_maths = block.getFieldValue('maths');
    var number_digit2 = block.getFieldValue('digit2');
    // TODO: Assemble javascript into code variable.
    var code = number_digit1 + dropdown_maths + number_digit2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['compare'] = function (block) {
    var number_digit1 = block.getFieldValue('digit1');
    var dropdown_maths = block.getFieldValue('maths');
    var number_digit2 = block.getFieldValue('digit2');
    // TODO: Assemble dart into code variable.
    var code = number_digit1 + dropdown_maths + number_digit2;

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}
{
  Blockly.Blocks['compare_input'] = {
    init: function () {
      this.jsonInit({
        "type": "compare",
        "message0": "%1 %2 %3",
        "args0": [
          {
            "type": "input_value",
            "name": "number1",
            "check": "Number"
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
            "type": "input_value",
            "name": "number2",
            "check": "Number"
          },
        ],
        "output": "Boolean",
        "colour": '#FF962E',
        "tooltip": "做比较(输入变量版)",
        "inputsInline": true,
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['compare_input'] = function (block,generator) {
    var number_digit1 = generator.valueToCode(block, 'number1', Order.ATOMIC) || 0;
    var dropdown_maths = block.getFieldValue('maths');
    var number_digit2 = generator.valueToCode(block, 'number2', Order.ATOMIC) || 0;
    // TODO: Assemble javascript into code variable.
    var code = number_digit1 + dropdown_maths + number_digit2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['compare_input'] = function (block,generator) {
    var number_digit1 = generator.valueToCode(block, 'number1', Order.ATOMIC) || 0;
    var dropdown_maths = block.getFieldValue('maths');
    var number_digit2 = generator.valueToCode(block, 'number2', Order.ATOMIC) || 0;
    // TODO: Assemble dart into code variable.
    var code = number_digit1 + dropdown_maths + number_digit2;

    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}
//线程跳出
  {
    //break:跳出
    {
      Blockly.Blocks['break'] = {
        init: function () {
          this.jsonInit({
            "type": "printf",
            "message0": "break",
            "inputsInline": true,
            "previousStatement": XTaskCheckTypes,
            "nextStatement": XTaskCheckTypes,
            "colour": '#FF962E',
            "tooltip": "线程跳出线程",
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
            "previousStatement": XTaskCheckTypes,
            "nextStatement": XTaskCheckTypes,
            "colour": '#FF962E',
            "tooltip": "线程继续线程",
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
//single_compare:单比较
{
  Blockly.Blocks['single_compare'] = {
    init: function () {
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
        "colour": '#FF962E',
        "tooltip": "单判断",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['single_compare'] = function (block, generator) {
    var value_digit1 = generator.valueToCode(block, 'digit1', Order.ATOMIC) || 0;
    var dropdown_operation = block.getFieldValue('operation');
    var number_digit2 = block.getFieldValue('digit2');
    // TODO: Assemble javascript into code variable.
    var code = value_digit1 + dropdown_operation + number_digit2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['single_compare'] = function (block, generator) {
    var value_digit1 = generator.valueToCode(block, 'digit1', Order.ATOMIC) || 0;
    var dropdown_operation = block.getFieldValue('operation');
    var number_digit2 = block.getFieldValue('digit2');
    // TODO: Assemble dart into code variable.
    var code = value_digit1 + dropdown_operation + number_digit2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}

//if_judge:if单判断
{
  Blockly.Blocks['if_judge'] = {
    init: function () {
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
            "name": "operation",
            "check": XTaskCheckTypes
          }
        ],
        "previousStatement": XTaskCheckTypes,
        "nextStatement": XTaskCheckTypes,
        "inputsInline": true,
        "colour": '#FF962E',
        "tooltip": "if单判断",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['if_judge'] = function (block, generator) {
    var value_judge = generator.valueToCode(block, 'judge', Order.ATOMIC);
    var statements_operation = generator.statementToCode(block, 'operation');
    // TODO: Assemble javascript into code variable.
    var code = `if(${value_judge}){\n${statements_operation}}`;
    return code;
  };
  dartGenerator.forBlock['if_judge'] = function (block, generator) {
    var value_judge = generator.valueToCode(block, 'judge', Order.ATOMIC);
    var statements_operation = generator.statementToCode(block, 'operation');
    // TODO: Assemble javascript into code variable.
    var code = `if(${value_judge}){\n${statements_operation}}`;
    return code;
  };
}
//logical_negation:逻辑非
{
  Blockly.Blocks['logical_negation'] = {
    init: function () {
      this.jsonInit({
        "type": "logical_negation",
        "message0": "非 %1",
        "args0": [
          {
            "type": "input_value",
            "name": "judge",
            "check": [
              "Boolean",
              "Number"
           ]
          }
        ],
        "inputsInline": true,
        "output": "Boolean",
        "colour": '#FF962E',
        "tooltip": "逻辑非",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['logical_negation'] = function (block, generator) {
    var value_judge = generator.valueToCode(block, 'judge', Order.ATOMIC);
    // TODO: Assemble javascript into code variable.
    var code = `!${value_judge}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['logical_negation'] = function (block, generator) {
    var value_judge = generator.valueToCode(block, 'judge', Order.ATOMIC);
    // TODO: Assemble dart into code variable.
    var code = `!${value_judge}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}
//and_judge:与判断
{
  Blockly.Blocks['and_judge'] = {
    init: function () {
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
        "colour": '#FF962E',
        "tooltip": "与判断",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['and_judge'] = function (block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC) || false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC) || false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1}&&${value_judge2}`;
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['and_judge'] = function (block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC) || false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC) || false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1}&&${value_judge2}`;
    return [code, Order.MEMBER];
  };
}

//or_judge:或判断
{
  Blockly.Blocks['or_judge'] = {
    init: function () {
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
        "colour": '#FF962E',
        "tooltip": "或判断",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['or_judge'] = function (block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC) || false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC) || false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1} || ${value_judge2}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['or_judge'] = function (block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC) || false;
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC) || false;
    // TODO: Assemble javascript into code variable.
    var code = `${value_judge1} || ${value_judge2}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}

//and_or:与判断和或判断
{
  Blockly.Blocks['and_or'] = {
    init: function () {
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
        "colour": '#FF962E',
        "tooltip": "与或判断",
        "helpUrl": ""
      })
    }
  }
  javascriptGenerator.forBlock['and_or'] = function (block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC) || false;
    var dropdown_operation = block.getFieldValue('operation');
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC)|| false;
    // TODO: Assemble javascript into code variable.
    var code = value_judge1 + dropdown_operation + value_judge2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
  dartGenerator.forBlock['and_or'] = function (block, generator) {
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC) || false;
    var dropdown_operation = block.getFieldValue('operation');
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC) || false;
    // TODO: Assemble javascript into code variable.
    var code = value_judge1 + dropdown_operation + value_judge2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}

// // 检查并注销已经注册的扩展
// if (Blockly.Extensions.isRegistered('controls_if_mutator')) {
//   Blockly.Extensions.unregister('controls_if_mutator');
// }

// Blockly.Blocks['controls_if'] = {
//   init: function() {
//     this.jsonInit({
//       "type": "controls_if",
//       "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
//       "args0": [{
//         "type": "input_value",
//         "name": "IF0",
//         "check": "Boolean"
//       }],
//       "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
//       "args1": [{
//         "type": "input_statement",
//         "name": "DO0"
//       }],
//       "previousStatement": null,
//       "nextStatement": null,
//       "colour": Blockly.Msg['LOGIC_HUE'],
//       "helpUrl": Blockly.Msg['CONTROLS_IF_HELPURL'],
//       "mutator": "controls_if_mutator"
//     });
//   }
// };

// // 定义 mutator mixin
// const CONTROLS_IF_MUTATOR_MIXIN = {
//   mutationToDom: function() {
//     const container = Blockly.utils.xml.createElement('mutation');
//     for (let i = 1; i <= this.elseifCount_; i++) {
//       if (this.getInput(`IF${i}`)) {
//         const elseif = Blockly.utils.xml.createElement('elseif');
//         container.appendChild(elseif);
//       }
//     }
//     if (this.getInput('ELSE')) {
//       const elseInput = Blockly.utils.xml.createElement('else');
//       container.appendChild(elseInput);
//     }
//     return container;
//   },
//   domToMutation: function(xmlElement) {
//     for (let i = 1; i <= this.elseifCount_; i++) {
//       this.removeInput(`IF${i}`);
//       this.removeInput(`DO${i}`);
//     }
//     this.elseifCount_ = 0;
//     this.elseCount_ = 0;
//     for (let i = 0; i < xmlElement.childNodes.length; i++) {
//       const childNode = xmlElement.childNodes[i];
//       switch (childNode.nodeName) {
//         case 'elseif':
//           this.elseifCount_++;
//           this.appendValueInput(`IF${this.elseifCount_}`)
//               .setCheck('Boolean')
//               .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF']);
//           this.appendStatementInput(`DO${this.elseifCount_}`)
//               .appendField(Blockly.Msg['CONTROLS_IF_MSG_THEN']);
//           break;
//         case 'else':
//           this.elseCount_++;
//           this.appendStatementInput('ELSE')
//               .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSE']);
//           break;
//       }
//     }
//   }
// };

// // 注册扩展
// Blockly.Extensions.registerMutator('controls_if_mutator', CONTROLS_IF_MUTATOR_MIXIN, null, ['controls_if']);


