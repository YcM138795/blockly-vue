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
                "kind": "label",
                "text": "基础"
              },
              {
                kind: "block",
                type: "init_board"
              },
              {
                kind: "block",
                type: "init_Light"
              },
              {
                kind: "block",
                type: "init_Fmq"
              },
              {
                kind: "block",
                type: "implement"
              },
              {
                kind: "block",
                type: "delay"
              },
              {
                "kind": "label",
                "text": "灯控制"
              },
              {
                kind: "block",
                type: "Light_on"
              },
              {
                kind: "block",
                type: "Light_off"
              },
              {
                kind: "block",
                type: "Fmq_control"
              },

              {
                "kind": "label",
                "text": "舵机控制"
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
                kind: "label",
                text: "电机控制"
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
              {
                kind: "label",
                text: "运动控制"
              },
              {
                kind: "block",
                type: "left"
              },
              {
                kind: "block",
                type: "right"
              },
              {
                kind: "block",
                type: "go"
              },
              {
                kind: "block",
                type: "back"
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