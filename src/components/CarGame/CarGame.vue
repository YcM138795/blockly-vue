<template>
  <div id="blockly">
    <!-- 工作区 -->
    <div id="blocklyDiv" ref="blocklyDiv" style="height: 100vh; width: 70%"></div>
    <div style="
        background-color: lightgrey;
        width: 30%;
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
import './createSvg'

// import * as monaco from "monaco-editor";
import "./carGame";
export default {
  name: "CarGame",
  data() {
    return {
      code: "",
      selected: 'Javascript',
      horizontalLayout: true, //工具箱水平
      toolboxPosition: "end", //工具箱在底部
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            "kind": "category",
            "name": "内置",
            "categorystyle": "logic_category",
            "contents": [
              // {
              //   "kind": "block",
              //   "type": "kitronik_neopixel_set_color"
              // },
              {
                "kind": "block",
                "type": "logic_operation"
              },
              {
                "kind": "block",
                "type": "controls_if"
              },
              {
                "kind": "block",
                "type": "controls_ifelse"
              },
              {
                "kind": "block",
                "type": "controls_repeat_ext"
              },
              {
                "kind": "block",
                "type": "logic_compare"
              },
              {
                "kind": "block",
                "type": "math_number"
              },
              {
                "kind": "block",
                "type": "math_arithmetic"
              },
              {
                "kind": "block",
                "type": "text"
              },
              {
                "kind": "block",
                "type": "text_print"
              },
            ]
          },
          {
            "kind": "category",
            "name": "基础",
            "contents": [
              {
                kind: "block",

                type: "fill"
              },
              {
                kind: "block",
                'icons': {
                  'my_icon': 'my_icon',  // 图标状态配置
                },
                type: "bracket"
              },
            ]
          },
          {
            "kind": "category",
            "name": "数学",
            "cssConfig": {
              "container": "math"
            },
            "contents": [
              {
                kind: "block",
                type: "number_single",
              },
              {
                kind: "block",
                type: "logic_boolean",
              },
              {
                kind: "block",
                type: "number_double",
              },
              {
                kind: "block",
                type: "single_operation",
              },
              {
                kind: "block",
                type: "operation",
              },
              {
                kind: "block",
                type: "remainder",
              },
              {
                kind: "block",
                type: "compare",
              },
              {
                kind: "block",
                type: "big_small",
              },
              {
                kind: "block",
                type: "math_fun",
              },
              {
                kind: "block",
                type: "random",
              },
            ]
          },
          {
            "kind": "category",
            "name": "功能性",
            "contents": [
              {
                kind: "block",
                type: "direction",
              },
              {
                kind: "block",
                type: "string_length",
              },
            ]
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
      renderer: 'Zelos'
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
      } else {
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

.math {
  background-color: rgb(143, 203, 227);
  /* height: 100px; */
}

.blocklyToolboxCategory {
  width: 200px;
  height: auto;
  background-color: antiquewhite;
}

.blocklyTreeRow {
  height: 50px;
}

/* .blocklyTreeIcon{
  background-color: black;
} */
</style>
