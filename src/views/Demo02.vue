<template>
  <div class="home">
    <div class="code-wrap">
      <div id="blocklyDiv" style="height: 100vh; width: 50%;"></div>
      <div id="code" ref="codeView"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import * as monaco from 'monaco-editor';
export default {
  name: 'Demo_02',
  data() {
    return {
      toolbox: {
        "kind": "flyoutToolbox",
        "contents": [
          {
            kind: 'block',
            type: 'string_length'
          },
        ]
      },
      blocksJsonArray: [
        {
          "type": "string_length",
          "message0": 'length of %1',
          "args0": [
            {
              "type": "input_value",
              "name": "VALUE",
              "check": "String"
            }
          ],
          "output": "Number",
          "colour": 160,
          "tooltip": "Returns number of letters in the provided text.",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        }
      ],
      workspace: null,
      codeViewIns: null,
      codeValue: ''
    }
  },
  methods: {
    // 初始化 Blockly
    initBlockly() {
      // 块定义
      Blockly.defineBlocksWithJsonArray(this.blocksJsonArray);
      // 添加生成器函数
      this.blockGenerator();
      // 注入到 blockly-div 中
      this.workspace = Blockly.inject('blockly-div', {
        toolbox: this.toolbox
      });
      // 为工作区添加修改事件，触发调用 updateCode 函数
      this.workspace.addChangeListener(this.updateCode);
    },
    // 更新当前块对应的 JS 代码
    updateCode() {
      // 获取当前块对应的 JS 代码
      this.code = Blockly.JavaScript.workspaceToCode(this.workspace);
    },
    // 添加生成器函数，即每个自定义块要生成什么代码
    blockGenerator() {
      Blockly.JavaScript['string_length'] = function() {
        return `this.character('luffy');<br>`;
    }}},
  mounted() {
    this.workspace = Blockly.inject('blocklyDiv', { toolbox: this.toolbox });
    this.workspace.addChangeListener(() => {
      const pythonCode = pythonGenerator.workspaceToCode(this.workspace);
      console.log(pythonCode)
      this.codeValue = pythonCode;
      this.codeViewIns.setValue(this.codeValue);
      this.initBlockly();
    });

    this.codeViewIns = monaco.editor.create(this.$refs.codeView, {
      theme: "vs-light", // 主题
      value: "", // 默认显示的值
      language: "python",
      folding: true, // 是否折叠
      foldingHighlight: true, // 折叠等高线
      foldingStrategy: "indentation", // 折叠方式  auto | indentation
      showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
      disableLayerHinting: true, // 等宽优化
      emptySelectionClipboard: false, // 空选择剪切板
      selectionClipboard: false, // 选择剪切板
      automaticLayout: true, // 自动布局
      codeLens: false, // 代码镜头
      scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
      colorDecorators: true, // 颜色装饰器
      accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
      lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
      lineNumbersMinChars: 5, // 行号最小字符   number
      enableSplitViewResizing: false,
      readOnly: false, //是否只读  取值 true | false
    });
  },
  updateCode() {


  }
}
</script>

<style lang="less" scoped>
.code-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;

  #code {
    flex: 1;
  }
}
</style>
