<template>
  <div>
    <!-- 函数编辑对话框 -->
    <el-dialog title="创建函数" :visible.sync="isVisible" @close="closeEditor" width="50%">
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
        <button @click="closeEditor">取消</button>
        <button type="primary" @click="saveFunction">保存</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EventBus } from '../utils/eventBus';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import './Operation/operation'
import {
  ScrollOptions,
  ScrollBlockDragger,
  ScrollMetricsManager,
} from '@blockly/plugin-scroll-options';


export default {
  name: 'ContentView',
  data() {
    return {
      isVisible: false,//编辑对话框是否可见
      workspace: null,
      selectedParams: [], // 存储选中的参数类型
      currentDeleteButton: null,//当前删除按钮的存储
      newBlock: null,//新块的存储
      newBlockPosition: { x: 50, y: 50 },//新块的位置
    };
  },
  methods: {
    // 显示函数编辑对话框
    showEditor() {
      this.isVisible = true;
      this.$nextTick(() => {
        this.initializeBlockly();
      });
    },

    // 关闭函数编辑对话框
    closeEditor() {
      this.isVisible = false;
      if (this.workspace) {
        this.workspace.dispose(); // 清理 Blockly 工作区
      }
    },

    // 初始化 Blockly
    initializeBlockly() {
      const blockly_container = document.getElementById('blockly-container');
      this.workspace = Blockly.inject(blockly_container, {
        renderer: 'zelos', // 设置渲染器为 Zelos
        theme: Blockly.Themes.Classic, // 使用 Classic 主题
        plugins: {
          // These are both required.
          // Note that the ScrollBlockDragger drags things besides blocks.
          // Block is included in the name for backwards compatibility.
          blockDragger: ScrollBlockDragger,
          metricsManager: ScrollMetricsManager,
        },
        move: {
          wheel: true, // Required for wheel scroll to work.
        },
      });

      const plugin = new ScrollOptions(this.workspace);
      console.log(plugin);
      plugin.init();

      this.updateBlock();
    },

    // 更新块
    updateBlock() {
      if (!this.workspace) return;

      this.workspace.clear(); // 清除之前的所有块

      // 创建新的块并添加到工作区
      this.newBlock = this.workspace.newBlock('function_definition');
      this.newBlock.initSvg();
      this.newBlock.render();

      // 设置块的位置
      const x = this.newBlockPosition.x; // x坐标，可以根据需要设置
      const y = this.newBlockPosition.y; // y坐标，可以根据需要设置
      this.newBlock.moveBy(x, y);

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

      // 创建一个横向排列的容器
      const horizontalInput = this.newBlock.appendDummyInput('PARAMS_CONTAINER').appendField('参数');

      if (this.selectedParams.length !== 0) {
        // 根据 selectedParams 更新块的输入
        this.selectedParams.forEach((param, index) => {
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
            inputName = 'text_' + index;
          } else if (valueAfterPrefix === '布尔值') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'boolean_' + index;
          } else if (valueAfterPrefix === '整形') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'number_int_' + index;
          } else if (valueAfterPrefix === '浮点数') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'number_double_' + index;
          } else if (valueAfterPrefix === '长整形') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'number_long_' + index;
          } else if (valueAfterPrefix === '数字数组') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'array_int_' + index;
          } else if (valueAfterPrefix === '字符数组') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'array_string_' + index;
          } else if (valueAfterPrefix === '浮点数数组') {
            inputField = new Blockly.FieldTextInput(`${name}`);
            inputName = 'array_double_' + index;
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

        });
      }

      // 添加其他的块内容（如执行部分）
      this.newBlock.appendStatementInput('inner').appendField('执行');
      // 添加鼠标离开事件监听器
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
          const fieldName = this.getFieldName(param, idx);

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
            const fieldName = this.getFieldName(param, idx);
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

    // 获取字段名称
    getFieldName(param, index) {
      let parts = param.split('--&&--');   // 使用 "--" 分隔字符串
      let valueAfterPrefix = parts[1]; // 获取 "--" 后面的部分

      if (valueAfterPrefix === '文本') {
        return 'text_' + index;
      } else if (valueAfterPrefix === '布尔值') {
        return 'boolean_' + index;
      } else if (valueAfterPrefix === '整形') {
        return 'number_int_' + index;
      } else if (valueAfterPrefix === '浮点数') {
        return 'number_double_' + index;
      } else if (valueAfterPrefix === '长整形') {
        return 'number_long_' + index;
      } else if (valueAfterPrefix === '数字数组') {
        return 'array_int_' + index;
      } else if (valueAfterPrefix === '字符数组') {
        return 'array_string_' + index;
      } else if (valueAfterPrefix === '浮点数数组') {
        return 'array_double_' + index;
      }
      return '';
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

    saveFunction() {
      console.log('保存函数');
      console.log(this.selectedParams);

    },
  },

  created() {
    EventBus.$on('showFunctionEditor', this.showEditor);
  }
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
</style>