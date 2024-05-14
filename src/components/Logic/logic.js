import Blockly from 'blockly'
import javascript from 'blockly/javascript';
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
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC);
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC);
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
    var value_judge1 = generator.valueToCode(block, 'judge1', javascript.Order.ATOMIC);
    var value_judge2 = generator.valueToCode(block, 'judge2', javascript.Order.ATOMIC);
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
    var value_judge1 = generator.valueToCode(block, 'judge1', Order.ATOMIC);
    var dropdown_operation = block.getFieldValue('operation');
    var value_judge2 = generator.valueToCode(block, 'judge2', Order.ATOMIC);
    // TODO: Assemble javascript into code variable.
    var code = value_judge1+dropdown_operation+value_judge2;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Order.MEMBER];
  };
}






// Blockly.Blocks['if_else_if_custom'] = {
//   init: function() {
//     this.jsonInit({
//       "type": "if_else_if_custom",
//       "message0": "if %1 then %2",
//       "args0": [
//         {
//           "type": "input_value",
//           "name": "IF0",
//           "check": "Boolean"
//         },
//         {
//           "type": "input_statement",
//           "name": "DO0"
//         }
//       ],
//       "mutator": "if_else_mutator",
//       "previousStatement": null,
//       "nextStatement": null,
//       "colour": 230,
//       "tooltip": "Custom if-else if block.",
//       "helpUrl": ""
//     });
//   }
// };

// javascript.javascriptGenerator.forBlock['controls_if'] = function( ) {
//   // TODO: Assemble javascript into code variable.
//   var code = `if_else_if_custom`;
//   return code;
// };
// Blockly.Extensions.registerMutator('if_else_mutator', {
//   // 初始化 mutator
//   function() {
//     this.elseifCount = 0;
//   },

//   // 添加“else if”部分的方法
//   addElseIfPart: function() {
//     this.elseifCount++;
//     const ifInputName = `IF${this.elseifCount}`;
//     const doInputName = `DO${this.elseifCount}`;
    
//     this.appendValueInput(ifInputName)
//       .setCheck("Boolean")
//       .appendField("else if");
    
//     this.appendStatementInput(doInputName)
//       .appendField("then");
//   },

//   // 保存块状态
//   saveExtraState: function() {
//     return {
//       elseifCount: this.elseifCount
//     };
//   },

//   // 恢复块状态
//   loadExtraState: function(state) {
//     this.elseifCount = state.elseifCount;
//     for (let i = 1; i <= this.elseifCount; i++) {
//       const ifInputName = `IF${i}`;
//       const doInputName = `DO${i}`;
      
//       this.appendValueInput(ifInputName)
//         .setCheck("Boolean")
//         .appendField("else if");
      
