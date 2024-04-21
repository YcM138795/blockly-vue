<template>
  <div id="blockly">
    <!-- 工作区 -->
    <div id="blocklyDiv" ref="blocklyDiv" style="height: 500px; width: 800px;"></div>
    <button style="position: fixed;left: 50px;top: 10px;" @click="block2code">生成代码</button>
    <!-- 代码显示区 -->
    <div style="background-color: lightgrey;width: 800px;text-align: left">
      <pre v-html="code?code:'请点击生成代码按钮'"></pre>
    </div>
    <button style="position: fixed;left: 150px;top: 10px;" @click="runCode">eval执行代码</button>
    <button style="position: fixed;left: 300px;top: 10px;" @click="runCode2">new Function执行代码</button>

  </div>
</template>

<script>
import Blockly from 'blockly'
import {pythonGenerator} from 'blockly/python';


import './demo'
export default {
  name: "Demo_02",
  data() {
    return {
      code:'',
      options: {
        horizontalLayout: true,//工具箱水平
        toolboxPosition: "end",//工具箱在底部
        toolbox: {
          "kind": "flyoutToolbox",
          "contents": [
            {
              "kind": "block",
              "type": "string_length",
            },
          ]
        }
      },
      workspace:null,
    }
  },
  mounted() {
    
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, {
      toolbox:this.options.toolbox,
      move:{
        scrollbars: {
          horizontal: true,
          vertical: true
        },
        drag: true,
        wheel: false}
      });
  },
  methods:{
    /**
     * block代码块转为代码
     */
    block2code(){
      this.code = pythonGenerator.workspaceToCode(this.workspace)
      
    },

    /**
     * 执行生成代码
     */
    runCode(){
      if(!this.code){alert('请先点击生成代码');return}
      eval(this.code)
    },
    runCode2(){
      if(!this.code){alert('请先点击生成代码');return}
    }
  },
}
</script>

<style scoped>
#blockly {
  position: absolute;
  left: 50px;
  top: 50px;
  bottom: 0;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
</style>
