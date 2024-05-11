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
            "categoryStyle":"math_category",
            "cssConfig": {
              "container": "math",
              "icon":"mathIcon"
            },
            "contents": [
              {
                kind: "block",
                type: "number_single",
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
   

    color: #5BA580;
    font-size: 60px;
}
.mathIcon{
  content: url('../../assets//SVG//计算器.svg');
  width: 32px;

}
  </style>