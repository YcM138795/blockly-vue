<template>
  <div >
   
  </div>
</template>
<script>

import 'blockly';
import "./dominate";
import 'blockly/msg/zh-hans';



export default {
  name: "DominateBlock",
  data() {
    return {
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "函数",
            "categoryStyle": "dominate_category",
            "cssConfig": {
              "container": "dominate",
              "icon": "dominateIcon"
            },
            "contents": [
              {
                kind: "block",

                type: "led_task"
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

                type: "servo_task"
              },
              {
                kind: "block",

                type: "motors_task"
              },
              {
                kind: "block",

                type: "mpu_task"
              },
              {
                kind: "block",

                type: "ultrasonic_task"
              },
              {
                kind: "block",

                type: "ir_task"
              },
            ]
          },
        ],
      },
    };
  },
  mounted() {
    this.$emit('dominateBox', this.toolbox);
  },
};
</script>

<style>
.dominate {
  color: #B463FF;
  font-size: 75px;
}

.dominateIcon {
  /* 在这里定义类别图标的样式 */
  content: url("../../assets/img/方法.png");
  height: 32px;
}
</style>