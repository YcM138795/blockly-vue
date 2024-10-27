import * as Blockly from 'blockly';
import { EventBus } from '../utils/eventBus';
//块的上下文菜单
function registerFunctionBlockContextMenuOptions() {
  // 注册 "编辑函数" 选项
  const editOption = {
    displayText: '编辑函数',
    preconditionFn: function (scope) {
      if (scope.block.type === 'function_definition') {
        return 'enabled';
      }
      return 'hidden';
    },
    callback: function (scope) {
      EventBus.$emit('edit_function', scope.block);

    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'edit_function',
    weight: 100,
  };

  // 注册 "创建调用函数" 选项
  const useCallFunctionOption = {
    displayText: '创建调用函数',
    preconditionFn: function (scope) {
      if (scope.block.type === 'function_definition') {
        return 'enabled';
      }
      return 'hidden';
    },
    callback: function (scope) {
      const functionBlock = scope.block;// 获取函数定义块
      const position = functionBlock.getRelativeToSurfaceXY(); // 获取块的相对位置
      const functionName = functionBlock.getFieldValue('NAME');// 获取函数名

      // 创建调用函数块
      const newCallFunctionBlock = scope.block.workspace.newBlock(`call_function_${functionName}`); // 刷新工具箱

      // 使用 moveBy() 方法移动新块
      newCallFunctionBlock.moveBy(position.x, position.y - 40); // 将新块移到和函数定义块相同的位置
      newCallFunctionBlock.initSvg();
      newCallFunctionBlock.render();

    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'useCall_function',
    weight: 101,
  };

  // 注册选项
  Blockly.ContextMenuRegistry.registry.register(editOption);
  Blockly.ContextMenuRegistry.registry.register(useCallFunctionOption);
}


export { registerFunctionBlockContextMenuOptions };