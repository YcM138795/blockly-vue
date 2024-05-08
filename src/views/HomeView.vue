<template>
  <div id="blockly">
    <!-- 工作区 -->
    <!-- <div class="code-wrap"> -->
    <div class="code-wrap">
       <div id="blocklyDiv" ref="blocklyDiv" style="height: 100vh; width: 70%"></div>
    <SpecialBlock @specialBox="specialBox"></SpecialBlock>
    <LogicBlock @logicBox="logicBox"></LogicBlock>
    <MathBlock @mathBox="mathBox"></MathBlock>
    <MethodBlock @methodBox="methodBox"></MethodBlock>
    <div id="code" ref="codeView" style="background-color: aqua;"></div>
    
    </div>

     
    
    <!-- <div style="
        background-color: lightgrey;
        width: 10%;
        height: 100vh;
        text-align: center;
      ">
      <span>C</span>
      <pre v-html="code ? code : '代码'"></pre>
    </div> -->
  </div>
</template>

<script>
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import LogicBlock from '../components/Logic/Logic.vue';
import MathBlock from "../components/Math/Math.vue";
import SpecialBlock from '../components/Special/Special.vue'
import MethodBlock from '../components/Method/Method.vue'

import * as monaco from 'monaco-editor';



export default {
  name: "CarGame",
  data() {
    return {
      specialToolbox: null,
      methodToolbox: null,
      logicToolbox: null,
      mathToolbox: null,
      code: '',
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
  components: {
    LogicBlock,
    MathBlock,
    SpecialBlock,
    MethodBlock,
  },
  mounted() {
    //加载工作区
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, {
      toolbox: this.toolbox,
      //渲染方式
      renderer: 'Zelos'
    });
    this.workspace.addChangeListener(() => {
      const JSCode = javascriptGenerator.workspaceToCode(this.workspace);
      this.code = JSCode;

      this.codeViewIns.setValue(this.code);
    });
    monaco.editor.defineTheme('my-custom-theme', {
    base: 'vs', // 基础主题，可以是 'vs' | 'vs-dark' | 'hc-black'
    inherit: true, // 继承基础主题的设置
    rules: [
    ],
    colors: {
        // 定义编辑器的颜色
        'editor.foreground': '#000000', // 文字颜色
        'editor.background': '#f2f3f4', // 背景颜色
        // 还可以定义其他颜色
    }
});

    this.codeViewIns = monaco.editor.create(this.$refs.codeView, {
        theme: "my-custom-theme", // 主题
        value: "c", // 默认显示的值
        language: "c",
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
  
    this.addToolbox();
  },

  methods: {

    addToolbox() {
        // 合并子组件的工具箱与主组件的工具箱
        const mergedToolbox = {
          kind: "categoryToolbox",
          contents: [
            // 主组件的工具箱内容
            ...this.toolbox.contents,
             // 子组件的工具箱内容
            ...this.logicToolbox.contents ,
            ...this.mathToolbox.contents ,
            ...this.specialToolbox.contents ,
            ...this.methodToolbox.contents ,
          ]
        };
        // 更新工作区的工具箱
        this.workspace.updateToolbox(mergedToolbox);
      
    },
    turn(direction, angle) {
      console.log(`向${direction}转了${angle}度`);
    },
    // 接收子组件传递的工具箱并合并
    logicBox(logicBox) {
      this.logicToolbox = logicBox
    },
    mathBox(mathBox) {
      this.mathToolbox = mathBox
    },
    specialBox(specialBox) {
      this.specialToolbox = specialBox
    },
    methodBox(methodBox) {
      this.methodToolbox = methodBox
    }
  }
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
/* .code-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;
  
} */
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
.code-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;
 
} 
#code {
    flex: 1;
  }


 
</style>
