<template>
  <div ref="container" style="width: 100%; height: 100%;">
    <div style="width: 100%; height: 60px">
      <TopNav @save="saveWorkspace" 
      @clear="clearScreen" 
      @viewShowUpdate="codeShowChange" 
      :code="code" 
      :ledArr="ledArr">
      </TopNav>
    </div>
    <div id="blockly">
      <!-- 工作区 -->
      <!-- <div class="code-wrap"> -->
      <div class="code-wrap">
        <div id="blocklyDiv" ref="blocklyDiv" style="height:calc(100vh - 60px);width:70%"></div>
        <LogicBlock @logicBox="logicBox"></LogicBlock>
        <MathBlock @mathBox="mathBox"></MathBlock>
        <MethodBlock @methodBox="methodBox"></MethodBlock>

        <div id="code" ref="codeView" :style="{ display: codeShow == 'code' ? 'block' : 'none' }"></div>
      </div>
    </div>
  </div>

</template>

<script>
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import{test} from '../utils/test'
import TopNav from '../components/TopNav.vue'
import LogicBlock from '../components/Logic/Logic.vue';
import MathBlock from "../components/Math/Math.vue";
import MethodBlock from '../components/Method/Method.vue'
import '../components/Special/special'


import * as monaco from 'monaco-editor';


export default {
  name: "CarGame",
  data() {
    return {
      ledArr: [],
      codeShow: 'code',
      methodToolbox: null,
      logicToolbox: null,
      mathToolbox: null,
      code: '',
      horizontalLayout: true, //工具箱水平
      toolboxPosition: "end", //工具箱在底部
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "特殊",
            "categoryStyle": "special_category",
            "cssConfig": {
              "container": "special",
              "icon": "specialIcon",
            },
            "contents": [
              {
                kind: "block",

                type: "string"
              },
              {
                kind: "block",

                type: "number_variable"
              },
              {
                kind: "block",
                type: "bracket"
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
      zoom:
      {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      //  trashcan: true,
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

    this.addInt_Main();


    // 监听工作区变化事件
    this.workspace.addChangeListener(this.workspaceChangeListener);
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
      automaticLayout: false, // 自动布局
      codeLens: true, // 代码镜头
      scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
      colorDecorators: true, // 颜色装饰器
      accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
      lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
      lineNumbersMinChars: 1, // 行号最小字符   number
      enableSplitViewResizing: false,
      readOnly: false, //是否只读  取值 true | false
      minimap: {
        enabled: true // 启用迷你地图
      }
    });

    // Toolbox添加
    this.addToolbox();

  },
  methods: {
    addInt_Main() {
      // 添加int_main块加到工作区
      const entryBlock = this.workspace.newBlock('int_main');
      entryBlock.initSvg();
      entryBlock.render();

      // 设置入口块的位置
      entryBlock.moveBy(50, 50);
    },
    workspaceChangeListener() {
      const allBlocks = this.workspace.getAllBlocks();
      if (allBlocks.length === 0) {
        this.addInt_Main();
      }
      if (allBlocks.length !== 0) {
        const entryBlocks = allBlocks.filter(block => block.type === 'int_main');

        // 保证只有一个入口块
        if (entryBlocks.length > 1) {
          for (let i = 1; i < entryBlocks.length; i++) {
            entryBlocks[i].dispose();
          }
        }

        const entryBlock = entryBlocks[0];
        const connectedBlocks = this.getAllConnectedBlocks(entryBlock);

        //代码区的块的禁用
        allBlocks.forEach(block => {
          if (block.type !== 'int_main' && !connectedBlocks.includes(block)) {
            block.setEnabled(false);
          } else {
            block.setEnabled(true);
          }
        });
      }

    },
     getAllConnectedBlocks(block) {
      const connectedBlocks = [];
      let currentBlock = block.getNextBlock();

      while (currentBlock) {
        connectedBlocks.push(currentBlock);
        connectedBlocks.push(...this.getAllConnectedBlocks(currentBlock));
        currentBlock = currentBlock.getNextBlock();
      }

      block.getChildren().forEach(childBlock => {
        connectedBlocks.push(childBlock);
        connectedBlocks.push(...this.getAllConnectedBlocks(childBlock));
      });

      return connectedBlocks;
    },

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
    clearScreen() {
      this.workspace.clear();
    },

    // 代码展示数据的改变
    codeShowChange(viewShow) {
      this.codeShow = viewShow
      if (viewShow == 'run') {
        this.arrAdd()
      }

    },

    //收集亮灭的数组添加
    arrAdd() {
      const result = test(this.workspace)

      //每一次调用将ledArr数组清空
      this.ledArr = [];

      alert(result)
      eval(result)

     
    },

    // 接收子组件传递的工具箱并存储
    logicBox(logicBox) {
      this.logicToolbox = logicBox
    },
    mathBox(mathBox) {
      this.mathToolbox = mathBox
    },
    methodBox(methodBox) {
      this.methodToolbox = methodBox
    },
  },

};
</script>

<style>
html {
  touch-action: manipulation;
  /* 禁止双击放大 */
  -ms-text-size-adjust: 100%;
  /* IE10 以下禁止用户调整文本大小 */
  -moz-text-size-adjust: 100%;
  /* 火狐浏览器禁止用户调整文本大小 */
  -webkit-text-size-adjust: 100%;
  /* Safari 和 Chrome 禁止用户调整文本大小 */
  zoom: 1;
  /* 禁止用户缩放 */
}


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
  /* padding-top: 170px; */
  padding-top: 15%;
  background-color: rgb(218, 227, 234);
  background-image: url('../assets//SVG/积木.svg');
  background-size: 180px auto;
  background-repeat: no-repeat;
  background-position: 10px 600px;
}



/* Toolbox下属分支设置 */
.blocklyTreeRow {
  width: 9vw;
  height: 4.5vh;
  /* height: 40px; */
  border-radius: 13px;
  margin-bottom: 45px;
  padding: 5px;
}


/* 代码编辑器的背景控制 */
.monaco-editor .view-lines {
  text-align: left !important;
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

.special {
  color: #5BA5A5;
  font-size: 60px;

}

.specialIcon {
  content: url(../assets/SVG/加号.svg);
  height: 32px;
}
</style>
