


import * as Blockly from 'blockly/core';
import {createMinusField} from './field_minus';
import {createPlusField} from './field_plus';

const controlsIfMutator = {

  elseIfCount_: 0,

  hasElse_: false,


  mutationToDom: function () {
    if (!this.elseIfCount_ && !this.hasElse_) {
      return null;
    }
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('elseif', this.elseIfCount_);
    if (this.hasElse_) {
      // Has to be stored as an int for backwards compat.
      container.setAttribute('else', 1);
    }
    return container;
  },

  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.hasElse_ = !!parseInt(xmlElement.getAttribute('else'), 10) || 0;
    if (this.hasElse_ && !this.getInput('ELSE')) {
      this.appendStatementInput('ELSE').appendField(
        Blockly.Msg['CONTROLS_IF_MSG_ELSE'],
      );
    }
    this.updateShape_(targetCount);
  },


  saveExtraState: function () {
    if (!this.elseIfCount_ && !this.hasElse_) {
      return null;
    }
    const state = Object.create(null);
    if (this.elseIfCount_) {
      state['elseIfCount'] = this.elseIfCount_;
    }
    if (this.hasElse_) {
      state['hasElse'] = true;
    }
    return state;
  },

  loadExtraState: function (state) {
    const targetCount = state['elseIfCount'] || 0;
    this.hasElse_ = state['hasElse'] || false;
    if (this.hasElse_ && !this.getInput('ELSE')) {
      this.appendStatementInput('ELSE').appendField(
        Blockly.Msg['CONTROLS_IF_MSG_ELSE'],
      );
    }
    this.updateShape_(targetCount);
  },


  updateShape_: function (targetCount) {
    while (this.elseIfCount_ < targetCount) {
      this.addElseIf_();
    }
    while (this.elseIfCount_ > targetCount) {
      this.removeElseIf_();
    }
  },

  plus: function () {
    this.addElseIf_();
  },

  minus: function (index) {
    if (this.elseIfCount_ == 0) {
      return;
    }
    this.removeElseIf_(index);
  },

  addElseIf_: function () {
    // Because else-if inputs are 1-indexed we increment first, decrement last.
    this.elseIfCount_++;
    this.appendValueInput('IF' + this.elseIfCount_)
      .setCheck('Boolean')
      .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF'])
      .appendField(
        createMinusField(this.elseIfCount_),
        'MINUS' + this.elseIfCount_,
      );
    this.appendStatementInput('DO' + this.elseIfCount_).appendField(
      Blockly.Msg['CONTROLS_IF_MSG_THEN'],
    );

    // Handle if-elseif-else block.
    if (this.getInput('ELSE')) {
      this.moveInputBefore('ELSE', /* put at end */ null);
    }
  },

  removeElseIf_: function (index = undefined) {

    if (index !== undefined && index != this.elseIfCount_) {
      // Each else-if is two inputs on the block:
      // the else-if input and the do input.
      const elseIfIndex = index * 2;
      const inputs = this.inputList;
      let connection = inputs[elseIfIndex].connection; // If connection.
      if (connection.isConnected()) {
        connection.disconnect();
      }
      connection = inputs[elseIfIndex + 1].connection; // Do connection.
      if (connection.isConnected()) {
        connection.disconnect();
      }
      this.bumpNeighbours();
      for (let i = elseIfIndex + 2, input; (input = this.inputList[i]); i++) {
        if (input.name == 'ELSE') {
          break; // Should be last, so break.
        }
        const targetConnection = input.connection.targetConnection;
        if (targetConnection) {
          this.inputList[i - 2].connection.connect(targetConnection);
        }
      }
    }

    this.removeInput('IF' + this.elseIfCount_);
    this.removeInput('DO' + this.elseIfCount_);
    // Because else-if inputs are 1-indexed we increment first, decrement last.
    this.elseIfCount_--;
  },
};

const controlsIfHelper = function () {
  this.getInput('IF0').insertFieldAt(0, createPlusField(), 'PLUS');
};

if (Blockly.Extensions.isRegistered('controls_if_mutator')) {
  Blockly.Extensions.unregister('controls_if_mutator');
}
Blockly.Extensions.registerMutator(
  'controls_if_mutator',
  controlsIfMutator,
  controlsIfHelper,
);