<template>
  <div class="loading-container" ref="container" style="width: 100%; height: 100%;" v-loading="loading" element-loading-text="代码编译中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
    <ContentView></ContentView>
    <div style="width: 100%; height: 60px">
      <TopNav :history_files="history_files" @save="saveWorkspace" @clear="clearScreen" @viewShowUpdate="codeShowChange" :code="code" :ledArr="ledArr" @change="receiveChange" @loading="receiveLoading" @blockCode="receiveBlock">
      </TopNav>
    </div>
    <div id="blockly">
      <!-- 工作区 -->
      <!-- <div class="code-wrap"> -->
      <div class="code-wrap">
        <div id="blocklyDiv" ref="blocklyDiv" style="height:calc(100vh - 60px);width:70%" v-show="selected==1"></div>
        <LogicBlock @logicBox="logicBox"></LogicBlock>
        <DominateBlock @dominateBox="dominateBox"></DominateBlock>
        <MathBlock @mathBox="mathBox"></MathBlock>
        <OperationBlock @methodBox="methodBox"></OperationBlock>
        <SpecialBlock @specialBox="specialBox"></SpecialBlock>
        <XfxCarBlock @xfxCarBlock="xfxCarBlock"></XfxCarBlock>
        <div id="code" ref="codeView" style="width: 70%;height:calc(100vh - 60px);" v-show="selected==2"></div>
        <div style="width: 30%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from "blockly/javascript";

