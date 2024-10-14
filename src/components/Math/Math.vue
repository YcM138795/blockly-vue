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
                kind: "label",
                text: "数学"
              },
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
                type: "remainder",
              },
              {
                kind: "block",
                type: "math_fun",
              },
              {
                kind: "block",
                type: "random",
              },
              {
                kind: "block",
                type: "operation",
              },
              {
                kind: "block",
                type: "big_small",
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
   

    color: #3BB0FF;
    font-size: 60px;
}
.mathIcon{
  content: url('../../assets/img/数学.png');
  width: 32px;

}
  </style>