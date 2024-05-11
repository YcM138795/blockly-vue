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
                kind: "block",

                type: "when_start"
              },
              {
                kind: "block",

                type: "fill"
              },
              {
                kind: "block",
                'icons': {
                  // 'my_icon': 'my_icon',  // 图标状态配置
                },
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
  content: url('../../assets//SVG/加号.svg');
  height: 32px;
}

</style>