<template>
    <div>
  
    </div>
  </template>
  
  <script>
  
  // import * as monaco from "monaco-editor";
  import "./math";
  export default {
    name: "MathBlock",
    data() {
      return {
        toolbox: {
          contents: [
          {
            "kind": "category",
            "name": "数学",
            "cssConfig": {
              "container": "math"
            },
            "contents": [
              {
                kind: "block",
                type: "number_single",
              },
              {
                kind: "block",
                type: "logic_boolean",
              },
              {
                kind: "block",
                type: "number_double",
              },
              {
                kind: "block",
                type: "single_operation",
              },
              {
                kind: "block",
                type: "operation",
              },
              {
                kind: "block",
                type: "remainder",
              },
              {
                kind: "block",
                type: "big_small",
              },
              {
                kind: "block",
                type: "math_fun",
              },
              {
                kind: "block",
                type: "random",
              },
            ]
          },
          ],
        },
      };
    },
    mounted() {
      
            this.$emit('mathBox', this.toolbox);
    },
  };
  </script>
  
  <style>
  .math {
  background-color: rgb(143, 203, 227);
  /* height: 100px; */
}
  </style>