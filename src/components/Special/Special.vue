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
                text: "特殊"
              },
              {
                kind: "block",

                type: "light_task"
              },
              {
                kind: "block",

                type: "fmq_task"
              },
              {
                kind: "block",

                type: "motors_task"
              },
              {
                kind: "block",

                type: "ultrasonic_task"
              },
              {
                kind: "block",

                type: "test_field_bitmap"
              },
              {
                kind: "block",

                type: "string"
              },
              {
                kind: "block",

                type: "number_variable"
              },
              {
                kind: "block",

                type: "Decrease"
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
  content: url(../../assets/SVG/加号.svg);
  height: 32px;
}
  </style>