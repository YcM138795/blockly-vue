<template>
  <div class="loading-container" ref="container" style="width: 100%; height: 100%;" v-loading="loading" element-loading-text="代码编译中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
    <ContentView></ContentView>
    <div style="width: 100%; height: 60px">
      <TopNav @save="saveWorkspace" @clear="clearScreen" @viewShowUpdate="codeShowChange" :code="code" @change="receiveChange" @loading="receiveLoading">
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
        <OperationBlock @operationBox="operationBox"></OperationBlock>
        <SpecialBlock @specialBox="specialBox"></SpecialBlock>
        <XfxCarBlock @xfxCarBlock="xfxCarBlock"></XfxCarBlock>
        <div id="code" ref="codeView" style="width: 70%;height:calc(100vh - 60px);" v-show="selected==2"></div>
        <div style="width: 30%;"></div>
        <AdvancedBlock @advancedBlock="advancedBlock"></AdvancedBlock>

      </div>
    </div>
  </div>
</template>

<script>
//引入blockly
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from "blockly/javascript";

import { registerFunctionBlockContextMenuOptions } from '../utils/blocklyContextMenu'//引入右键菜单
import { generateCallFunctionCode } from '../utils/functionBlockGenerate';//引入生成函数的代码

//引入其他组件
import TopNav from '../components/TopNav.vue'
import ContentView from '@/components/ContentView.vue';
import DominateBlock from '../components/Dominate/Dominate.vue';
import LogicBlock from '../components/Logic/Logic.vue';
import MathBlock from "../components/Math/Math.vue";
import OperationBlock from '../components/Operation/Operation.vue'
import SpecialBlock from '../components/Special/Special.vue'
import XfxCarBlock from '../components/xfxCar/XfxCar.vue'
import AdvancedBlock from '@/components/Advanced/Advanced.vue';

import '@blockly/block-plus-minus';//引入controls_if的插件包
import * as zh_hans from 'blockly/msg/zh-hans';
import { EventBus } from '../utils/eventBus';
import {createEntry} from "@/api/workbench";
import store from '@/store';
//设置语言
Blockly.setLocale(zh_hans);

import { useFunctionBlockStore } from '@/store/functionBlockStore';//引入自定义函数的store
import { getFieldName } from '../utils/functionBlockUtils';//引入生成函数的代码
import * as monaco from 'monaco-editor';//引入monaco-editor编辑器


