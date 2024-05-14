<template>
  <div>
    <div style="width: 100%; height: 60px">
      <TopNav 
      @save="saveWorkspace" 
      @clear="clearScreen"
       @tipShowUpdate="codeShowChange" 
       ></TopNav>
    </div>
    <div id="blockly">
      <!-- 工作区 -->
      <!-- <div class="code-wrap"> -->
      <div class="code-wrap">
        <div id="blocklyDiv" ref="blocklyDiv" style=" height: calc(100vh - 60px); width: 70%"></div>
        <SpecialBlock @specialBox="specialBox"></SpecialBlock>
        <LogicBlock @logicBox="logicBox"></LogicBlock>
        <MathBlock @mathBox="mathBox"></MathBlock>
        <MethodBlock @methodBox="methodBox"></MethodBlock>
        <div id="code" ref="codeView" :style="{display: codeShow? 'block' : 'none'}"></div>

      </div>
    </div>
  </div>

</template>

<script>
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import TopNav from '../components/TopNav.vue'
import LogicBlock from '../components/Logic/Logic.vue';
import MathBlock from "../components/Math/Math.vue";
import SpecialBlock from '../components/Special/Special.vue'
import MethodBlock from '../components/Method/Method.vue'

import * as monaco from 'monaco-editor';



export default {
  name: "CarGame",
  data() {
    return {
      codeShow:true,
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
        ],
      },
      workspace: null,
      codeViewIns: null,
    };
  },
  //引用的组件
  components: {
    LogicBlock,
    MathBlock,
    SpecialBlock,
    MethodBlock,
    TopNav
  },
  mounted() {

    // 自定义主题
    const customTheme = Blockly.Theme.defineTheme('customTheme', {
      base: Blockly.Themes.Classic, // 基础主题（也可以是其他主题，如 'Dark' 或自定义主题）
      categoryStyles: {
        // 定义自定义类别样式
        logic_category: {
          colour: '#5B80A5', // 背景颜色（十六进制表示）
          colourSecondary: '#FF8C61', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
        math_category: {
          colour: '#5BA580', // 背景颜色（十六进制表示）
          colourSecondary: '#FF8C61', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
        method_category: {
          colour: '#5B67A5', // 背景颜色（十六进制表示）
          colourSecondary: '#5B67A5', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
        special_category: {
          colour: '#5BA5A5', // 背景颜色（十六进制表示）
          colourSecondary: '#FF8C61', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
      },
      'componentStyles': {
        // 工作区背景颜色设置
        'workspaceBackgroundColour': 'rgb(236,240,241)'
      }
    });

    //加载工作区
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, {
      toolbox: this.toolbox,
      grid:
      {
        spacing: 40,
        length: 5,
        colour: '#e1e1e1',
        snap: true
      },
      trashcan: true,
      theme: customTheme,
      //渲染方式
      renderer: 'Zelos',
    });
    this.workspace.addChangeListener(() => {
      const JSCode = javascriptGenerator.workspaceToCode(this.workspace);
      this.code = JSCode;
      this.codeViewIns.setValue(this.code);
    });

     // 从本地浏览器中读取数据
     const savedData = localStorage.getItem('workspaceData');
      if (savedData) {
        const state = JSON.parse(savedData);
        //读取数据
        Blockly.serialization.workspaces.load(state, this.workspace);
      }

    // monaco.editor编译器自定义主题
    monaco.editor.defineTheme('my-custom-theme', {
      base: 'vs', // 基础主题，可以是 'vs' | 'vs-dark' | 'hc-black'
      inherit: true, // 继承基础主题的设置
      rules: [
      ],
      colors: {
        // 定义编辑器的颜色
        'editor.foreground': '#000000', // 文字颜色
        'editor.background': '#E9F1FC', // 背景颜色
        // 还可以定义其他颜色
      }
    });

    // monaco.editor编译器
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

    // Toolbox添加
    this.addToolbox();
  },

  methods: {
    //添加合并工作箱
    addToolbox() {
      // 合并子组件的工具箱与主组件的工具箱
      const mergedToolbox = {
        kind: "categoryToolbox",
        contents: [
          // 主组件的工具箱内容
          ...this.toolbox.contents,
          // 子组件的工具箱内容
          ...this.logicToolbox.contents,
          ...this.mathToolbox.contents,
          ...this.specialToolbox.contents,
          ...this.methodToolbox.contents,
        ]
      };
      // 更新工作区的工具箱
      this.workspace.updateToolbox(mergedToolbox);

    },

    // 保存工作区
    saveWorkspace() {
      //读取工作区的块
      const state = Blockly.serialization.workspaces.save(this.workspace);
      // 将数据存储到本地浏览器中
      localStorage.setItem('workspaceData', JSON.stringify(state));
      console.log(state);
    },

    //清空所有块
    clearScreen(){
      this.workspace.clear();
    },

    // 代码展示数据的改变
    codeShowChange(tipShow){
      this.codeShow = !tipShow
    },

    // 接收子组件传递的工具箱并存储
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
    },
    
  }
};
</script>

<style>
body {
  margin: 0;
}


#blockly {
  background-color: rgb(230, 236, 243);
  border-radius: 30px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
}


/* 左侧toolbox */
.blocklyToolboxDiv {
  background-color: rgb(218, 227, 234);
  background-image: url('../assets//SVG/积木.svg');
  background-size: 180px auto;
  background-repeat: no-repeat;
  background-position: 10px 600px;
}


/* 内置区Toolbox */
.blocklyToolboxCategory {
  padding-top: 100px;
  width: 170px;
  height: auto;
}


/* Toolbox下属分支设置 */
.blocklyTreeRow {
  height: 40px;
  border-radius: 13px;
  margin-bottom: 45px;
  padding: 5px;
}


/* 代码编辑器的背景控制 */
.monaco-editor .view-lines {
  /* background-color:#00bfff; */
  background-color: rgb(233, 241, 252);
  /* background-image: url('../assets//SVG/积木logo (1).svg'); */
  background-size: 180px auto;
  /* 调整图片大小以覆盖内容区域 */
  background-repeat: no-repeat;
  /* 不重复 */
  background-position: center;
  /* 居中显示图片 */
}


/* 代码区 */
.code-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;

}
#code {
  border: 10px solid #E9F1FC;
  border-radius: 30px;
  flex: 1;
}

</style>
