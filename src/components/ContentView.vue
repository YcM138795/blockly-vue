<template>
  <div>
    <!-- 函数编辑对话框 -->
    <el-dialog title="创建函数" :visible.sync="isVisible_function" @close="closeEditor_function"
      :close-on-click-modal="false" width="50%">
      <el-form>
        <el-form-item label="参数类型">
          <button @click="addParm('文本')">文本</button>
          <button @click="addParm('布尔值')">布尔值</button>
          <select ref="numberSelect" @change="handleChange('numberSelect')">
            <option value="" disabled selected>数字</option>
            <option value="整形">整形</option>
            <option value="浮点数">浮点数</option>
            <option value="长整形">长整形</option>
          </select>
          <select ref="arraySelect" @change="handleChange('arraySelect')">
            <option value="" selected disabled>数组</option>
            <option value="数字数组">数字数组</option>
            <option value="字符数组">字符数组</option>
            <option value="浮点数数组">浮点数数组</option>
          </select>
        </el-form-item>
      </el-form>

      <!-- Blockly工作区容器 -->
      <div id="blockly-container" style="height: 300px; width: 100%; border: 1px solid #ddd; margin-top: 20px;"></div>

      <div slot="footer" class="dialog-footer">
        <button type="primary" @click="saveFunction">保存</button>
      </div>
    </el-dialog>
    <el-dialog title="创建常数" :visible.sync="isVisible_constant" @close="closeEditor_constant"
      :close-on-click-modal="false" width="30%">
      <input type="text" placeholder="请输入常数名" class="constantInput" id="constantInput">
      <div slot="footer" class="dialog-footer">
        <button type="primary" @click="saveConstant">保存</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EventBus } from '../utils/eventBus';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import './Advanced/advanced'
import { getFieldName } from '../utils/functionBlockUtils'
import { useAdvancedBlockStore } from '@/store/advancedBlockStore';//引入自定义函数的store



