<template>
  <div>

  </div>
</template>

<script>

import 'blockly';
import "./logic";
import 'blockly/msg/zh-hans';
// import '@blockly/block-plus-minus';


export default {
  name: "LogicBlock",
  data() {
    return {
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "逻辑",
            "categoryStyle": "logic_category",
            "cssConfig": {
              "container": "logic",
              "icon": "logicIcon"
            },
            "contents": [
              {
                "kind": "label",
                "text": "条件"
              },
              {
                "kind": "block",
                "type": "controls_if"
              },
              {
                "kind": "block",
                "type": "cycle",
              },
              {
                "kind": "block",
                "type": "compare"
              },
              {
                "kind": "block",
                "type": "single_compare"
              },
              {
                "kind": "block",
                "type": "and_or",
              },

              {
                "kind": "block",
                "type": "or_judge",
              },
              {
                "kind": "block",
                "type": "and_judge",
              },
            ]
          },
        ],
      },
    };
  },
  mounted() {
    this.$emit('logicBox', this.toolbox);
  },
};
</script>

<style>
.logic {
  color: #5B80A5;
  font-size: 75px;
}

.logicIcon {
  /* 在这里定义类别图标的样式 */
  content: url("../../assets/SVG/逻辑.svg");
  height: 42px;
}
</style>