export default {
  name: "CarGame",
  provide() {
    return {
      workspace: this.workspace, // 提供 workspace 给所有子组件
    };
  },
  data() {
    return {
      codeShow: 'code',
      //工具箱
      operationToolbox: null,
      logicToolbox: null,
      dominateToolbox: null,
      specialToolbox: null,
      xfxCarToolbox: null,
      advancedToolbox: null,
      //合并后的工具箱
      mergedToolbox: null,
      code: '',//代码
      horizontalLayout: true, //工具箱水平
      toolboxPosition: "end", //工具箱在底部
      functionBlockStore: useFunctionBlockStore(),//自定义函数的store
      //特殊块
      entryBlockTypes: ['int_main', 'light_task', 'ultrasonic_task', 'motors_task', 'servo_task', 'fmq_task', 'function_definition'],
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
      projectName:'xx',
      store:store,
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
    XfxCarBlock,
    AdvancedBlock
  },
  created() {
    EventBus.$on('addMyFunction', this.handleAddMyFunction);
    EventBus.$on('saveEditBlock', this.saveEditBlock);
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
        advanced_category: {
          colour: '	#778899', // 背景颜色（十六进制表示）
          colourSecondary: '#FF8C61', // 二次背景颜色
          colourTertiary: '#C73F1E', // 三次背景颜色
        },
        function_category: {
          colour: '#a5d599', // 背景颜色（十六进制表示）
          colourSecondary: '#a5d599', // 二次背景颜色
          colourTertiary: '#a5d599', // 三次背景颜色
        },
      },
      'componentStyles': {
        // 工作区背景颜色设置
        'workspaceBackgroundColour': 'rgb(236,240,241)'
      }
    });

    //注册创建函数的右键菜单
    registerFunctionBlockContextMenuOptions()

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

    //注册创建函数的button按钮
    this.workspace.registerButtonCallback('createFunctionCallback', () => {
      EventBus.$emit('showFunctionEditor');
      // 关闭选中工具箱中的函数类别
      Blockly.getMainWorkspace().toolbox_.setSelectedItem(null);
    });

    // 添加int_main块
    this.addInt_Main();


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
        if (block.type !== 'function_definition') {
          JSCode += javascriptGenerator.blockToCode(block);
        }
      });
      // javascriptGenerator.finish(this.workspace);
      this.code = JSCode;
      this.codeViewIns.setValue(this.code);
    });



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


    //注册函数类别的工作箱回调
    this.workspace.registerToolboxCategoryCallback('DYNAMIC_FUNCTION_CATEGORY', () => {
      console.log('函数类别的工具箱回调');

      // 如果没有函数，返回创建新函数的按钮
      if (this.functionBlockStore.functionBlock.length === 0) {
        return [
          { kind: "label", text: "函数" },
          { kind: "button", text: "点击创建新函数", callbackKey: "createFunctionCallback" }
        ];
      }

      let dynamicBlocks = this.initCallFuncion();


      return [
        { kind: "label", text: "函数" },
        { kind: "button", text: "点击创建新函数", callbackKey: "createFunctionCallback" },
        { kind: "label", text: "我的函数" },
        ...dynamicBlocks
      ]; // 返回动态生成的块列表;
    });

    // Toolbox添加
    this.addToolbox();

    // 恢复工作区
    this.restoreWorkspace();
  },
  methods: {

    //检测代码块有无重复添加
    hasCustomBlock(type) {
      const allBlocks = this.workspace.getAllBlocks();
      return allBlocks.some(block => block.type == type); // 指定你要检测的块类型
    },

    // 添加int_main块加到工作区
    addInt_Main() {
      const entryBlock = this.workspace.newBlock('int_main');
      entryBlock.initSvg();
      entryBlock.render();

      // 设置入口块的位置
      entryBlock.moveBy(50, 50);
    },

    // 工作区变化监听:当添加任务调用块时，添加对应的任务定义块
    workspaceChangeListener() {
     
      var allBlocks = this.workspace.getAllBlocks();
      allBlocks.forEach((block) => {
        if (block.type === 'XTask_light_task') {
          if (!this.hasCustomBlock('light_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('light_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(250, 50);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_fmq_task') {
          if (!this.hasCustomBlock('fmq_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('fmq_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(450, 50);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_servo_task') {
          if (!this.hasCustomBlock('servo_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('servo_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(250, 250);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_motors_task') {
          if (!this.hasCustomBlock('motors_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('motors_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(450, 250);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_ultrasonic_task') {
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
        if (type !== 'function_definition') {
          const entryBlocks = allBlocks.filter(block => block.type === type);
          if (entryBlocks.length > 1) {
            for (let i = 1; i < entryBlocks.length; i++) {
              entryBlocks[i].dispose();
            }
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
        } else {
          block.setEnabled(true);
        }
      });

    },

    // 获取所有连接的块
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
      this.mergedToolbox = {
        kind: "categoryToolbox",
        contents: [
          // 主组件的工具箱内容
          // ...this.toolbox.contents,
          // 子组件的工具箱内容
          ...this.dominateToolbox.contents,
          ...this.specialToolbox.contents,
          ...this.logicToolbox.contents,
          ...this.mathToolbox.contents,
          ...this.operationToolbox.contents,
          ...this.xfxCarToolbox.contents,
          ...this.advancedToolbox.contents,
        ]
      };
      // 更新工作区的工具箱
      this.workspace.updateToolbox(this.mergedToolbox);

    },

    // 保存工作区
    saveWorkspace() {
      //读取工作区的块
      const state = Blockly.serialization.workspaces.save(this.workspace);
      // this.createProject(this.store.getters.phoneNumber,JSON.stringify(state),this.projectName);
      console.log('保存工作区数据:', state);

      // 读取自定义函数的数据
      const functionBlockData = this.functionBlockStore.functionBlock;

      // 将工作区状态和自定义函数数据一起保存到 localStorage
      const workspaceData = {
        blocksState: state,//工作区的块
        functionBlocks: functionBlockData//自定义函数的数据
      };

      localStorage.setItem('workspaceData', JSON.stringify(workspaceData));
    },

    // 恢复工作区
    restoreWorkspace() {
      try {
        // 尝试从本地存储中读取数据
        const savedData = localStorage.getItem('workspaceData');
        if (savedData) {
          const Data = JSON.parse(savedData);//解析数据
          const state = Data.blocksState;//获取工作区的块
          const functionBlockData = Data.functionBlocks;
          this.functionBlockStore.functionBlock = functionBlockData;//将自定义函数的数据存储到store中
          console.log('恢复工作区数据:', state);
          console.log('恢复自定义函数数据:', this.functionBlockStore.functionBlock);

          let newBlock;
          let functionBlockArray = [];//存储函数块

          state.blocks.blocks.forEach(blockData => {
            // 检查块的类型是否为 function_definition
            if (blockData.type === 'function_definition') {
              functionBlockArray.push(blockData);
              newBlock = this.workspace.newBlock(blockData.type);

              // 设置位置
              newBlock.moveBy(blockData.x, blockData.y);
            }
          });
          this.$nextTick(() => {
            this.initCallFuncion()
            // 尝试加载数据到工作区 
            try {
              Blockly.serialization.workspaces.load(state, this.workspace);
              this.refreshFunctionBlock(functionBlockArray);
            } catch (error) {
              console.error('加载工作区时出错:', error);
              localStorage.removeItem('workspaceData');
              location.reload();  // 刷新页面
            }
            this.refreshFunctionBlock(functionBlockArray);
          });
        }
      } catch (error) {
        console.error('加载工作区数据时出错:', error);
        // 如果出现错误，删除本地存储的无效数据
        localStorage.removeItem('workspaceData');
        // // 刷新页面
        location.reload();
      }
    },

    //清空所有块
    clearScreen() {
      this.workspace.clear();
    },

    // 代码展示数据的改变
    codeShowChange(viewShow) {
      this.codeShow = viewShow
      if (viewShow == 'run') {
        // this.arrAdd()
      }

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
    operationBox(operationBox) {
      this.operationToolbox = operationBox
    },
    xfxCarBlock(xfxCarBlock) {
      this.xfxCarToolbox = xfxCarBlock
    },
    advancedBlock(advancedBlock) {
      this.advancedToolbox = advancedBlock
    },
    receiveChange(change) {
      this.selected = change;
    },
    receiveLoading(loading){
      this.loading=loading;
    },
    createProject(userId,text,projectName){
      const data={"userId":userId,"text":text,"projectName":projectName}
      createEntry(data).then(res => {
          console.log(res);
        }
      );
    }
  }
    
    // 保存编辑的函数块
    saveEditBlock(stateWithPosition) {
      this.functionBlockStore.editFunctionBlock = stateWithPosition; // 将块状态保存到 store
    },

    //添加自定义函数
    handleAddMyFunction(selectedParams, block, idit, oddBlock) {
      if (idit) {
        this.restoreEditBlock(selectedParams, oddBlock);
        return;
      }
      console.log('工作区创建自定义函数', selectedParams, block);

      // 创建新的块实例
      const clonedBlock = this.workspace.newBlock(block.type); // 使用传递的类型创建新块

      // 删除原有的项
      if (clonedBlock.getInput('funName')) {
        clonedBlock.removeInput('funName');
        clonedBlock.removeInput('Param');
        clonedBlock.removeInput('inner');
      }

      let funName;
      let nameIndex = 0;

      funName = selectedParams[nameIndex]; // 获取函数名
      if (funName == 'myFunction') {
        funName = funName + (this.functionBlockStore.functionBlock.length + 1);
        selectedParams[0] = funName;
      }

      let horizontalInput;
      clonedBlock.appendDummyInput('funName').appendField('函数').appendField(new Blockly.FieldTextInput(funName), 'NAME');


      if (block.inputList[1].fieldRow.length == 1) {
        horizontalInput = clonedBlock.appendDummyInput('Param').appendField('参数:无');
      } else {
        horizontalInput = clonedBlock.appendDummyInput('Param').appendField('参数:');
      }

      let inputField;
      let inputName;


      // 复制块的所有字段和参数
      block.inputList.forEach((input, index) => {
        if (index == 1) {
          input.fieldRow.forEach((field, index) => {

            if (index > 0) {
              inputField = new Blockly.FieldTextInput(`${field.value_}`);
              inputName = field.name;

              horizontalInput.appendField(inputField, inputName);
            }
          });
        }
      });

      // 添加其他的块内容（如执行部分）
      clonedBlock.appendStatementInput('inner').appendField('执行');

      // 设置块不可更改
      clonedBlock.setEditable(false)
      clonedBlock.moveBy(300, 100); // 移动块到正确位置
      // 初始化和渲染块
      clonedBlock.initSvg();
      clonedBlock.render();

      selectedParams.unshift(clonedBlock.id);
      //向函数块的store中添加函数块
      this.functionBlockStore.functionBlock.push(selectedParams);

      // 添加删除函数块的监听
      this.addRemoveCallFunctionBlocks(clonedBlock);

      this.initCallFuncion();

      // 更新工具箱，刷新函数类别
      this.workspace.updateToolbox(this.mergedToolbox);
    },

    // 添加删除调用函数的监听
    addRemoveCallFunctionBlocks(clonedBlock) {
      this.workspace.addChangeListener((event) => {
        if (event instanceof Blockly.Events.BlockDelete) {
          const deletedBlockIds = event.ids; // 获取被删除的块的ID列表

          // 检查是否删除了指定的克隆块
          if (deletedBlockIds.includes(clonedBlock.id)) {
            console.log('删除调用块', clonedBlock);

            // 在这里处理块删除的逻辑
            this.functionBlockStore.functionBlock = this.functionBlockStore.functionBlock.filter(
              params => params[0] !== clonedBlock.id
            );
            // 从工作区中删除块
            this.removeCallFunctionBlocks(clonedBlock.id);
          }
        }
      });
    },

    // 删除调用函数块
    removeCallFunctionBlocks(functionID) {
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type.startsWith('call_function_') && block.getFieldValue('ID') === functionID) {
          block.dispose(true); // 删除该块，传递 true 表示删除时连同其连接的子块一起删除
        }
      });
    },

    // 刷新函数块
    refreshFunctionBlock(functionBlockArray) {
      // 遍历工作区中的所有块
      this.workspace.getAllBlocks().forEach(block => {
        // 检查块的类型是否为函数定义块
        if (block.type === 'function_definition') {
          functionBlockArray.forEach(functionBlock => {
            // 获得当前函数块的
            if (functionBlock.fields.NAME === block.getFieldValue('NAME')) {
              let inputField;
              let inputName;
              let paramInput = block.getInput('Param');
              // 遍历 fields 中的所有键值对
              const hasOtherFields = Object.entries(functionBlock.fields).some(([key]) => key !== 'NAME');

              if (hasOtherFields) {
                paramInput.appendField('参数:');
                // 如果存在除了 NAME 的键值对，删除之前添加的输入
                Object.entries(functionBlock.fields).forEach(([key, value]) => {
                  if (key !== 'NAME') {
                    inputField = new Blockly.FieldTextInput(value);
                    inputName = key;

                    paramInput.appendField(inputField, inputName);
                  }
                })
                // 重新渲染块
                block.render();
                this.addRemoveCallFunctionBlocks(block);
              } else {
                paramInput.appendField('参数: 无');
              }
            }
          });
        }
      })
    },

    // 恢复编辑的函数块
    restoreEditBlock(selectedParams, oddBlock) {
      console.log('恢复编辑的函数块');
      console.log('编辑前的块',oddBlock);

      const Block = JSON.parse(this.functionBlockStore.editFunctionBlock.blockState);//解析数据
      const newBlock = Blockly.serialization.blocks.append(Block, this.workspace);

      let inputField;
      let inputName;
      let paramInput = newBlock.getInput('Param');
      let funName = newBlock.getInput('funName');
      let name;

      name = selectedParams[0]; // 获取函数名
      if (name == 'myFunction') {
        let oddIndex = this.functionBlockStore.functionBlock.findIndex((item) => {

          return item[0] == oddBlock.id; // 条件满足时返回 true
        });
        name = name + (oddIndex + 1);
        selectedParams[0] = name;
      }
      funName.fieldRow[1].setValue(name);

      if (selectedParams.length == 1) {
        paramInput.appendField('参数: 无');
      } else {
        paramInput.appendField('参数:');

        selectedParams.forEach((item, index) => {
          if (index > 0) {
            inputName = getFieldName(item, index);
            let parts = item.split('--&&--');

            if (parts[0]) {
              inputField = new Blockly.FieldTextInput(parts[0]);
            } else {
              inputField = new Blockly.FieldTextInput(parts[1]);
            }
            paramInput.appendField(inputField, inputName);
          }
        });
      }

      selectedParams.unshift(newBlock.id);
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type.startsWith('call_function_') && block.getFieldValue('ID') === oddBlock.id) {


          const blockDefinition = {
            init: function () {
              // 设置块的连接属性
              this.setPreviousStatement(true, null); // 允许前面有代码块连接
              this.setNextStatement(true, null);     // 允许后面有代码块连接
              this.setColour('#a5d599',); // 设置块的颜色
              this.setTooltip('调用已定义的函数');
              this.setHelpUrl('');
            },
          };

          // 注册块类型
          const blockType = `call_function_${selectedParams[1]}`; // 为每个块生成一个唯一的类型名称
          Blockly.Blocks[blockType] = blockDefinition;
          javascriptGenerator.forBlock[blockType] = generateCallFunctionCode; // 注册相同的代码生成器
          block.type = blockType

          const funName = block.getInput('funName');
          const functionID = block.getInput('Id');
          const paramInput = block.getInput('PARAM');

          funName.fieldRow[1].setValue(selectedParams[1]);
          functionID.fieldRow[0].setValue(newBlock.id);
          if (paramInput) {
            block.removeInput('PARAM');
          }
          if (selectedParams.length > 2) {
            const paramInput = block.appendDummyInput('PARAM');
            paramInput.appendField('参数:');
            block.addInput(paramInput, selectedParams);
          }
        }
      });
      oddBlock.dispose(true);

      this.addRemoveCallFunctionBlocks(newBlock);
      this.functionBlockStore.functionBlock.push(selectedParams);


      newBlock.moveBy(this.functionBlockStore.editFunctionBlock.position.x, this.functionBlockStore.editFunctionBlock.position.y); // 移动块到正确位置
      newBlock.initSvg(); // 初始化块的SVG
      newBlock.render();  // 渲染块

    },

    // 初始化调用函数块
    initCallFuncion() {
      let callFunctionBlockArry = [];


      this.functionBlockStore.functionBlock.forEach((functionArray) => {
        const functionName = functionArray[1]; // 获取函数名

        // 定义块
        const blockDefinition = {
          init: function () {
            // 添加输入字段，用于显示和设置函数名
            this.appendDummyInput('funName')
              .appendField("调用函数")
              .appendField(new Blockly.FieldLabel(functionName), "NAME"); // 获取传递的动态函数名

            // 添加输入字段，用于显示和设置函数名
            this.appendDummyInput('Id')
              .appendField(new Blockly.FieldLabel(functionArray[0]), "ID") // 获取传递的动态函数名
              .setVisible(false); // 隐藏;

            let paramInput;
            if (functionArray.length > 2) {
              // 添加其他输入或参数
              paramInput = this.appendDummyInput('PARAM');
              paramInput.appendField("参数:");
              // 添加参数
              this.addInput(paramInput, functionArray);

            }

            // 设置块的连接属性
            this.setPreviousStatement(true, null); // 允许前面有代码块连接
            this.setNextStatement(true, null);     // 允许后面有代码块连接
            this.setColour('#a5d599',); // 设置块的颜色
            this.setTooltip('调用已定义的函数');
            this.setHelpUrl('');
          },

          addInput: function (paramInput, functionArray) {
            for (let paramIndex = 2; paramIndex < functionArray.length; paramIndex++) {
              let parts = functionArray[paramIndex].split('--&&--');
              let valueAfterPrefix = parts[1]; // 获取 "--" 后面的部分

              if (valueAfterPrefix === '文本') {
                paramInput.appendField(new Blockly.FieldTextInput(parts[0] || "text"), `PARAM${paramIndex}`);
              } else if (valueAfterPrefix === '布尔值') {
                // 定义下拉框选项
                const booleanDropdownOptions = [
                  ["true", "true"],
                  ["false", "false"]
                ];
                paramInput.appendField(new Blockly.FieldDropdown(booleanDropdownOptions), `PARAM${paramIndex}`);
              } else if (valueAfterPrefix === '整形') {
                paramInput.appendField(new Blockly.FieldNumber(0, -2147483648, 2147483647, 1), `PARAM${paramIndex}`);
              } else if (valueAfterPrefix === '浮点数') {
                paramInput.appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), `PARAM${paramIndex}`);
              } else if (valueAfterPrefix === '长整形') {
                paramInput.appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), `PARAM${paramIndex}`);
              } else {
                const arrayDropdownOptions = [
                  ["array1", "abcd"],
                  ["array2", "efgh"],
                  ["array3", "ijkl"],
                ];
                paramInput.appendField(new Blockly.FieldDropdown(arrayDropdownOptions), `PARAM${paramIndex}`);
              }
            }
          }
        };

        // 注册块类型
        const blockType = `call_function_${functionName}`; // 为每个块生成一个唯一的类型名称
        Blockly.Blocks[blockType] = blockDefinition;
        javascriptGenerator.forBlock[blockType] = generateCallFunctionCode; // 注册相同的代码生成器

        // 创建调用函数块
        const callFunctionBlock = {
          kind: 'block',
          type: blockType, // 使用唯一的块类型
          fields: {
            NAME: functionName, // 动态设置函数名
          },
        };

        // 将生成的调用函数块加入到动态块数组
        callFunctionBlockArry.push(callFunctionBlock);
      });
      return callFunctionBlockArry;
    }

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
  background-position: 10px 670px;
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
  padding-left: 0 !important;
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
