<template>
  <div class="loading-container" ref="container" style="width: 100%; height: 100%;" v-loading="loading"
    :element-loading-text="loadingText" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <ContentView></ContentView>
    <div style="width: 100%; height: 60px">
      <TopNav :history_files="history_files" @save="saveWorkspace" @clear="clearScreen" @viewShowUpdate="codeShowChange"
        :code="code" @change="receiveChange" @loading="receiveLoading" @blockCode="receiveBlock" @edit="editHistoryFile"
        @delete="deleteHistoryFile" :parentIndex="selectedIndex">
      </TopNav>
    </div>
    <div id="blockly">
      <!-- 工作区 -->
      <!-- <div class="code-wrap"> -->
      <div class="code-wrap">
        <div id="blocklyDiv" ref="blocklyDiv" style="height:calc(100vh - 60px);width:70%" v-show="selected == 1"></div>
        <LogicBlock @logicBox="logicBox"></LogicBlock>
        <DominateBlock @dominateBox="dominateBox"></DominateBlock>
        <MathBlock @mathBox="mathBox"></MathBlock>
        <OperationBlock @operationBox="operationBox"></OperationBlock>
        <XfxCarBlock @xfxCarBlock="xfxCarBlock"></XfxCarBlock>
        <AdvancedBlock @advancedBlock="advancedBlock"></AdvancedBlock>
        <div id="code" ref="codeView" style="width: 70%;height:calc(100vh - 60px);" v-show="selected == 2"></div>
        <div style="width: 30%;"></div>

      </div>
    </div>
  </div>
</template>

<script>
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from "blockly/javascript";
import { registerFunctionBlockContextMenuOptions,unregisterFunctionBlockContextMenuOptions } from '../utils/blocklyContextMenu'//引入右键菜单
import { generateCallFunctionCode } from '../utils/functionBlockGenerate';//引入生成函数的代码
//引入其他组件
import TopNav from '../components/TopNav.vue'
import { formatDate } from '@/utils/formatDate'
import ContentView from '@/components/ContentView.vue';
import DominateBlock from '../components/Dominate/Dominate.vue';
import LogicBlock from '../components/Logic/Logic.vue';
import MathBlock from "../components/Math/Math.vue";
import OperationBlock from '../components/Operation/Operation.vue'
import XfxCarBlock from '../components/xfxCar/XfxCar.vue'
import AdvancedBlock from '@/components/Advanced/Advanced.vue';
//引入controls_if的插件包
import '@blockly/block-plus-minus';
import * as zh_hans from 'blockly/msg/zh-hans';
import { EventBus } from '../utils/eventBus';
import { createCodeBlock, find, update, remove } from '@/api/codeblock';
import store from '@/store';
//设置语言
Blockly.setLocale(zh_hans);
import { useAdvancedBlockStore } from '@/store/advancedBlockStore';//引入自定义函数的store
import * as monaco from 'monaco-editor';
import { XTaskCheckTypes } from '@/components/config/config';

