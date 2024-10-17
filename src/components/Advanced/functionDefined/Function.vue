<template>
  <div>

  </div>
</template>

<script>

// import * as monaco from "monaco-editor";
import "./function";
export default {
  name: "FunctionBlock",
  // inject: ['workspace'], // 从父组件获取 workspace
  data() {
    return {
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "函数",
            "custom": "DYNAMIC_FUNCTION_CATEGORY", // 动态类别
            "categoryStyle": "function_category",
            "cssConfig": {
              "container": "function",
              "icon": "functionIcon"
            },
            "contents": [
              {
                kind: "label",
                text: "函数"
              },
              {
                kind: "button",
                text: "点击创建新函数",
                callbackKey: "createFunctionCallback"  // 关键：添加callbackKey
              },
            ]
          },
        ],
      },
    };
  },
  mounted() {
    this.$emit('functionBox', this.toolbox);

  },
};
</script>

<style>

</style>