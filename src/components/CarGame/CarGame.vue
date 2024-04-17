<template>
  <div id="blockly">
    <!-- 工作区 -->
    <div id="blocklyDiv" ref="blocklyDiv" style="height: 100vh; width: 50%"></div>
    <div style="
        background-color: lightgrey;
        width: 50%;
        height: 100vh;
        text-align: center;
      ">
      <select v-model="selected" @click="updataCode">
        <option value="Javascript">Javascript</option>
        <option value="python">python</option>
      </select>
      <pre v-html="code ? code : '代码'"></pre>
    </div>
  </div>
</template>

<script>
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { javascriptGenerator } from "blockly/javascript";
import '../Test/demo'
// import * as monaco from "monaco-editor";
import "./carGame";
export default {
  name: "CarGame",
  data() {
    return {
      code: "",
      selected: 'python',
      horizontalLayout: true, //工具箱水平
      toolboxPosition: "end", //工具箱在底部
      toolbox: {
        kind: "flyoutToolbox",
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "turn",
          },
          {
            kind: "block",
            type: "string_length",
          },
        ],
      },
      functionbox: {
        kind: "flyoutToolbox",
        contents: [],
      },
      workspace: null,
      codeViewIns: null,
    };
  },
  mounted() {
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, {
      toolbox: this.toolbox,
    });
    this.workspace.addChangeListener(() => {
      this.updataCode();
    });
  },

  methods: {
    updataCode() {
      if (this.selected === 'python') {
        const pythonCode = pythonGenerator.workspaceToCode(this.workspace);
        this.code = pythonCode;
      }else{
        const JSCode = javascriptGenerator.workspaceToCode(this.workspace);
        this.code = JSCode;
      }

    },
    turn(direction, angle) {
      console.log(`向${direction}转了${angle}度`);
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

#blockly {
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