export default {
  name: "CarGame",
  provide() {
    return {
      Homeworkspace: this.workspace, // 提供 workspace 给所有子组件
      cleanupResources: this.cleanupResources,
    };
  },
  data() {
    return {
      codeShow: 'code',
      //工具箱
      operationToolbox: null,
      logicToolbox: null,
      dominateToolbox: null,
      xfxCarToolbox: null,
      advancedToolbox: null,
      //合并后的工具箱
      mergedToolbox: null,
      code: '',//代码
      horizontalLayout: true, //工具箱水平
      toolboxPosition: "end", //工具箱在底部
      advancedBlockStore: useAdvancedBlockStore(),//自定义函数的store
      //特殊块
      entryBlockTypes: ['int_main', 'light_task', 'led_task', 'ultrasonic_task', 'motors_task', 'servo_task', 'fmq_task', 'mpu_task', 'function_definition', 'ir_task', 'logo_task'],
      toolbox: {
        contents: [
          {
            "kind": "category",
          },
        ],
      },
      workspace: null,
      codeViewIns: null,
      selected: 1,
      loading: false,
      loadingText: '',
      projectName: '',
      store: store,
      history_files: [],
      selectedIndex: -1,
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
    XfxCarBlock,
    AdvancedBlock
  },
  created() {
    find({ "userId": this.store.getters.phoneNumber }).then(res => {
      this.history_files = res.map(file => ({
        ...file,
        updatedAt: formatDate(file.updatedAt)
      })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    );
  },
  mounted() {
    this.initBlocklyWorkspace();
  },
  watch: {
    selected(newVal) {
      if (newVal === 2) {

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
    },
  },
  methods: {
    //检测代码块有无重复添加
    hasCustomBlock(type) {
      const allBlocks = this.workspace.getAllBlocks();
      return allBlocks.some(block => block.type == type); // 指定你要检测的块类型
    },
    initBlocklyWorkspace() {
      // 监听全局事件
      EventBus.$on('addMyFunction', this.handleAddMyFunction);
      EventBus.$on('refreshConstant', this.refreshConstant);
      EventBus.$on('refreshArray', this.refreshArray);
      EventBus.$on('deleteArray', this.deleteArray);
      EventBus.$on('deleteConstant', this.deleteConstant);

      // 如果已有工作区，销毁当前工作区
      if (this.workspace && this.workspaceChangeListener) {

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
            colour: '#B463FF', // 背景颜色（十六进制表示）
            colourSecondary: '#B463FF', // 二次背景颜色
            colourTertiary: '#B463FF', // 三次背景颜色
          },
          logic_category: {
            colour: '#FF962E', // 背景颜色（十六进制表示）
            colourSecondary: '#FF962E', // 二次背景颜色
            colourTertiary: '#FF962E', // 三次背景颜色
          },
          math_category: {
            colour: '#3BB0FF', // 背景颜色（十六进制表示）
            colourSecondary: '#3BB0FF', // 二次背景颜色
            colourTertiary: '#3BB0FF', // 三次背景颜色
          },
          operation_category: {
            colour: '#FFBF00', // 背景颜色（十六进制表示）
            colourSecondary: '#FFBF00', // 二次背景颜色
            colourTertiary: '#FFBF00', // 三次背景颜色
          },
          xfxCar_category: {
            colour: '#ff7272', // 背景颜色（十六进制表示）
            colourSecondary: '##ff7272', // 二次背景颜色
            colourTertiary: '#ff7272', // 三次背景颜色
          },
          advanced_category: {
            colour: '#4FD284', // 背景颜色（十六进制表示）
            colourSecondary: '#4FD284', // 二次背景颜色
            colourTertiary: '#4FD284', // 三次背景颜色
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
      this.workspace.registerButtonCallback('createAdvancedToolbox', (e) => {

        if (e.text == '点击创建新函数') {
          EventBus.$emit('showFunctionEditor');
        } else if (e.text == '点击创建新变量') {
          EventBus.$emit('showConstantEditor');
        } else if (e.text == '点击创建新数组') {
          EventBus.$emit('showArrayEditor');
        }
        // 关闭选中工具箱中的函数类别
        Blockly.getMainWorkspace().toolbox_.setSelectedItem(null);
      });

      // 添加int_main块加到工作区
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

        let callFuncionBlocks = this.initCallFuncion();
        let constantBlocks = this.initConstant();
        let arrayBlocks = this.initArray();

        return [
          { "kind": "label", "text": "基础" },
          { kind: "block", type: "forever" },
          { kind: "block", type: "implement" },
          { kind: "block", type: "delay" },
          ...callFuncionBlocks,
          { kind: "label", text: "" },

          ...constantBlocks,
          { kind: "label", text: "" },

          ...arrayBlocks,
          { kind: "label", text: "" },

          { kind: "label", text: "文本" },
          { kind: "block", type: "string" },
          { kind: "block", type: "string_length" },
          { kind: "label", text: "" },

          { kind: "label", text: "括号" },
          { kind: "block", type: "bracket" },
          { kind: "label", text: "" },

          // { kind: "label", text: "显示" },
          // { kind: "block", type: "test_field_bitmap" },
        ];
      });

      // Toolbox添加
      this.addToolbox();

      // 添加工作区监听器:当删除函数块时，删除调用函数块
      this.workspace.addChangeListener(this.blockDeleteListener);

      // 恢复工作区
      this.restoreWorkspace();
    },
    cleanupResources() {
      // 销毁 Blockly 工作区
      if (this.workspace) {
        this.workspace.removeChangeListener(this.workspaceChangeListener);
        this.workspace.dispose();
        this.workspace = null;
      }

      // 移除 EventBus 事件监听器
      EventBus.$off('addMyFunction', this.handleAddMyFunction);
      EventBus.$off('refreshConstant', this.refreshConstant);
      EventBus.$off('refreshArray', this.refreshArray);
      EventBus.$off('deleteArray', this.deleteArray);
      EventBus.$off('deleteConstant', this.deleteConstant);
       // 移除工具箱类别回调
  if (this.workspace) {
    this.workspace.unregisterToolboxCategoryCallback('DYNAMIC_FUNCTION_CATEGORY');
  }

  // 移除右键菜单项
  unregisterFunctionBlockContextMenuOptions();

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
      let cycleBlocks = [];
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
        } else if (block.type === 'XTask_led_task') {
          if (!this.hasCustomBlock('led_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('led_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(450, 50);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_fmq_task') {
          if (!this.hasCustomBlock('fmq_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('fmq_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(250, 250);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_servo_task') {
          if (!this.hasCustomBlock('servo_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('servo_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(450, 250);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_motors_task') {
          if (!this.hasCustomBlock('motors_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('motors_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(250, 50);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_ultrasonic_task') {
          if (!this.hasCustomBlock('ultrasonic_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('ultrasonic_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(450, 50);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_mpu_task') {
          if (!this.hasCustomBlock('mpu_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('mpu_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(250, 250);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_ir_task') {
          if (!this.hasCustomBlock('ir_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('ir_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(450, 50);  // 可根据需要修改坐标
          }
        } else if (block.type === 'XTask_logo_task') {
          if (!this.hasCustomBlock('logo_task')) {
            // 仅当工作区没有指定块时，才添加块，防止重复添加
            const customBlock = this.workspace.newBlock('logo_task');
            customBlock.initSvg();
            customBlock.render();
            // 设置指定块的位置，例如添加在已有块的旁边
            customBlock.moveBy(250, 50);  // 可根据需要修改坐标
          }
        }else if (block.type === 'cycle') {
          cycleBlocks.push(block);
}
      })
      cycleBlocks.forEach((block, index) => {
        block.indexVar = `index${index + 1}`;  // 生成唯一的变量名
    });
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
          ...this.logicToolbox.contents,
          ...this.mathToolbox.contents,
          ...this.operationToolbox.contents,
          ...this.xfxCarToolbox.contents,
          ...this.advancedToolbox.contents,
          ...this.initConstant(), // 添加变量块
        ]
      };
      // 更新工作区的工具箱
      this.workspace.updateToolbox(this.mergedToolbox);

    },

    // 保存工作区
    async saveWorkspace(projectName, selectedIndex) {
      this.projectName = projectName;
      //读取工作区的块
      const state = Blockly.serialization.workspaces.save(this.workspace);
      await this.createProject(this.store.getters.phoneNumber, JSON.stringify(state), this.projectName, this.advancedBlockStore.functionBlock, this.advancedBlockStore.constantBlock, this.advancedBlockStore.arrayBlock);
      if (selectedIndex != -1) {
        this.selectedIndex = selectedIndex + 1;
      }
    },
    //保存编辑的历史文件
    editHistoryFile(projectName) {
      this.$confirm('是否对该文件进行修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.receiveLoading(true, '正在修改中');

        try {
          // 保存工作区状态
          const state = Blockly.serialization.workspaces.save(this.workspace);

          // 序列化自定义块数据
          const strFunctionBlock = this.advancedBlockStore.functionBlock.map(subArray => subArray.join(', ')).join(' |&&| ');
          const strConstantBlock = this.advancedBlockStore.constantBlock.join(' |&&| ');
          const strArrayBlock = this.advancedBlockStore.arrayBlock.join(' |&&| ');

          // 构建请求数据
          const data = {
            "userId": this.store.getters.phoneNumber,
            "text": JSON.stringify(state),
            "projectName": projectName,
            "functionBlock": strFunctionBlock,
            "constantBlock": strConstantBlock,
            "arrayBlock": strArrayBlock
          };

          // 更新数据
          await update(data);

          // 获取更新后的历史文件
          const res = await find({ "userId": this.store.getters.phoneNumber });

          // 更新历史文件列表
          this.history_files = res.map(file => ({
            ...file,
            updatedAt: formatDate(file.updatedAt)
          })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          if (this.workspace && this.workspace.toolbox_) {
            const selectedItem = this.workspace.toolbox_.getSelectedItem();
            if (selectedItem) {
              this.workspace.toolbox_.clearSelection();
            }
          }
          this.selectedIndex = 0;
          // 更新完成，关闭加载状态
          this.receiveLoading(false);

          // 显示成功消息
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        } catch (error) {
          console.error('修改文件时出错:', error);
          // 更新失败，关闭加载状态
          this.receiveLoading(false);
          // 显示错误消息
          this.$message({
            type: 'error',
            message: '修改失败，请重试!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    deleteHistoryFile(projectName, index, selectedIndex) {
      this.$confirm('是否删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.receiveLoading(true, '正在删除中');
        try {
          // 删除数据
          await remove({ "userId": this.store.getters.phoneNumber, "projectName": projectName });
          // 获取更新后的历史文件
          const res = await find({ "userId": this.store.getters.phoneNumber });

          // 更新历史文件列表
          this.history_files = res.map(file => ({
            ...file,
            updatedAt: formatDate(file.updatedAt)
          })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          if (this.workspace && this.workspace.toolbox_) {
            const selectedItem = this.workspace.toolbox_.getSelectedItem();
            if (selectedItem) {
              this.workspace.toolbox_.clearSelection();
            }
          }
          if (index == selectedIndex) {
            this.clearScreen();
            this.selectedIndex = -1;
          } else if (index < selectedIndex) {
            this.selectedIndex = selectedIndex - 1;
          }

          this.receiveLoading(false);
          // 显示成功消息
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } catch (error) {
          console.error('删除文件时出错:', error);
          // 更新失败，关闭加载状态
          this.receiveLoading(false);
          // 显示错误消息
          this.$message({
            type: 'error',
            message: '删除失败，请重试!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 恢复工作区
    restoreWorkspace() {
      try {
        // 尝试从本地存储中读取数据
        const savedData = localStorage.getItem('workspaceData');

        if (savedData) {
          const Data = JSON.parse(savedData);//解析数据
          const state = Data.blocksState;//获取工作区的块
          this.advancedBlockStore.functionBlock = Data.functionBlocks || [];//获取自定义函数的数据
          this.advancedBlockStore.constantBlock = Data.constantBlock || ["Fn:重命名此变量", "Fn:删除此变量"];//获取变量的数据
          this.advancedBlockStore.arrayBlock = Data.arrayBlock || ["Fn:重命名此数组", "Fn:删除此数组"];//获取数组的数据
          console.log('恢复工作区数据:', state);

          this.$nextTick(() => {
            this.initCallFuncion()
            this.initConstant()
            this.initArray()
            // 尝试加载数据到工作区 
            try {
              Blockly.serialization.workspaces.load(state, this.workspace);
            } catch (error) {
              console.error('加载工作区时出错:', error);
              // localStorage.removeItem('workspaceData');
              // location.reload();  // 刷新页面
            }
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

    // 定义删除块的监听器函数
    blockDeleteListener(event) {
      if (event instanceof Blockly.Events.BlockDelete) {
        if (event.oldJson.type === 'function_definition') {
          const deletedBlockIds = event.blockId; // 获取被删除的块的ID

          // 从 functionBlock 中移除对应的块
          this.advancedBlockStore.functionBlock = this.advancedBlockStore.functionBlock.filter(
            params => params[0] !== deletedBlockIds
          );

          // 从工作区中删除块
          this.removeCallFunctionBlocks(deletedBlockIds);
        }
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
    receiveLoading(loading, loadingText) {
      this.loading = loading;
      this.loadingText = loadingText;
    },
    async createProject(userId, text, projectName, functionBlock, constantBlock, arrayBlock) {
      const strFunctionBlock = functionBlock.map(subArray => subArray.join(', ')).join(' |&&| ');
      const strConstantBlock = constantBlock.join(' |&&| ');
      const strArrayBlock = arrayBlock.join(' |&&| ');


      const data = { "userId": userId, "text": text, "projectName": projectName, "functionBlock": strFunctionBlock, "constantBlock": strConstantBlock, "arrayBlock": strArrayBlock };

      await createCodeBlock(data);

      const res = await find({ "userId": this.store.getters.phoneNumber })
      this.history_files = res.map(file => ({
        ...file,
        updatedAt: formatDate(file.updatedAt)
      })).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      if (this.workspace && this.workspace.toolbox_) {
        const selectedItem = this.workspace.toolbox_.getSelectedItem();
        if (selectedItem) {
          this.workspace.toolbox_.clearSelection();
        }
      }

    },

    receiveBlock(block, index) {
      if (block) {
        this.selectedIndex = index
        const state = JSON.parse(block.text);
        this.advancedBlockStore.functionBlock = block.functionBlock.split(' |&&| ').map(subStr => subStr.split(', '));
        this.advancedBlockStore.constantBlock = block.constantBlock.split(' |&&| ')
        this.advancedBlockStore.arrayBlock = block.arrayBlock.split(' |&&| ')

        this.$nextTick(() => {
          if (this.workspace && this.workspace.toolbox_) {
            const selectedItem = this.workspace.toolbox_.getSelectedItem();
            if (selectedItem) {
              this.workspace.toolbox_.clearSelection();
            }
          }
          this.initCallFuncion()
          this.initConstant()
          this.initArray()

          this.workspace.removeChangeListener(this.blockDeleteListener)


          // 尝试加载数据到工作区 
          try {
            Blockly.serialization.workspaces.load(state, this.workspace);
            this.$nextTick(() => {

              setTimeout(() => {
                this.workspace.addChangeListener(this.blockDeleteListener);
              }, 1000);
              this.addToolbox();

              this.receiveLoading(true, '历史文件载入中');//触发遮罩层，防止文件切换过快导致载入异常
              setTimeout(() => {
                this.receiveLoading(false);
              }, 1100);
            })
          } catch (error) {
            console.error('加载工作区时出错:', error);
            location.reload();  // 刷新页面
          }
        });
      }
    },

    //添加自定义函数
    handleAddMyFunction(selectedParams, idit, oddBlock) {
      if (idit) {
        this.restoreEditBlock(selectedParams, oddBlock);
        return;
      }
      console.log('工作区创建自定义函数', selectedParams);

      // 创建新的块实例
      const clonedBlock = this.workspace.newBlock('function_definition'); // 使用传递的类型创建新块
      if (selectedParams[0] == 'myFunction') {
        selectedParams[0] = selectedParams[0] + (this.advancedBlockStore.functionBlock.length + 1);
      }
      clonedBlock.param = selectedParams;
      selectedParams.unshift(clonedBlock.id);
      clonedBlock.addParam(selectedParams)

      // 设置块不可更改
      clonedBlock.setEditable(false)
      clonedBlock.moveBy(300, 100); // 移动块到正确位置
      // 初始化和渲染块
      clonedBlock.initSvg();
      clonedBlock.render();


      //向函数块的store中添加函数块
      this.advancedBlockStore.functionBlock.push(selectedParams);

      // 声明调用函数，防止在点击工作区前菜单调用函数报错
      this.initCallFuncion();


      // 更新工具箱，刷新函数类别
      this.workspace.updateToolbox(this.mergedToolbox);
    },


    // 删除调用函数块
    removeCallFunctionBlocks(functionID) {
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type.startsWith('call_function_') && block.getFieldValue('ID') === functionID) {
          block.dispose(true); // 删除该块，传递 true 表示删除时连同其连接的子块一起删除
          console.log('删除调用函数块');

        }
      });
    },


    // 恢复编辑的函数块
    restoreEditBlock(selectedParams, oddBlock) {
      console.log('编辑前的块', oddBlock);

      selectedParams.unshift(oddBlock.id);
      oddBlock.refreshParam(selectedParams);

      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type.startsWith('call_function_') && block.getFieldValue('ID') === oddBlock.id) {
          block.refreshParam(selectedParams);
        }
      });
      this.advancedBlockStore.refreshFunctionBlock(selectedParams)
      this.initCallFuncion();
    },

    // 初始化调用函数块
    initCallFuncion() {
      let callFunctionBlockArry = [
        {
          kind: "label",
          text: "函数"
        },
        {
          kind: "button",
          text: "点击创建新函数",
          callbackKey: "createAdvancedToolbox"  // 关键：添加callbackKey
        },];


      if (this.advancedBlockStore.functionBlock.length > 0) {
        callFunctionBlockArry.push({
          kind: "label",
          text: "我的函数"
        });
        let that = this;
        this.advancedBlockStore.functionBlock.forEach((functionArray) => {
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

              // 添加参数部分，默认无参数
              this.appendDummyInput('Param')
                .appendField('参数:无', 'paramName');

              this.param = functionArray;
              this.addParam(functionArray, functionArray);

              // 设置块的连接属性
              this.setPreviousStatement(true, XTaskCheckTypes); // 允许前面有代码块连接
              this.setNextStatement(true, XTaskCheckTypes);     // 允许后面有代码块连接
              this.setColour('#4FD284',); // 设置块的颜色
              this.setTooltip('调用已定义的函数');
              this.setHelpUrl('');
            },
            addParam: function (functionArray) {
              //设置名字
              const nameInput = this.getField('NAME');
              nameInput.setValue(functionArray[1]);

              // 设置ID 
              const idInput = this.getField('ID');
              idInput.setValue(functionArray[0]);

              // 设置参数
              const paramInput = this.getInput('Param');
              if (functionArray.length > 2) {
                this.setFieldValue('参数:', 'paramName');
              } else {
                this.setFieldValue('参数:无', 'paramName');
              }

              for (let paramIndex = 2; paramIndex < functionArray.length; paramIndex++) {
                let parts = functionArray[paramIndex].split('--&&--');
                let valueAfterPrefix = parts[1]; // 获取 "--" 后面的部分

                if (valueAfterPrefix === '文本') {
                  paramInput.appendField(new Blockly.FieldTextInput("text"), valueAfterPrefix);
                } else if (valueAfterPrefix === '布尔值') {
                  // 定义下拉框选项
                  const booleanDropdownOptions = [
                    ["true", "true"],
                    ["false", "false"]
                  ];
                  paramInput.appendField(new Blockly.FieldDropdown(booleanDropdownOptions), valueAfterPrefix);
                } else if (valueAfterPrefix === '浮点数') {
                  paramInput.appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), valueAfterPrefix);
                } else {
                  let arrayDropdownOptions = this.getParam(that.advancedBlockStore.arrayBlock);
                  this.dropdownField = new Blockly.FieldDropdown(arrayDropdownOptions);
                  paramInput.appendField(this.dropdownField, valueAfterPrefix);
                }
              }
            },
            refreshParam: function (functionArray) {
              console.log(functionArray);
              const constantInput = this.getInput('Param');
              if (constantInput) {
                // 遍历 constantInput 的所有字段并逐个删除
                const fields = constantInput.fieldRow.slice(); // 创建副本防止修改原数组时出错
                fields.forEach((field) => {
                  if (field.name !== 'paramName') { // 保留 'paramName' 字段
                    constantInput.removeField(field.name);
                  }
                });
              }
              this.param = functionArray; // 保存参数
              this.addParam(functionArray); // 重新添加参数  
            },
            getParam: function (arrayBlock) {
              let arrayDropdownOptions = []
              for (let arrayIndex = 0; arrayIndex < arrayBlock.length; arrayIndex++) {
                if (arrayBlock[arrayIndex] != 'Fn:删除此数组' && arrayBlock[arrayIndex] != 'Fn:重命名此数组') {
                  arrayDropdownOptions.push([arrayBlock[arrayIndex], arrayBlock[arrayIndex]]);
                }
              }
              arrayDropdownOptions.push(['无数组', '无数组']);

              return arrayDropdownOptions;
            },
            addNewConstant: function (currentOptions, constantDropdownOptions, Index) {
              if (Index != undefined) {
                currentOptions[Index][0] = constantDropdownOptions[Index][0];
                currentOptions[Index][1] = constantDropdownOptions[Index][1];
                // 自动选择当前选项
              } else {
                currentOptions.unshift(constantDropdownOptions[0]);
              }
            },

            deleteNewConstant: function (Field, Index) {

              // 获取下拉框的所有选项
              const currentOptions = Field.getOptions();

              // 获取当前下拉框的值
              const currentValue = Field.getValue();

              const index = currentOptions.findIndex(option => option[0] === currentValue);

              currentOptions.splice(Index, 1);
              if (index == Index) {
                Field.setValue(currentOptions[currentOptions.length - 1][0]);
              }
            },
            saveExtraState: function () {
              return {
                'param': this.param,
              };
            },
            loadExtraState: function (state) {
              this.param = state['param'];
              if (this.param) {
                const paramInput = this.getInput('Param');
                if (paramInput.fieldRow.length == 1) {
                  this.addParam(this.param);
                }
              }
            },
          };

          // 注册块类型
          const blockType = `call_function_${functionName}`; // 为每个块生成一个唯一的类型名称
          Blockly.Blocks[blockType] = blockDefinition;
          javascriptGenerator.forBlock[blockType] = generateCallFunctionCode; // 注册相同的代码生成器

          // 创建调用函数块
          const callFunctionBlock = {
            kind: 'block',
            type: blockType, // 使用唯一的块类型
          };

          // 将生成的调用函数块加入到动态块数组
          callFunctionBlockArry.push(callFunctionBlock);
        });
      }
      return callFunctionBlockArry;
    },

    //初始化变量块
    initConstant() {
      let constantBlockArry = [
        {
          kind: "label",
          text: "变量"
        },
        {
          kind: "button",
          text: "点击创建新变量",
          callbackKey: "createAdvancedToolbox"  // 关键：添加callbackKey
        },
      ];

      if (this.advancedBlockStore.constantBlock.length > 2) {
        constantBlockArry.push({
          kind: "label",
          text: "我的变量"
        });

        const that = this;

        // 定义变量块
        const blockDefinition = {
          init: function () {
            // 添加变量选项
            let constantDropdownOptions = this.getConstant(that.advancedBlockStore.constantBlock);
            this.constantBlock = that.advancedBlockStore.constantBlock;
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            // 创建输入框，并设置它们在同一行
            this.appendDummyInput()
              .appendField("定义")
              .appendField(new Blockly.FieldDropdown([
                ["整型", "int"],
                ["浮点型", "float"],
                ["字符串型", "string"],
              ]), "TYPE")
              .appendField("变量")
              .appendField(this.dropdownField, "CONSTANT")

            // 设置块的连接属性
            this.setPreviousStatement(true, XTaskCheckTypes); // 允许前面有代码块连接
            this.setNextStatement(true, XTaskCheckTypes);     // 允许后面有代码块连接
            this.setColour('#4FD284'); // 设置块的颜色
            this.setTooltip('定义一个变量');
            this.setHelpUrl('');

          },
          getConstant: function (constantBlock) {
            let constantDropdownOptions = [];
            for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
              constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
            }
            return constantDropdownOptions;
          },
          addConstant: function (constantInput, dropdownField) {
            constantInput.appendField(dropdownField, "CONSTANT");
          },
          addNewConstant: function (currentOptions, constantDropdownOptions, Index, value) {
            if (Index != undefined) {
              let temp = currentOptions[Index][0];
              currentOptions[Index][0] = constantDropdownOptions[Index][0];
              currentOptions[Index][1] = constantDropdownOptions[Index][1];
              if (value.value_ || temp == value) {
                // 自动选择当前选项
                this.getField('CONSTANT').setValue(currentOptions[Index][0]); // 设置为当前选项
              }
            } else {
              currentOptions.unshift(constantDropdownOptions[0]);
            }
          },
          deleteNewConstant: function (Index) {
            // 获取下拉框的所有选项
            const currentOptions = this.getField('CONSTANT').getOptions();
            // 获取当前下拉框的值
            const currentValue = this.getField('CONSTANT').getValue();
            const index = currentOptions.findIndex(option => option[0] === currentValue);
            currentOptions.splice(Index, 1);
            if (index == Index) {
              this.dispose(true);
            }
          },
          saveExtraState: function () {
            return {
              'constantBlock': this.constantBlock,
            };
          },
          loadExtraState: function (state) {
            this.constantBlock = state['constantBlock'];
            if (this.constantBlock) {
              this.getField('CONSTANT').setValidator((newValue) => {
                const options = this.getField('CONSTANT').getOptions();
                const index = options.findIndex(option => option[0] === this.getField('CONSTANT').getValue()); // 通过比较选项的第一个元素获取索引

                if (newValue == 'Fn:重命名此变量') {
                  EventBus.$emit('showConstantEditor', '重命名此变量', index);
                  return this.getField('CONSTANT')
                } else if (newValue == 'Fn:删除此变量') {
                  EventBus.$emit('deleteConstant', index);
                  return this.getField('CONSTANT')
                }
                return newValue; // 返回新值以更新显示
              });
            }
          },
        };

        // 注册变量块类型
        const blockType = 'constantBlock'; // 为每个块生成一个唯一的类型名称
        Blockly.Blocks[blockType] = blockDefinition;


        // 创建变量块
        const constantBlock = {
          kind: 'block',
          type: blockType, // 使用唯一的块类型
        };


        // 定义变量块重新赋值块
const assignBlockDefinition = {
  init: function () {
            // 添加变量选项
            let constantDropdownOptions = this.getConstant(that.advancedBlockStore.constantBlock);
            this.constantBlock = that.advancedBlockStore.constantBlock;
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            // 创建输入框，并设置它们在同一行
            this.appendValueInput("VALUE")
              .appendField("变量")
              .appendField(this.dropdownField, "CONSTANT")
              .appendField("设置为").setCheck(null)

            // 设置块的连接属性
            this.setPreviousStatement(true, XTaskCheckTypes); // 允许前面有代码块连接
            this.setNextStatement(true, XTaskCheckTypes);     // 允许后面有代码块连接
            this.setColour('#4FD284'); // 设置块的颜色
            this.setTooltip('变量重新设置数值');
            this.setHelpUrl('');

          },
    getConstant: function (constantBlock) {
            let constantDropdownOptions = [];
            for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
              constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
            }
            return constantDropdownOptions;
          },
          addConstant: function (constantInput, dropdownField) {
            constantInput.appendField(dropdownField, "CONSTANT");
          },
          addNewConstant: function (currentOptions, constantDropdownOptions, Index, value) {
            if (Index != undefined) {
              let temp = currentOptions[Index][0];
              currentOptions[Index][0] = constantDropdownOptions[Index][0];
              currentOptions[Index][1] = constantDropdownOptions[Index][1];
              if (value.value_ || temp == value) {
                // 自动选择当前选项
                this.getField('CONSTANT').setValue(currentOptions[Index][0]); // 设置为当前选项
              }
            } else {
              currentOptions.unshift(constantDropdownOptions[0]);
            }
          },
          deleteNewConstant: function (Index) {
            // 获取下拉框的所有选项
            const currentOptions = this.getField('CONSTANT').getOptions();
            // 获取当前下拉框的值
            const currentValue = this.getField('CONSTANT').getValue();
            const index = currentOptions.findIndex(option => option[0] === currentValue);
            currentOptions.splice(Index, 1);
            if (index == Index) {
              this.dispose(true);
            }
          },
          saveExtraState: function () {
            return {
              'constantBlock': this.constantBlock,
            };
          },
          loadExtraState: function (state) {
            this.constantBlock = state['constantBlock'];
            if (this.constantBlock) {
              this.getField('CONSTANT').setValidator((newValue) => {
                const options = this.getField('CONSTANT').getOptions();
                const index = options.findIndex(option => option[0] === this.getField('CONSTANT').getValue()); // 通过比较选项的第一个元素获取索引

                if (newValue == 'Fn:重命名此变量') {
                  EventBus.$emit('showConstantEditor', '重命名此变量', index);
                  return this.getField('CONSTANT')
                } else if (newValue == 'Fn:删除此变量') {
                  EventBus.$emit('deleteConstant', index);
                  return this.getField('CONSTANT')
                }
                return newValue; // 返回新值以更新显示
              });
            }
          },
};

// 注册变量赋值块类型
const assignBlockType = 'assignBlock';
Blockly.Blocks[assignBlockType] = assignBlockDefinition;
 // 创建变量块
 const assignBlock = {
          kind: 'block',
          type: assignBlockType, // 使用唯一的块类型
        };

        // 定义变量改变块
        const blockDefinition_change = {
          init: function () {
            // 先创建 "constant" 输入框
            this.appendDummyInput()
              .appendField("以");

            this.appendValueInput("NUMBER")
              .setCheck("Number"); // 只允许数值输入

            this.appendDummyInput('constant')
              .appendField("为幅度改变变量");

            this.setInputsInline(true); // 让所有输入保持在同一行

            let constantInput = this.getInput('constant');

            // 添加变量选项
            let constantDropdownOptions = this.getConstant(that.advancedBlockStore.constantBlock);
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            this.addConstant(constantInput, this.dropdownField);
            this.constantBlock = that.advancedBlockStore.constantBlock;
            // 设置块的连接属性
            this.setPreviousStatement(true, XTaskCheckTypes); // 允许前面有代码块连接
            this.setNextStatement(true, XTaskCheckTypes);     // 允许后面有代码块连接
            this.setColour('#4FD284'); // 设置块的颜色
            this.setTooltip('改变变量的值');
            this.setHelpUrl('');

          },
          getConstant: function (constantBlock) {
            let constantDropdownOptions = [];
            for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
              constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
            }
            return constantDropdownOptions;
          },
          addConstant: function (constantInput, dropdownField) {
            constantInput.appendField(dropdownField, "CONSTANT");
          },
          addNewConstant: function (currentOptions, constantDropdownOptions, Index, value) {
            if (Index != undefined) {
              let temp = currentOptions[Index][0];
              currentOptions[Index][0] = constantDropdownOptions[Index][0];
              currentOptions[Index][1] = constantDropdownOptions[Index][1];
              if (value.value_ || temp == value) {
                // 自动选择当前选项
                this.getField('CONSTANT').setValue(currentOptions[Index][0]); // 设置为当前选项
              }

            } else {
              currentOptions.unshift(constantDropdownOptions[0]);
            }
          },
          deleteNewConstant: function (Index) {
            // 获取下拉框的所有选项
            const currentOptions = this.getField('CONSTANT').getOptions();
            // 获取当前下拉框的值
            const currentValue = this.getField('CONSTANT').getValue();
            const index = currentOptions.findIndex(option => option[0] === currentValue);
            currentOptions.splice(Index, 1);
            if (index == Index) {
              this.dispose(true);
            }
          },
          saveExtraState: function () {
            return {
              'constantBlock': this.constantBlock,
            };
          },
          loadExtraState: function (state) {
            this.constantBlock = state['constantBlock'];
            if (this.constantBlock) {
              this.getField('CONSTANT').setValidator((newValue) => {
                const options = this.getField('CONSTANT').getOptions();
                const index = options.findIndex(option => option[0] === this.getField('CONSTANT').getValue()); // 通过比较选项的第一个元素获取索引

                if (newValue == 'Fn:重命名此变量') {
                  EventBus.$emit('showConstantEditor', '重命名此变量', index);
                  return this.getField('CONSTANT')
                } else if (newValue == 'Fn:删除此变量') {
                  EventBus.$emit('deleteConstant', index);
                  return this.getField('CONSTANT')
                }
                return newValue; // 返回新值以更新显示
              });
            }
          },
        };

        // 注册变量改变块类型
        const blockType_change = 'constantBlock_change'; // 为每个块生成一个唯一的类型名称
        Blockly.Blocks[blockType_change] = blockDefinition_change;

        // 创建变量改变块
        const constantBlock_change = {
          kind: 'block',
          type: blockType_change, // 使用唯一的块类型
        };
        // **调用变量块**：将调用已有的变量，显示为下拉框
        const blockDefinition_call = {
          init: function () {
            // 添加变量调用选项
            let constantDropdownOptions = this.getConstant(that.advancedBlockStore.constantBlock);
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            this.constantBlock = that.advancedBlockStore.constantBlock;
            // 创建输入框，并设置它们在同一行
            this.appendDummyInput()
              .appendField("变量")
              .appendField(this.dropdownField, "CONSTANT");
            this.setOutput(true, null); // 设置输出类型为 null，表示可以连接任何类型的块
            this.setColour('#4FD284'); // 设置块的颜色
            this.setTooltip('调用已定义的变量');
            this.setHelpUrl('');
          },

          getConstant: function (constantBlock) {
            let constantDropdownOptions = [];
            for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
              constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
            }
            return constantDropdownOptions;
          },

          addConstant: function (constantInput, dropdownField) {
            constantInput.appendField(dropdownField, "CONSTANT");
          },
          addNewConstant: function (currentOptions, constantDropdownOptions, Index, value) {
            if (Index != undefined) {
              let temp = currentOptions[Index][0];
              currentOptions[Index][0] = constantDropdownOptions[Index][0];
              currentOptions[Index][1] = constantDropdownOptions[Index][1];
              if (value.value_ || temp == value) {
                this.getField('CONSTANT').setValue(currentOptions[Index][0]); // 设置为当前选项
              }

            } else {
              currentOptions.unshift(constantDropdownOptions[0]);
            }
          },
          deleteNewConstant: function (Index) {
            // 获取下拉框的所有选项
            const currentOptions = this.getField('CONSTANT').getOptions();
            // 获取当前下拉框的值
            const currentValue = this.getField('CONSTANT').getValue();
            const index = currentOptions.findIndex(option => option[0] === currentValue);
            currentOptions.splice(Index, 1);
            if (index == Index) {
              this.dispose(true);
            }
          },
          saveExtraState: function () {
            return {
              'constantBlock': this.constantBlock,
            };
          },

          loadExtraState: function (state) {
            this.constantBlock = state['constantBlock'];
            if (this.constantBlock) {
              this.getField('CONSTANT').setValidator((newValue) => {
                const options = this.getField('CONSTANT').getOptions();
                const index = options.findIndex(option => option[0] === this.getField('CONSTANT').getValue()); // 获取选项的索引
                if (newValue == 'Fn:重命名此变量') {
                  EventBus.$emit('showConstantEditor', '重命名此变量', index);
                  return this.getField('CONSTANT');
                } else if (newValue == 'Fn:删除此变量') {
                  EventBus.$emit('deleteConstant', index);
                  return this.getField('CONSTANT');
                }
                return newValue;
              });
            }
          },
        };

        // 注册调用变量块类型
        const blockType_call = 'constantBlock_call'; // 为每个块生成一个唯一的类型名称
        Blockly.Blocks[blockType_call] = blockDefinition_call;

        // 创建调用变量块
        const constantBlock_call = {
          kind: 'block',
          type: blockType_call, // 使用唯一的块类型
        };
        // 将生成的变量相关块加入到数组
        constantBlockArry.push(constantBlock);
        constantBlockArry.push(assignBlock);
        constantBlockArry.push(constantBlock_call);
        constantBlockArry.push(constantBlock_change);
      }

      return constantBlockArry;
    },
    //初始化数组块
    initArray() {
      let arrayBlockArry = [
        { kind: "label", text: "数组" },
        { kind: "button", text: "点击创建新数组", callbackKey: "createAdvancedToolbox" },
      ];

      if (this.advancedBlockStore.arrayBlock.length > 2) {
        arrayBlockArry.push({
          kind: "label",
          text: "我的数组"
        });

        const that = this;
        // 定义数字数组
        const blockDefinition_double = {
          init: function () {
            this.appendDummyInput('constant')
              .appendField("将");

            this.numberCount = 0; // 初始化计数器

            const constantInput = this.getInput('constant');
            let constantDropdownOptions

            constantDropdownOptions = this.getConstant(that.advancedBlockStore.arrayBlock);
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            this.addConstant(constantInput, this.dropdownField);

            this.arrayBlock = that.advancedBlockStore.arrayBlock;
            for (let i = 0; i < 3; i++) {
              const fieldName = "NUMBER_" + i;
              this.getInput('constant').appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), fieldName);
            }
            // 添加点击事件
            this.appendDummyInput()
              .appendField(new Blockly.FieldImage(
                "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E6%95%B0%E7%BB%84%E5%A2%9E%E5%8A%A0.svg",
                30, 30, "*", false), 'ADD_IMAGE')
              .appendField(new Blockly.FieldImage(
                "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E6%95%B0%E7%BB%84%E5%87%8F%E5%B0%91.svg",
                30, 30, "*", false), 'RE_IMAGE');

            const imageFieldADD = this.getField('ADD_IMAGE');
            const imageFieldRE = this.getField('RE_IMAGE');

            if (imageFieldADD) {
              imageFieldADD.setOnClickHandler(() => this.onClickHandlerADD());
            }
            if (imageFieldRE) {
              imageFieldRE.setOnClickHandler(() => this.onClickHandlerRE());
            }

            this.setPreviousStatement(true, XTaskCheckTypes); // 允许前面有代码块连接
            this.setNextStatement(true, XTaskCheckTypes);     // 允许后面有代码块连接
            this.setColour('#4FD284');
            this.setTooltip("");
            this.setHelpUrl("");
          },
          getConstant: function (constantBlock) {
            let constantDropdownOptions = []
            for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
              constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
            }
            return constantDropdownOptions;
          },
          addConstant: function (constantInput, dropdownField) {
            constantInput.appendField(dropdownField, "CONSTANT");
            constantInput.appendField("设为浮点数数组");
          },
          addNewConstant: function (currentOptions, constantDropdownOptions, Index, value) {
            if (Index != undefined) {
              let temp = currentOptions[Index][0]
              currentOptions[Index][0] = constantDropdownOptions[Index][0];
              currentOptions[Index][1] = constantDropdownOptions[Index][1];
              if (value.value_ || temp == value) {
                this.getField('CONSTANT').setValue(constantDropdownOptions[Index][0]); // 设置为当前选项
              }
            } else {
              currentOptions.unshift(constantDropdownOptions[0]);
            }
          },
          deleteNewConstant: function (Index) {
            // 获取下拉框的所有选项
            const currentOptions = this.getField('CONSTANT').getOptions();
            // 获取当前下拉框的值
            const currentValue = this.getField('CONSTANT').getValue();
            const index = currentOptions.findIndex(option => option[0] === currentValue);
            currentOptions.splice(Index, 1);
            if (index == Index) {
              this.dispose(true);
            }
          },
          // 增加数组数据
          onClickHandlerADD: function () {
            if (this.numberCount <= 10) {
              const constant = this.getInput('constant');
              const fieldName = "NUMBER_" + this.numberCount; // 生成唯一字段名称
              constant.appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), fieldName);
              this.numberCount++; // 更新计数器
            } else {
              that.$message({
                message: '参数超过最大限制10',
                type: 'warning'
              });
              return;
            }

          },

          // 删除数组数据
          onClickHandlerRE: function () {
            if (this.numberCount == 1) {
              this.dispose(true);
            }
            const constant = this.getInput('constant');
            if (this.numberCount > 0) {
              const fieldName = "NUMBER_" + (this.numberCount - 1); // 获取最后一个字段的名称
              if (this.getField(fieldName)) {
                constant.removeField(fieldName, true); // 移除输入字段
                this.numberCount--; // 更新计数器
              }
            }
          },

          saveExtraState: function () {
            return {
              'itemCount': this.numberCount,
              'arrayBlock': this.arrayBlock,
            };
          },
          loadExtraState: function (state) {
            this.numberCount = state['itemCount'];
            this.arrayBlock = state['arrayBlock'];
            if (this.arrayBlock) {
              if (!this.getField('CONSTANT')) {
                // // 添加变量选项
                let constantDropdownOptions = this.getConstant(this.arrayBlock);
                let dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
                this.addConstant(this.getInput('constant'), dropdownField);
              }

              this.getField('CONSTANT').setValidator((newValue) => {
                const options = this.getField('CONSTANT').getOptions();
                const index = options.findIndex(option => option[0] === this.getField('CONSTANT').getValue()); // 通过比较选项的第一个元素获取索引

                if (newValue == 'Fn:重命名此数组') {
                  EventBus.$emit('showArrayEditor', '重命名此浮点数数组', index);
                  return this.getField('CONSTANT')
                } else if (newValue == 'Fn:删除此数组') {
                  EventBus.$emit('deleteArray', index);
                  return this.getField('CONSTANT')
                }

                return newValue; // 返回新值以更新显示
              });
            }

            if (this.numberCount > 0) {
              for (let i = 0; i < 3; i++) {
                const fieldName = "NUMBER_" + i;
                this.getInput('constant').removeField(fieldName, true);
              }
              for (let i = 0; i < this.numberCount; i++) {
                const fieldName = "NUMBER_" + i;
                this.getInput('constant').appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0.000000001), fieldName);
              }
            } else {
              this.numberCount = 3
            }
          },
        };

        // 注册数字数组块类型
        const blockType_double = 'arrayBlock_double'; // 为每个块生成一个唯一的类型名称
        Blockly.Blocks[blockType_double] = blockDefinition_double;

        // 创建数字数组块
        const constantBlock_double = {
          kind: 'block',
          type: blockType_double, // 使用唯一的块类型
        };

        // 定义数字数组
        const blockDefinition_string = {
          init: function () {
            this.appendDummyInput('constant')
              .appendField("将");

            this.numberCount = 0; // 初始化计数器

            const constantInput = this.getInput('constant');
            let constantDropdownOptions

            constantDropdownOptions = this.getConstant(that.advancedBlockStore.arrayBlock);
            this.dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
            this.addConstant(constantInput, this.dropdownField);

            this.arrayBlock = that.advancedBlockStore.arrayBlock;
            const labels = ['a', 'b', 'c'];
            for (let i = 0; i < 3; i++) {
              const fieldName = "STRING_" + i;
              this.getInput('constant').appendField(new Blockly.FieldTextInput(labels[i]), fieldName);
            }
            // 添加点击事件
            this.appendDummyInput()
              .appendField(new Blockly.FieldImage(
                "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E6%95%B0%E7%BB%84%E5%A2%9E%E5%8A%A0.svg",
                30, 30, "*", false), 'ADD_IMAGE')
              .appendField(new Blockly.FieldImage(
                "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code/img/%E6%95%B0%E7%BB%84%E5%87%8F%E5%B0%91.svg",
                30, 30, "*", false), 'RE_IMAGE');

            const imageFieldADD = this.getField('ADD_IMAGE');
            const imageFieldRE = this.getField('RE_IMAGE');

            if (imageFieldADD) {
              imageFieldADD.setOnClickHandler(() => this.onClickHandlerADD());
            }
            if (imageFieldRE) {
              imageFieldRE.setOnClickHandler(() => this.onClickHandlerRE());
            }

            this.setPreviousStatement(true, XTaskCheckTypes); // 允许前面有代码块连接
            this.setNextStatement(true, XTaskCheckTypes);     // 允许后面有代码块连接
            this.setColour('#4FD284');
            this.setTooltip("");
            this.setHelpUrl("");
          },
          getConstant: function (constantBlock) {
            let constantDropdownOptions = []
            for (let constantIndex = 0; constantIndex < constantBlock.length; constantIndex++) {
              constantDropdownOptions.push([constantBlock[constantIndex], constantBlock[constantIndex]]);
            }
            return constantDropdownOptions;
          },
          addConstant: function (constantInput, dropdownField) {
            constantInput.appendField(dropdownField, "CONSTANT");
            constantInput.appendField("设为字符串数组");
          },
          addNewConstant: function (currentOptions, constantDropdownOptions, Index, value) {

            if (Index != undefined) {
              let temp = currentOptions[Index][0]
              currentOptions[Index][0] = constantDropdownOptions[Index][0];
              currentOptions[Index][1] = constantDropdownOptions[Index][1];
              if (value.value_ || temp == value) {
                this.getField('CONSTANT').setValue(currentOptions[Index][0]); // 设置为当前选项
              }
            } else {
              currentOptions.unshift(constantDropdownOptions[0]);
            }
          },
          deleteNewConstant: function (Index) {
            // 获取下拉框的所有选项
            const currentOptions = this.getField('CONSTANT').getOptions();
            // 获取当前下拉框的值
            const currentValue = this.getField('CONSTANT').getValue();
            const index = currentOptions.findIndex(option => option[0] === currentValue);
            currentOptions.splice(Index, 1);
            if (index == Index) {
              this.dispose(true);
            }
          },
          // 增加数组数据
          onClickHandlerADD: function () {
            if (this.numberCount <= 10) {
              const constant = this.getInput('constant');
              const fieldName = "STRING_" + this.numberCount; // 生成唯一字段名称
              constant.appendField(new Blockly.FieldTextInput(""), fieldName);
              this.numberCount++; // 更新计数器
            } else {
              that.$message({
                message: '参数超过最大限制10',
                type: 'warning'
              });
              return;
            }

          },
          // 删除数组数据
          onClickHandlerRE: function () {
            if (this.numberCount == 1) {
              this.dispose(true);
            }
            const constant = this.getInput('constant');
            if (this.numberCount > 0) {
              const fieldName = "STRING_" + (this.numberCount - 1); // 获取最后一个字段的名称
              if (this.getField(fieldName)) {
                constant.removeField(fieldName, true); // 移除输入字段
                this.numberCount--; // 更新计数器
              }
            }
          },

          saveExtraState: function () {
            return {
              'itemCount': this.numberCount,
              'arrayBlock': this.arrayBlock,
            };
          },
          loadExtraState: function (state) {
            this.numberCount = state['itemCount'];
            this.arrayBlock = state['arrayBlock'];

            if (this.arrayBlock) {
              if (!this.getField('CONSTANT')) {
                // // 添加变量选项
                let constantDropdownOptions = this.getConstant(this.arrayBlock);
                let dropdownField = new Blockly.FieldDropdown(constantDropdownOptions);
                this.addConstant(this.getInput('constant'), dropdownField);
              }

              this.getField('CONSTANT').setValidator((newValue) => {
                const options = this.getField('CONSTANT').getOptions();
                const index = options.findIndex(option => option[0] === this.getField('CONSTANT').getValue()); // 通过比较选项的第一个元素获取索引

                if (newValue == 'Fn:重命名此数组') {
                  EventBus.$emit('showArrayEditor', '重命名此浮点数数组', index);
                  return this.getField('CONSTANT')
                } else if (newValue == 'Fn:删除此数组') {
                  EventBus.$emit('deleteArray', index);
                  return this.getField('CONSTANT')
                }

                return newValue; // 返回新值以更新显示
              });
            }

            if (this.numberCount > 0) {
              for (let i = 0; i < 3; i++) {
                const fieldName = "STRING_" + i;
                this.getInput('constant').removeField(fieldName, true);
              }
              for (let i = 0; i < this.numberCount; i++) {
                const fieldName = "STRING_" + i;
                this.getInput('constant').appendField(new Blockly.FieldTextInput(''), fieldName);
              }
            } else {
              this.numberCount = 3
            }
          },
        };

        // 注册数字数组块类型
        const blockType_string = 'arrayBlock_string'; // 为每个块生成一个唯一的类型名称
        Blockly.Blocks[blockType_string] = blockDefinition_string;

        // 创建数字数组块
        const constantBlock_string = {
          kind: 'block',
          type: blockType_string, // 使用唯一的块类型
        };


        arrayBlockArry.push(constantBlock_double);
        arrayBlockArry.push(constantBlock_string);
      }
      return arrayBlockArry;

    },

    //刷新当前工作区里的变量块
    refreshConstant(Index) {
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type == 'constantBlock'|| block.type=='assignBlock'|| block.type == 'constantBlock_change' || block.type == 'constantBlock_call') {
          let constantDropdownOptions = block.getConstant(this.advancedBlockStore.constantBlock);
          const currentOptions = block.dropdownField.getOptions();
          block.addNewConstant(currentOptions, constantDropdownOptions, Index, block.getFieldValue('CONSTANT'));
        }
      });
    },

    //刷新当前工作区里的变量块
    deleteConstant(Index) {
      this.advancedBlockStore.constantBlock.splice(Index, 1);
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type == 'constantBlock'|| block.type=='assignBlock' || block.type == 'constantBlock_change' || block.type == 'constantBlock_call') {
          block.constantBlock = this.advancedBlockStore.constantBlock;
          block.deleteNewConstant(Index);
        }
      });
    },

    //刷新当前工作区里的数组块
    refreshArray(Index) {
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type == 'arrayBlock_double' || block.type == 'arrayBlock_string') {
          block.arrayBlock = this.advancedBlockStore.arrayBlock;
          let arrayDropdownOptions = block.getConstant(this.advancedBlockStore.arrayBlock);
          const currentOptions = block.dropdownField.getOptions();
          block.addNewConstant(currentOptions, arrayDropdownOptions, Index, block.getFieldValue('CONSTANT'));
        }
        if (block.type.startsWith('call_function_')) {
          let arrayDropdownOptions = block.getParam(this.advancedBlockStore.arrayBlock);
          let paramInput = block.getInput('Param');
          let currentOptions
          for (let i = 0; i < paramInput.fieldRow.length; i++) {
            const field = paramInput.fieldRow[i];
            if (field.name == '浮点数数组' || field.name == '字符串数组') {
              currentOptions = field.getOptions();
              block.addNewConstant(currentOptions, arrayDropdownOptions, Index);
            }
          }
        }
      });
    },

    //删除数组块
    deleteArray(Index) {
      this.advancedBlockStore.arrayBlock.splice(Index, 1);
      const allBlocks = this.workspace.getAllBlocks(); // 获取工作区中的所有块
      allBlocks.forEach((block) => {
        // 检查块的类型是否是调用函数块，并且块的函数名是否与被删除的函数匹配
        if (block.type == 'arrayBlock_double' || block.type == 'arrayBlock_string') {
          block.arrayBlock = this.advancedBlockStore.arrayBlock;
          block.deleteNewConstant(Index);
        }
        if (block.type.startsWith('call_function_')) {
          let paramInput = block.getInput('Param');
          // let currentOptions
          for (let i = 0; i < paramInput.fieldRow.length; i++) {
            const field = paramInput.fieldRow[i];
            if (field.name == '浮点数数组' || field.name == '字符串数组') {
              // currentOptions = field.getOptions();
              block.deleteNewConstant(field, Index);
            }
          }
        }
      });
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
  overflow: hidden !important;
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

.loading-container .el-loading-spinner {
  font-size: 40px;
}

/* 左侧toolbox */
.blocklyToolboxDiv {
  /* padding-top: 170px; */
  padding-top: 7%;
  background-color: rgb(218, 227, 234);
  max-height: calc(-50px + 90vh);
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

.blocklyDropDownContent .blocklyDropdownTextLabel {
  color: black !important;
}
</style>
