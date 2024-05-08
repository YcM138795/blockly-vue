<template>
    <div>
  
    </div>
  </template>
  
  <script>
  
  // import * as monaco from "monaco-editor";
  import "./special";
  export default {
    name: "SpecialBlock",
    data() {
      return {
        toolbox: {
          contents: [
          {
            "kind": "category",
            "name": "特殊",
            "contents": [
              {
                kind: "block",

                type: "when_start"
              },
              {
                kind: "block",

                type: "fill"
              },
              {
                kind: "block",
                'icons': {
                  // 'my_icon': 'my_icon',  // 图标状态配置
                },
                type: "bracket"
              },
            ]
          },
          ],
        },
      };
    },
    mounted() {
      
            this.$emit('specialBox', this.toolbox);
    },
  };
  </script>
  
  <style>
  
  </style>