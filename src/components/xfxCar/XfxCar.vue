<template>
    <div>
  
    </div>
  </template>
  
  <script>
  
  // import * as monaco from "monaco-editor";
  import "./xfxCar";
  export default {
    name: "XfxCarBlock",
    data() {
      return {
        toolbox: {
          contents: [
            {
              "kind": "category",
              "name": "小飞象智能车",
              "categoryStyle": "xfxCar_category",
              "cssConfig": {
                "container": "xfxCar",
                "icon": "xfxCarIcon"
              },
              "contents": [
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
                  type: "steering_gear180"
                },
                {
                  kind: "block",
                  type: "steering_gear270"
                },
                {
                  kind: "block",
                  type: "steering_gear360"
                },
                {
                  kind: "block",
                  type: "motor_single"
                },
                {
                  kind: "block",
                  type: "motor_double"
                },
                {
                  kind: "block",
                  type: "stop_all_motor"
                },
              ]
            },
          ],
        },
      };
    },
    mounted() {
      this.$emit('xfxCarBlock', this.toolbox);
    },
  };
  </script>
  
  <style>
  .xfxCar {
    color: #e0ba84;
    font-size: 60px;
  }
  
  .xfxCarIcon {
    content: url('../../assets/SVG/小车.svg');
    height: 32px;
  }
  </style>