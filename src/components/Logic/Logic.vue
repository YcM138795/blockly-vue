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
                "type": "if_judge"
              },
              {
                "kind": "block",
                "type": "if_else"
              },
              {
                "kind": "label",
                "text": "循环"
              },
              {
                "kind": "block",
                "type": "cycle",
              },
              {
                kind: "block",
                type: "break"
              },
              {
                kind: "block",
                type: "continue"
              },
              {
                "kind": "label",
                "text": "比较"
              },
              {
                "kind": "block",
                "type": "compare"
              },
              {
                "kind": "block",
                "type": "compare_input"
              },
              {
                "kind": "block",
                "type": "single_compare"
              },
              {
                "kind": "label",
                "text": "布尔值"
              },
              {
                "kind": "block",
                "type": "true"
              },
              {
                "kind": "block",
                "type": "false"
              },
              {
                "kind": "block",
                "type": "and_or",
              },
              {
                "kind": "block",
                "type": "logical_negation",
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
  color: #FF962E;
  font-size: 75px;
}

.logicIcon {
  /* 在这里定义类别图标的样式 */
  content: url("../../assets/img/逻辑.png");
  height: 32px;
}
</style>