//测试函数，输出工作区代码
import { test } from '../utils/test'
//引入其他组件
import TopNav from '../components/TopNav.vue'
import {formatDate} from '@/utils/formatDate'
import ContentView from '@/components/ContentView.vue';
import DominateBlock from '../components/Dominate/Dominate.vue';
import LogicBlock from '../components/Logic/Logic.vue';
import MathBlock from "../components/Math/Math.vue";
import OperationBlock from '../components/Operation/Operation.vue'
import SpecialBlock from '../components/Special/Special.vue'
import XfxCarBlock from '../components/xfxCar/XfxCar.vue'
//引入controls_if的插件包
import '@blockly/block-plus-minus';
import * as zh_hans from 'blockly/msg/zh-hans';
import { EventBus } from '../utils/eventBus';
import { createCodeBlock,find} from '@/api/codeblock';
import store from '@/store';
//设置语言
Blockly.setLocale(zh_hans);
// import {
//   ContinuousToolbox,
//   ContinuousFlyout,
//   ContinuousMetrics,
// } from '@blockly/continuous-toolbox';



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
      //特殊块
      entryBlockTypes : ['int_main', 'light_task', 'ultrasonic_task', 'motors_task','servo_task', 'fmq_task','function_definition'],
      toolbox: {
        contents: [
          {
            "kind": "category",
          },
        ],
      },
      workspace: null,
      codeViewIns: null,
      selected:1,
      loading:false,
      projectName:'',
      store:store,
      history_files:[]
    };
  },
  //引用的组件
  components: {
    DominateBlock,
    LogicBlock,
    MathBlock,
    OperationBlock,
    TopNav,
    ContentView,
    SpecialBlock,
    XfxCarBlock
  },
  created() {
    find({"userId":this.store.getters.phoneNumber}).then(res => {
      this.history_files = res.map(file => ({
        ...file,
        updatedAt: formatDate(file.updatedAt)
        })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); 
        }
    );
    EventBus.$on('addMyFunction', this.handleAddMyFunction);
  },
  mounted() {
    this.initBlocklyWorkspace();
  },
  watch:{
    selected(newVal){
      if (newVal===2) {
        
        this.$nextTick(() => {
          if (!this.codeViewIns) {
            monaco.editor.defineTheme('my-custom-theme', {
            base: 'vs', // 基础主题，可以是 'vs' | 'vs-dark' | 'hc-black'
            inherit: true, // 继承基础主题的设置
            rules: [],
            colors: {
                // 定义编辑器的颜色
              'editor.foreground': '#000000', // 文字颜色
              'editor.background': '#E9F1FC', // 背景颜色
                // 还可以定义其他颜色
            }
          });
          this.codeViewIns.setValue(this.code);
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
            readOnly: true, //是否只读  取值 true | false
            minimap: {
              enabled: true // 启用迷你地图
            }
        });
        } else {
            this.codeViewIns.setValue(this.code);
            // 如果编辑器已经初始化，则重新布局
            this.codeViewIns.layout();
          }
        });
      }
    }
  },
  methods: {
    //检测代码块有无重复添加
    hasCustomBlock(type) {
    const allBlocks = this.workspace.getAllBlocks();
    return allBlocks.some(block => block.type == type); // 指定你要检测的块类型
  },
    initBlocklyWorkspace() {
    // 如果已有工作区，销毁当前工作区
    if (this.workspace&& this.workspaceChangeListener) {
     
      this.workspace.removeChangeListener(this.workspaceChangeListener);
      this.workspaceChangeListener = null;  // 清空监听器
      this.workspace.dispose();  // 销毁当前工作区
      this.workspace = null;     // 清空引用
    }
    const customTheme = Blockly.Theme.defineTheme('customTheme', {
      base: Blockly.Themes.Classic, // 基础主题（也可以是其他主题，如 'Dark' 或自定义主题）
      categoryStyles: {
        // 定义自定义类别样式
        dominate_category: {
          colour: '#4e72b8', // 背景颜色（十六进制表示）
          colourSecondary: '#FF8C61', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
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
        operation_category: {
          colour: '#5B67A5', // 背景颜色（十六进制表示）
          colourSecondary: '#5B67A5', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
        special_category: {
          colour: '#5BA5A5', // 背景颜色（十六进制表示）
          colourSecondary: '#FF8C61', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
        xfxCar_category: {
          colour: '#E6CEAC', // 背景颜色（十六进制表示）
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
        controls: false,
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
      trashcan: false,
      theme: customTheme,
      //渲染方式
      renderer: 'Zelos',
      media: 'https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/blockly-media/' // 更新媒体文件路径
    });
    this.addInt_Main();

    // try {
    //   // 尝试从本地存储中读取数据
    //   const savedData = localStorage.getItem('workspaceData');
    //   if (savedData) {
    //     const state = JSON.parse(savedData);
    //     // 尝试加载数据到工作区
    //     Blockly.serialization.workspaces.load(state, this.workspace);
    //   }
    // } catch (error) {
    //   console.error('加载工作区数据时出错:', error);
    //   // // 如果出现错误，删除本地存储的无效数据
    //   // localStorage.removeItem('workspaceData');
    //   // 刷新页面
    //   location.reload();

    // }

    // 监听工作区变化事件
    this.workspace.addChangeListener(this.workspaceChangeListener);
    this.workspace.addChangeListener(() => {

      javascriptGenerator.init(this.workspace);
      let functionBlocks = [];
      this.workspace.getAllBlocks().forEach(block => {
        if (block.type === 'function_definition') {
          functionBlocks.push(block);
        }
      });
      let JSCode = '';
      // 先生成所有函数定义的代码
      if (functionBlocks.length > 0) {
        functionBlocks.forEach(block => {
          JSCode += javascriptGenerator.blockToCode(block);
        });
      }

      const remainingEntryBlocks = this.workspace.getAllBlocks().filter(block => this.entryBlockTypes.includes(block.type));
      // 再生成其他积木的代码
      remainingEntryBlocks.forEach(block => {
        JSCode += javascriptGenerator.blockToCode(block);
      });
      // javascriptGenerator.finish(this.workspace);
      this.code = JSCode;
      this.codeViewIns.setValue(this.code);
    });


    //console.log('test');
    // monaco.editor编译器自定义主题
    monaco.editor.defineTheme('my-custom-theme', {
      base: 'vs', // 基础主题，可以是 'vs' | 'vs-dark' | 'hc-black'
      inherit: true, // 继承基础主题的设置
      rules: [],
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
      readOnly: true, //是否只读  取值 true | false
      minimap: {
        enabled: true // 启用迷你地图
      }
    });

    // Toolbox添加
    this.addToolbox();
  },
    addInt_Main() {
      // 添加int_main块加到工作区
      const entryBlock = this.workspace.newBlock('int_main');
      entryBlock.initSvg();
      entryBlock.render();

      // 设置入口块的位置
      entryBlock.moveBy(50, 50);
    },
    workspaceChangeListener() {
     
      var allBlocks = this.workspace.getAllBlocks();
      allBlocks.forEach((block)=>{
        if(block.type==='XTask_light_task'){
        if (!this.hasCustomBlock('light_task')) {
        // 仅当工作区没有指定块时，才添加块，防止重复添加
          const customBlock = this.workspace.newBlock('light_task'); 
          customBlock.initSvg();
          customBlock.render();
          // 设置指定块的位置，例如添加在已有块的旁边
          customBlock.moveBy(250, 50);  // 可根据需要修改坐标
      } 
      }else if(block.type==='XTask_fmq_task'){
        if (!this.hasCustomBlock('fmq_task')) {
        // 仅当工作区没有指定块时，才添加块，防止重复添加
          const customBlock = this.workspace.newBlock('fmq_task');
          customBlock.initSvg();
          customBlock.render();
          // 设置指定块的位置，例如添加在已有块的旁边
          customBlock.moveBy(450, 50);  // 可根据需要修改坐标
      } 
      }else if(block.type==='XTask_servo_task'){
        if (!this.hasCustomBlock('servo_task')) {
        // 仅当工作区没有指定块时，才添加块，防止重复添加
          const customBlock = this.workspace.newBlock('servo_task');
          customBlock.initSvg();
          customBlock.render();
          // 设置指定块的位置，例如添加在已有块的旁边
          customBlock.moveBy(250, 250);  // 可根据需要修改坐标
      } 
      }else if(block.type==='XTask_motors_task'){
        if (!this.hasCustomBlock('motors_task')) {
        // 仅当工作区没有指定块时，才添加块，防止重复添加
          const customBlock = this.workspace.newBlock('motors_task');
          customBlock.initSvg();
          customBlock.render();
          // 设置指定块的位置，例如添加在已有块的旁边
          customBlock.moveBy(450, 250);  // 可根据需要修改坐标
      } 
      }else if(block.type==='XTask_ultrasonic_task'){
        if (!this.hasCustomBlock('ultrasonic_task')) {
        // 仅当工作区没有指定块时，才添加块，防止重复添加
          const customBlock = this.workspace.newBlock('ultrasonic_task');
          customBlock.initSvg();
          customBlock.render();
          // 设置指定块的位置，例如添加在已有块的旁边
          customBlock.moveBy(250, 450);  // 可根据需要修改坐标
      } 
      }
      })
      
      allBlocks = this.workspace.getAllBlocks();
      if (allBlocks.length === 0) {
        this.addInt_Main()
        return;
      }

      // 保证每种类型只有一个入口块
      this.entryBlockTypes.forEach(type => {
        const entryBlocks = allBlocks.filter(block => block.type === type);
        if (entryBlocks.length > 1) {
          for (let i = 1; i < entryBlocks.length; i++) {
            entryBlocks[i].dispose();
          }
        }
      });

      // 获取所有入口块
      const remainingEntryBlocks = allBlocks.filter(block => this.entryBlockTypes.includes(block.type));

      // 计算所有连接的块
      const allConnectedBlocks = [];
      remainingEntryBlocks.forEach(entryBlock => {
        allConnectedBlocks.push(...this.getAllConnectedBlocks(entryBlock));
      });

      // 代码区的块的禁用
      allBlocks.forEach(block => {
        if (!remainingEntryBlocks.includes(block) && !allConnectedBlocks.includes(block)) {
          block.setEnabled(false);
          if(block.type === 'create_function_button') {
            block.dispose();
            EventBus.$emit('showFunctionEditor');   
          }
        } else {
          block.setEnabled(true);
        }
      });
      
    },

    getAllConnectedBlocks(block, visited = new Set()) {
    const connectedBlocks = [];
    if (block.getChildren) {
        block.getChildren().forEach(childBlock => {
            if (!visited.has(childBlock)) {
                visited.add(childBlock);
                connectedBlocks.push(childBlock);
                connectedBlocks.push(...this.getAllConnectedBlocks(childBlock, visited));
            }
        });
    }
    return connectedBlocks;
},


    //添加合并工作箱
    addToolbox() {
      // 合并子组件的工具箱与主组件的工具箱
      const mergedToolbox = {
        kind: "categoryToolbox",
        contents: [
          // 主组件的工具箱内容
          // ...this.toolbox.contents,
          // 子组件的工具箱内容
          ...this.dominateToolbox.contents,
          ...this.specialToolbox.contents,
          ...this.logicToolbox.contents,
          ...this.mathToolbox.contents,
          ...this.methodToolbox.contents,
          ...this.xfxCarToolbox.contents
        ]
      };
      // 更新工作区的工具箱
      this.workspace.updateToolbox(mergedToolbox);

    },

    // 保存工作区
    saveWorkspace(projectName) {
      this.projectName=projectName;
      //读取工作区的块
      const state = Blockly.serialization.workspaces.save(this.workspace);
      this.createProject(this.store.getters.phoneNumber,JSON.stringify(state),this.projectName);
      
      // // 将数据存储到本地浏览器中
      // localStorage.setItem('workspaceData', JSON.stringify(state));
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
    specialBox(specialBox) {
      this.specialToolbox = specialBox
    },
    dominateBox(dominateBox) {
      this.dominateToolbox = dominateBox
    },
    logicBox(logicBox) {
      this.logicToolbox = logicBox
    },
    mathBox(mathBox) {
      this.mathToolbox = mathBox
    },
    methodBox(methodBox) {
      this.methodToolbox = methodBox
    },
    xfxCarBlock(xfxCarBlock) {
      this.xfxCarToolbox = xfxCarBlock
    },
    receiveChange(change) {
      this.selected = change;
    },
    receiveLoading(loading){
      this.loading=loading;
    },
    createProject(userId,text,projectName){
      const data={"userId":userId,"text":text,"projectName":projectName}
      createCodeBlock(data).then(() => {
        find({"userId":this.store.getters.phoneNumber}).then(res => {
            this.history_files = res.map(file => ({
                ...file,
                updatedAt: formatDate(file.updatedAt)
            })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); 
        }
      );
        }
      );
    },
    receiveBlock(block){
      const savedData = block;
      if (savedData) {
        const state = JSON.parse(savedData);
        // 尝试加载数据到工作区
        Blockly.serialization.workspaces.load(state, this.workspace);
      }
    }
  }
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

.loading-container .el-loading-spinner{
  font-size: 40px;
}
/* 左侧toolbox */
.blocklyToolboxDiv {
  /* padding-top: 170px; */
  padding-top: 7%;
  background-color: rgb(218, 227, 234);

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
  border-left: none !important;
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

</style>
