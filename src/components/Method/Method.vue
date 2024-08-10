<template>
  <div>

  </div>
</template>

<script>

// import * as monaco from "monaco-editor";
import "./method";
export default {
  name: "MethodBlock",
  data() {
    return {
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "功能",
            "categoryStyle": "method_category",
            "cssConfig": {
              "container": "method",
              "icon": "methodIcon"
            },
            "contents": [
              {
                kind: "block",
                type: "string_printf"
              },
              {
                kind: "block",
                type: "number_printf"
              },
              {
                kind: "block",
                type: "string_length"
              },
              {
                kind: "block",
                type: "break"
              },
              {
                kind: "block",
                type: "continue"
              },
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
.method {
  color: #5B67A5;
  font-size: 60px;
}

.methodIcon {
  content: url('../../assets/SVG/方法.svg');
  height: 32px;
}
</style>