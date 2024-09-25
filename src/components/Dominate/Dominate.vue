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
            "name": "操作函数",
            "categoryStyle": "dominate_category",
            "cssConfig": {
              "container": "dominate",
              "icon": "dominateIcon"
            },
            "contents": [
              // {
              //   kind: "block",

              //   type: "create_function_button"
              // },
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

                type: "ultrasonic_task"
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
  color: #4e72b8;
  font-size: 75px;
}

.dominateIcon {
  /* 在这里定义类别图标的样式 */
  content: url("../../assets/SVG/函数.svg");
  height: 32px;
}
</style>