export default {
  name: 'ContentView',
  data() {
    return {
      isVisible_function: false,//函数编辑对话框是否可见
      isVisible_constant: false,//常数编辑对话框是否可见
      workspace: null,
      selectedParams: ['myFunction'], // 存储选中的参数类型
      currentDeleteButton: null,//当前删除按钮的存储
      newBlock: null,//新块的存储
      newBlockPosition: { x: 50, y: 50 },//新块的位置
      block: 0,//已经添加的存储块
      oddBlock: null,//存储奇数块
      advancedBlockStore: useAdvancedBlockStore(),//自定义函数的store
    };
  },
  methods: {
    //函数部分
    // 显示函数编辑对话框
    functionShowEditor() {

      this.isVisible_function = true;
      this.$nextTick(() => {
        this.initializeBlockly();
      });
    },

    // 关闭函数编辑对话框
    closeEditor_function() {
      // 清理工作区和状态
      this.oddBlock = null;
      this.selectedParams = ['myFunction'];
      if (this.workspace) {
        this.workspace.dispose();
        this.workspace = null; // 确保 workspace 被清理
      }
      // 现在可以安全地隐藏对话框
      this.isVisible_function = false;
    },

    // 初始化 Blockly
    initializeBlockly() {
      const blockly_container = document.getElementById('blockly-container');
      this.workspace = Blockly.inject(blockly_container, {
        renderer: 'zelos', // 设置渲染器为 Zelos
        theme: Blockly.Themes.Classic, // 使用 Classic 主题
      });

      this.updateBlock();
    },

    // 更新块
    updateBlock() {
      if (!this.workspace) return;

      this.workspace.clear(); // 清除之前的所有块

      // 创建新的块并添加到工作区
      this.newBlock = this.workspace.newBlock('function_definition');
      // 删除原有的输入项
      if (this.newBlock.getInput('funName')) {
        this.newBlock.removeInput('funName');
      }
      if (this.newBlock.getInput('Param')) {
        this.newBlock.removeInput('Param');
      }
      if (this.newBlock.getInput('inner')) {
        this.newBlock.removeInput('inner');  // 删除执行部分（语句输入区）
      }

      this.newBlock.contextMenu = false;
      this.newBlock.initSvg();
      this.newBlock.render();

      // 设置块的位置
      const x = this.newBlockPosition.x; // x坐标，可以根据需要设置
      const y = this.newBlockPosition.y; // y坐标，可以根据需要设置
      this.newBlock.moveBy(x, y);

      //记录当前的this指向
      let that = this;
      this.workspace.configureContextMenu = function (options) {

        options.forEach(option => {
          if (option.text === '重做') {
            // 启用重做选项
            option.enabled = true;
            // 重写重做的 callback
            option.callback = function () {
              console.log('重做操作被执行');
              // 这里是你想要执行的自定义操作
              that.selectedParams = ['myFunction'];
              that.updateBlock();
            };
          } else {
            // 其他选项可以禁用或保留原样
            option.enabled = false;
          }
        });
      };

      // 注册全局事件监听器
      this.workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_MOVE && event.blockId === this.newBlock.id) {
          const block = this.workspace.getBlockById(event.blockId);
          if (block) {
            const position = block.getRelativeToSurfaceXY();
            this.newBlockPosition.x = position.x;
            this.newBlockPosition.y = position.y;
          }
        }
      });

      //记录当前的this指向
      this.newBlock.appendDummyInput('funName')
        .appendField('函数')
        .appendField(new Blockly.FieldTextInput(this.selectedParams[0], function (newValue) {
          // 当函数名字被修改时，更新 selectedParams[0]
          that.selectedParams[0] = newValue;
          return newValue; // 返回新的值
        }), 'NAME');

      // 创建一个横向排列的容器
      const horizontalInput = this.newBlock.appendDummyInput('Param').appendField('参数:');

      if (this.selectedParams.length !== 1) {
        // 根据 selectedParams 更新块的输入
        this.selectedParams.forEach((param, index) => {
          if (index > 0) {
            let name = ''
            let parts = param.split('--&&--');   // 使用 "--" 分隔字符串

            let valueBeforePrefix = parts[0]; // 获取 "--" 前面的部分
            let valueAfterPrefix = parts[1]; // 获取 "--" 后面的部分
            if (valueBeforePrefix === '') {
              name = valueAfterPrefix;
            } else {
              name = valueBeforePrefix;
            }

            let inputField;
            let inputName;

            // 为每种参数类型创建对应的输入字段
            if (valueAfterPrefix === '文本') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'text--&--' + index;
            } else if (valueAfterPrefix === '布尔值') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'boolean--&--' + index;
            } else if (valueAfterPrefix === '整形') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'number_int--&--' + index;
            } else if (valueAfterPrefix === '浮点数') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'number_double--&--' + index; 2
            } else if (valueAfterPrefix === '长整形') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'number_long--&--' + index;
            } else if (valueAfterPrefix === '数字数组') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'array_int--&--' + index;
            } else if (valueAfterPrefix === '字符数组') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'array_string--&--' + index;
            } else if (valueAfterPrefix === '浮点数数组') {
              inputField = new Blockly.FieldTextInput(`${name}`);
              inputName = 'array_double--&--' + index;
            }

            // 在横向容器中添加字段
            horizontalInput.appendField(inputField, inputName);

            // 监听参数字段的点击事件
            inputField.getSvgRoot().addEventListener('click', (event) => {
              this.showDeleteIcon(event, inputField, index);
            });

            // 设置一个回调函数来监听输入字段的变化
            inputField.onFinishEditing_ = (newValue) => {
              // 确保 selectedParams 被正确初始化
              if (this.selectedParams && index >= 0 && index < this.selectedParams.length) {
                this.selectedParams[index] = newValue + '--&&--' + valueAfterPrefix;
              } else {
                console.error('selectedParams is not defined or index is out of bounds');
              }
            };
          }


        });
      }

      // 添加其他的块内容（如执行部分）
      this.newBlock.appendStatementInput('inner').appendField('执行');
      this.block = this.newBlock;
    },

    // 显示删除图标
    showDeleteIcon(event, inputField, index) {

      // 移除当前显示的删除图标（如果有的话）
      if (this.currentDeleteButton) {
        this.currentDeleteButton.remove();
        this.currentDeleteButton = null;
      }

      // 获取输入字段的 SVG 根元素
      const inputFieldElement = inputField.getSvgRoot();
      if (!inputFieldElement) {
        console.error('无法获取输入字段的 SVG 根元素');
        return;
      }

      // 获取参数框的位置和尺寸
      const rect = inputFieldElement.getBoundingClientRect();
      const newBlockRect = this.newBlock.getSvgRoot().getBoundingClientRect();

      // 获取参数框的中心坐标
      const X = rect.left - newBlockRect.left + rect.width / 4;
      const Y = 110;

      // 创建删除图标
      const deleteButton = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      deleteButton.setAttribute('href', require('@/assets/SVG/参数垃圾桶.svg'));
      deleteButton.setAttribute('width', '30');
      deleteButton.setAttribute('height', '30');
      deleteButton.setAttribute('x', X); // 图标中心对齐参数框的中心
      deleteButton.setAttribute('y', Y); // 图标中心对齐参数框的中心

      // 点击删除图标的事件
      deleteButton.onclick = (event) => {
        event.stopPropagation(); // 防止触发父元素的点击事件
        this.removeParam(index);
      };

      // 将删除图标添加到字段的 SVG 元素的父元素中
      inputFieldElement.parentNode.appendChild(deleteButton);
      this.currentDeleteButton = deleteButton; // 更新当前显示的删除图标

      // 监听全局点击事件来隐藏垃圾桶
      const hideDeleteButton = (event) => {
        // 检查点击位置是否在当前字段或垃圾桶上
        const clickedInsideField = this.selectedParams.some((param, idx) => {
          const fieldName = getFieldName(param, idx);

          const fieldElement = this.newBlock.getField(fieldName)?.getSvgRoot();
          return fieldElement && fieldElement.contains(event.target);
        });

        if (!inputFieldElement.contains(event.target) && !deleteButton.contains(event.target)) {
          // 如果点击不在当前字段或垃圾桶上，移除当前垃圾桶
          if (this.currentDeleteButton) {
            this.currentDeleteButton.remove();
            this.currentDeleteButton = null;
          }
          document.removeEventListener('click', hideDeleteButton);
        }

        // 如果点击的位置在其他字段内，显示对应的垃圾桶
        if (clickedInsideField) {
          this.selectedParams.forEach((param, idx) => {
            const fieldName = getFieldName(param, idx);
            const fieldElement = this.newBlock.getField(fieldName)?.getSvgRoot();
            if (fieldElement && fieldElement.contains(event.target)) {
              // 显示该字段对应的删除按钮
              this.showDeleteIcon(event, this.newBlock.getField(fieldName), idx);
            }
          });
        }
      };

      document.addEventListener('click', hideDeleteButton);
    },

    // 获取字段类型
    getParamType(param) {
      if (param === 'text') {
        return '文本';
      } else if (param === 'boolean') {
        return '布尔值';
      } else if (param === 'number_int') {
        return '整形';
      } else if (param === 'number_double') {
        return '浮点数';
      } else if (param === 'number_long') {
        return '长整形';
      } else if (param === 'array_int') {
        return '数字数组';
      } else if (param === 'array_string') {
        return '字符数组';
      } else if (param === 'array_double') {
        return '浮点数数组';
      }
    },

    // 删除指定索引的参数
    removeParam(index) {
      // 从 selectedParams 中删除参数
      this.selectedParams.splice(index, 1);
      // 更新块
      this.updateBlock();
    },

    // 处理下拉框变化
    handleChange(selectType) {
      let selectedValue = this.$refs[selectType].value;

      if (selectType === 'numberSelect' && selectedValue) {
        selectedValue = '--&&--' + selectedValue;
        this.selectedParams.push(selectedValue);
      } else if (selectType === 'arraySelect' && selectedValue) {
        selectedValue = '--&&--' + selectedValue;
        this.selectedParams.push(selectedValue);
      }

      // 更新块并重置下拉框
      this.updateBlock();
      this.$refs[selectType].selectedIndex = 0; // 重置下拉框为默认选项
    },

    // 添加参数
    addParm(item) {
      if (item) {
        item = '--&&--' + item;
        this.selectedParams.push(item);
        this.updateBlock();
      }
    },

    // 保存函数
    saveFunction() {
      if (this.selectedParams.length > 6) {
        this.$message({
          message: '参数超过最大限制5',
          type: 'warning'
        });
        return;
      }
      let funName = this.selectedParams[0];
      let boolean
      if (this.oddBlock) {
        if (funName != 'myFunction' && funName != this.oddBlock.getInput('funName').fieldRow[1].value_)
          boolean = this.advancedBlockStore.ifFunNameExist(funName, this.oddBlock.id);
      } else {
        boolean = this.advancedBlockStore.ifFunNameExist(funName);
      }

      if (boolean) {
        this.$message({
          message: '函数名已存在，请重新输入',
          type: 'warning'
        });
        return;
      }



      // 触发自定义事件，添加函数块
      EventBus.$emit('addMyFunction', this.selectedParams, this.block, this.oddBlock != null, this.oddBlock);

      // 使用 $nextTick 确保 DOM 更新完成后再销毁组件
      this.$nextTick(() => {
        this.closeEditor_function();
      });
    },

    //编辑函数
    edit_function(block) {
      this.oddBlock = block;
      console.log('编辑函数');
      let value;
      block.inputList.forEach((filed, index) => {
        if (index == 0) {
          value = filed.fieldRow[1].value_;
          this.selectedParams[0] = value;
        }
        if (index == 1) {
          filed.fieldRow.forEach((filed, index) => {
            if (index > 0) {
              value = filed.value_;
              let type = filed.name;
              let parts = type.split('--&--');
              let valueBeforePrefix = parts[0]; // 获取 "--" 前面的部分
              let parm = this.getParamType(valueBeforePrefix);
              value = (value == parm) ? '' : value;
              this.selectedParams.push(value + '--&&--' + parm);
            }
          })
        }
      });

      this.functionShowEditor();
    },

    //常数部分
    // 显示常量编辑对话框
    constantShowEditor(){
      
      this.isVisible_constant = true;
    },

    // 关闭常量编辑对话框
    closeEditor_constant(){
      this.isVisible_constant = false;
    },

    // 保存常量
    saveConstant(){
      var inputValue = document.getElementById('constantInput').value; // 获取输入框的值
      if(inputValue == ''){
        this.$message({
          message: '不能设置常量名字为空',
          type: 'warning'
        });
        return; // 如果输入框为空则返回
      } 
      this.advancedBlockStore.constantBlock.unshift(inputValue); // 将常量添加到常量数组
      document.getElementById('constantInput').value = ''; // 清空输入框
      this.closeEditor_constant(); // 关闭对话框
      EventBus.$emit('refreshConstant'); // 刷新常量

    }
  },

  created() {
    EventBus.$on('showFunctionEditor', this.functionShowEditor);
    EventBus.$on('edit_function', this.edit_function);
    EventBus.$on('showConstantEditor', this.constantShowEditor);
  },


};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

#blockly-container {
  border: 1px solid #ddd;
  margin-top: 20px;
}

button {
  margin: 0 5px;
  width: 80px;
  height: 30px;
  border-radius: 10%;
  border: 2px solid #8e959a;
  /* 设置外边框的宽度、样式和颜色 */
  background-color: white;
  color: black;
  font-size: 16px;
}

button:hover {
  background-color: rgb(25, 103, 210);
  color: white;
}

select {
  margin: 0 5px;

  width: 100px;
  height: 30px;

  border: 2px solid #8e959a;
  /* 边框 */
  border-radius: 5px;
  /* 圆角 */
  background-color: #fff;
  /* 背景色 */
  color: black;
  /* 文字颜色 */
  font-size: 16px;
  /* 字体大小 */
}

.param-container {
  display: inline-block;
  /* 横向排列 */
  position: relative;
  /* 使删除图标绝对定位 */
  margin: 5px;
}

.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
  /* 设置更深的黑色 */
}

.constantInput{
  padding: 10px;
  border-radius: 20px;
  width: 80%;
  height: 20px;
}
</style>