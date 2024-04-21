import Blockly from 'blockly'

Blockly.Extensions.register(
    'parent_tooltip_extension',
    function() { // this refers to the block that the extension is being run on
      var thisBlock = this;
      console.log('----=');
      this.setTooltip(function() {
        var parent = thisBlock.getParent();
        return (parent && parent.getInputsInline() && parent.tooltip) ||
            Blockly.Msg.MATH_NUMBER_TOOLTIP;
            
      });
    });