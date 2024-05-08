<template>
  <div>

  </div>
</template>

<script>

// import * as monaco from "monaco-editor";
import "./logic";
export default {
  name: "LogicBlock",
  data() {
    return {
      toolbox: {
        contents: [
          {
            "kind": "category",
            "name": "逻辑",
            "contents": [
              {
                "kind": "block",
                "type": "cycle"
              },
              {
                "kind": "block",
                "type": "compare"
              }
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

</style>