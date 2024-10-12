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
            "categoryStyle": "special_category",
            "cssConfig": {
              "container": "special",
              "icon": "specialIcon",
            },
            "contents": [
              {
                kind: "label",
                text: "字符"
              },
              {
                kind: "block",

                type: "string"
              },
              {
                kind: "block",

                type: "string_length"
              },
              {
                kind: "label",
                text: "图像显示"
              },
              {
                kind: "block",

                type: "test_field_bitmap"
              },
              {
                kind: "label",
                text: "括号"
              },
              {
                kind: "block",
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
.special {
  color: #5BA5A5;
  font-size: 60px;

}

.specialIcon {
  content: url('../../assets/img/特殊.png');
  height: 32px;
}
  </style>