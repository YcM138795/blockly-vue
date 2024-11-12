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
            "name": "控制",
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
                type: "forever"
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
                "text": "烧录板灯控制"
              },
              {
                kind: "block",
                type: "XTask_led_task"
              },
              {
                kind: "block",
                type: "init_Led"
              },
              {
                kind: "block",
                type: "Led_on"
              },
              {
                kind: "block",
                type: "Led_off"
              },
              {
                "kind": "label",
                "text": "小车灯控制"
              },
              {
                kind: "block",
                type: "XTask_light_task"
              },
              {
                kind: "block",
                type: "init_Light"
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
                "kind": "label",
                "text": "蜂鸣器控制"
              },
              {
                kind: "block",
                type: "XTask_fmq_task"
              },
              {
                kind: "block",
                type: "init_Fmq"
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
                type: "XTask_servo_task"
              },
              {
                kind: "block",
                type: "init_Servo"
              },
              {
                kind: "block",
                type: "init_Servo_state"
              },
              {
                kind: "block",
                type: "Servo_operation"
              },
              {
                kind: "label",
                text: "电机控制"
              },
              {
                kind: "block",
                type: "XTask_motors_task"
              },
              {
                kind: "block",
                type: "init_Motors"
              },
              {
                kind: "block",
                type: "Motors_move"
              },
              {
                kind: "block",
                type: "Motors_left_right"
              },
              {
                kind: "block",
                type: "Motors_around"
              },
              {
                kind: "block",
                type: "motor_control_single"
              },
              {
                kind: "block",
                type: "stop_motor"
              },
              {
                "kind": "label",
                "text": "陀螺仪控制"
              },
              {
                kind: "block",
                type: "XTask_mpu_task"
              },
              {
                kind: "block",
                type: "judgment_board"
              },
              {
                kind: "label",
                text: "超声波控制"
              },
              {
                kind: "block",
                type: "XTask_ultrasonic_task"
              },
              {
                kind: "block",
                type: "init_Ultrasonic"
              },
              {
                kind: "block",
                type: "Ultrasonic_ranging"
              },
              {
                kind: "block",
                type: "distance"
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
  color: #ff7272;
  font-size: 60px;
}

.xfxCarIcon {
  content: url('../../assets/img/小飞象.png');
  height: 32px;
}
</style>