import * as Blockly from 'blockly/core';
import {createPlusField} from './field_plus';
import {createMinusField} from './field_minus';

// delete Blockly.Blocks['lists_create_with'];

Blockly.defineBlocksWithJsonArray([
  {
    type: 'lists_create_with1',
    message0: '%{BKY_LISTS_CREATE_EMPTY_TITLE} %1',
    args0: [
      {
        type: 'input_dummy',
        name: 'EMPTY',
      },
    ],
    output: 'Array',
    // style: 'list_blocks',
    helpUrl: '%{BKY_LISTS_CREATE_WITH_HELPURL}',
    tooltip: '%{BKY_LISTS_CREATE_WITH_TOOLTIP}',
    mutator: 'new_list_create_with_mutator',
  },
]);


const listCreateMutator = {

  itemCount_: 0,

//   mutationToDom: function () {
//     const container = Blockly.utils.xml.createElement('mutation');
//     container.setAttribute('items', this.itemCount_);
//     return container;
//   },

//   domToMutation: function (xmlElement) {
//     const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
//     this.updateShape_(targetCount);
//   },

  saveExtraState: function () {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function (state) {
    this.updateShape_(state['itemCount']);
  },

  updateShape_: function (targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
    this.updateMinus_();
  },

  plus: function () {
    this.addPart_();
    this.updateMinus_();
  },

  minus: function () {
    if (this.itemCount_ == 0) {
      return;
    }
    this.removePart_();
    this.updateMinus_();
  },

  addPart_: function () {
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
      this.topInput_ = this.appendValueInput('ADD' + this.itemCount_)
        .appendField(createPlusField(), 'PLUS') 
        .appendField(Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH']);
    } else {
      this.appendValueInput('ADD' + this.itemCount_);
    }
    this.itemCount_++;
  },

  removePart_: function () {
    this.itemCount_--;
    this.removeInput('ADD' + this.itemCount_);
    if (this.itemCount_ == 0) {
      this.topInput_ = this.appendDummyInput('EMPTY')
        .appendField(createPlusField(), 'PLUS')
        .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
    }
  },

  
  updateMinus_: function () {
    const minusField = this.getField('MINUS');
    if (!minusField && this.itemCount_ > 0) {
      this.topInput_.insertFieldAt(1, createMinusField(), 'MINUS');
    } else if (minusField && this.itemCount_ < 1) {
      this.topInput_.removeField('MINUS');
    }
  },
};


const listCreateHelper = function () {
  this.getInput('EMPTY').insertFieldAt(0, createPlusField(), 'PLUS');
  this.updateShape_(3);
};

Blockly.Extensions.registerMutator(
  'new_list_create_with_mutator',
  listCreateMutator,
  listCreateHelper,
);