//       this.appendStatementInput(doInputName)
//         .appendField("then");
//     }
//   }
// });
// Blockly.Blocks['controls_if'] = {
//    /**
//     * Block for if/elseif/else condition.
//     * @this Blockly.Block
//     */
//    init: function() {
//      this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
//      this.setColour(Blockly.Blocks.logic.HUE);
//      this.appendValueInput('IF0')
//          .setCheck('Boolean')
//          .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
//      this.appendStatementInput('DO0')
//          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
//      this.setPreviousStatement(true);
//      this.setNextStatement(true);
//      this.setMutator(new Blockly.Mutator(['controls_if_elseif',
//                                           'controls_if_else']));
//      // Assign 'this' to a variable for use in the tooltip closure below.
//      var thisBlock = this;
//      this.setTooltip(function() {
//        if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
//          return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
//        } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
//          return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
//        } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
//          return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
//        } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
//          return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
//        }
//        return '';
//      });
//      this.elseifCount_ = 0;
//      this.elseCount_ = 0;
//    },
//    /**
//     * Create XML to represent the number of else-if and else inputs.
//     * @return {Element} XML storage element.
//     * @this Blockly.Block
//     */
//    mutationToDom: function() {
//      if (!this.elseifCount_ && !this.elseCount_) {
//        return null;
//      }
//      var container = document.createElement('mutation');
//      if (this.elseifCount_) {
//        container.setAttribute('elseif', this.elseifCount_);
//      }
//      if (this.elseCount_) {
//        container.setAttribute('else', 1);
//      }
//      return container;
//    },
//    /**
//     * Parse XML to restore the else-if and else inputs.
//     * @param {!Element} xmlElement XML storage element.
//     * @this Blockly.Block
//     */
//    domToMutation: function(xmlElement) {
//      this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
//      this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
//      this.updateShape_();
//    },
//    /**
//     * Populate the mutator's dialog with this block's components.
//     * @param {!Blockly.Workspace} workspace Mutator's workspace.
//     * @return {!Blockly.Block} Root block in mutator.
//     * @this Blockly.Block
//     */
//    decompose: function(workspace) {
//      var containerBlock = workspace.newBlock('controls_if_if');
//      containerBlock.initSvg();
//      var connection = containerBlock.nextConnection;
//      for (var i = 1; i <= this.elseifCount_; i++) {
//        var elseifBlock = workspace.newBlock('controls_if_elseif');
//        elseifBlock.initSvg();
//        connection.connect(elseifBlock.previousConnection);
//        connection = elseifBlock.nextConnection;
//      }
//      if (this.elseCount_) {
//        var elseBlock = workspace.newBlock('controls_if_else');
//        elseBlock.initSvg();
//        connection.connect(elseBlock.previousConnection);
//      }
//      return containerBlock;
//    },
//    /**
//     * Reconfigure this block based on the mutator dialog's components.
//     * @param {!Blockly.Block} containerBlock Root block in mutator.
//     * @this Blockly.Block
//     */
//    compose: function(containerBlock) {
//      var clauseBlock = containerBlock.nextConnection.targetBlock();
//      // Count number of inputs.
//      this.elseifCount_ = 0;
//      this.elseCount_ = 0;
//      var valueConnections = [null];
//      var statementConnections = [null];
//      var elseStatementConnection = null;
//      while (clauseBlock) {
//        switch (clauseBlock.type) {
//          case 'controls_if_elseif':
//            this.elseifCount_++;
//            valueConnections.push(clauseBlock.valueConnection_);
//            statementConnections.push(clauseBlock.statementConnection_);
//            break;
//          case 'controls_if_else':
//            this.elseCount_++;
//            elseStatementConnection = clauseBlock.statementConnection_;
//            break;
//          default:
//            throw 'Unknown block type.';
//        }
//        clauseBlock = clauseBlock.nextConnection &&
//            clauseBlock.nextConnection.targetBlock();
//      }
//      this.updateShape_();
//      // Reconnect any child blocks.
//      for (var i = 1; i <= this.elseifCount_; i++) {
//        Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
//        Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
//      }
//      Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
//    },
//    /**
//     * Store pointers to any connected child blocks.
//     * @param {!Blockly.Block} containerBlock Root block in mutator.
//     * @this Blockly.Block
//     */
//    saveConnections: function(containerBlock) {
//      var clauseBlock = containerBlock.nextConnection.targetBlock();
//      var i = 1;
//      while (clauseBlock) {
//        switch (clauseBlock.type) {
//          case 'controls_if_elseif':
//            var inputIf = this.getInput('IF' + i);
//            var inputDo = this.getInput('DO' + i);
//            clauseBlock.valueConnection_ =
//                inputIf && inputIf.connection.targetConnection;
//            clauseBlock.statementConnection_ =
//                inputDo && inputDo.connection.targetConnection;
//            i++;
//            break;
//          case 'controls_if_else':
//             inputDo = this.getInput('ELSE');
//            clauseBlock.statementConnection_ =
//                inputDo && inputDo.connection.targetConnection;
//            break;
//          default:
//            throw 'Unknown block type.';
//        }
//        clauseBlock = clauseBlock.nextConnection &&
//            clauseBlock.nextConnection.targetBlock();
//      }
//    },
//    /**
//     * Modify this block to have the correct number of inputs.
//     * @private
//     * @this Blockly.Block
//     */
//    updateShape_: function() {
//      // Delete everything.
//      if (this.getInput('ELSE')) {
//        this.removeInput('ELSE');
//      }
//      var i = 1;
//      while (this.getInput('IF' + i)) {
//        this.removeInput('IF' + i);
//        this.removeInput('DO' + i);
//        i++;
//      }
//      // Rebuild block.
//      for ( i = 1; i <= this.elseifCount_; i++) {
//        this.appendValueInput('IF' + i)
//            .setCheck('Boolean')
//            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
//        this.appendStatementInput('DO' + i)
//            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
//      }
//      if (this.elseCount_) {
//        this.appendStatementInput('ELSE')
//            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
//      }
//    }
//  };
 

