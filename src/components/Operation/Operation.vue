<template>
  <div>

  </div>
</template>

<script>

// import * as monaco from "monaco-editor";
import "./operation";
export default {
  name: "OperationBlock",
  data() {
    return {
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "操作",
            "categoryStyle": "operation_category",
            "cssConfig": {
              "container": "operation",
              "icon": "operationIcon"
            },
            "contents": [
              {
                kind: "label",
                text: "输出"
              },
              {
                kind: "block",
                type: "string_printf"
              },
              {
                kind: "block",
                type: "number_printf"
              },
              {
                kind: "label",
                text: "输入"
              },
              {
                kind: "block",
                type: "when_button_dowm"
              },
              {
                kind: "block",
                type: "cheak_button_dowm"
              },
              {
                kind: "label",
                text: "函数跳出"
              },
              {
                kind: "block",
                type: "break"
              },
              {
                kind: "block",
                type: "continue"
              },
              {
                kind: "label",
                text: "常量操作"
              },
              {
                kind: "block",
                type: "number_variable"
              },
              {
                kind: "block",
                type: "Decrease"
              },
              // {
              //   kind: "block",
              //   type: "function_definition"
              // },
              // {
              //   kind: "block",
              //   type: "create_function_button"
              // },
            ]
          },
        ],
      },
    };
  },
  mounted() {
    this.$emit('methodBox', this.toolbox);
  },
};
</script>

<style>
.operation {
  color: #5B67A5;
  font-size: 60px;
}

.operationIcon {
  content: url('../../assets/SVG/方法.svg');
  height: 32px;
}
</style>