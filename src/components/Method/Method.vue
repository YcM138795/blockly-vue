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
            "name": "方法",
            "contents": [
              {
                kind: "block",
                type: "string_length"
              },
              {
                kind: "block",
                type: "close_led"
              },
              {
                kind: "block",
                type: "open_led"
              },
              {
                kind: "block",
                type: "direction"
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
  
  </style>