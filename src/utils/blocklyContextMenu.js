import  * as Blockly from 'blockly';

function registerOutputOption() {
    const outputOption = {
      displayText: 'I have an output connection',
      preconditionFn: function (scope) {
        if (scope.block.type === 'function_definition') {
          return 'enabled';
        }
        return 'hidden';
      },
      callback: function (scope) {
        console.log(scope.block);

      },
      scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
      id: 'block_has_output',
      weight: 100,
    };
    Blockly.ContextMenuRegistry.registry.register(outputOption);
  }

  export { registerOutputOption };