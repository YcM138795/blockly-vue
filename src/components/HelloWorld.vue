<template>
    <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
</template>

<script setup>
import * as Blockly from 'blockly/core';
import { onMounted } from 'vue';
import './special'
import './stock'

const toolbox ={
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Control",
      "contents": [
        {
          "kind": "block",
          "type": "string_printf"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Logic",
      "contents": [
        {
          "kind": "block",
          "type": "number_printf"
        },
        {
          "kind": "block",
          "type": "string_length"
        },
      ]
    }
  ]
}
// const toolbox ={
//   "kind": "categoryToolbox",
//   "contents": [
//     {
//       "kind": "category",
//       "name": "Control",
//       "contents": [
//         {
//           "kind": "block",
//           "type": "stock_buy_simple"
//         },
//       ]
//     },
//     {
//       "kind": "category",
//       "name": "Logic",
//       "contents": [
//         {
//           "kind": "block",
//           "type": "stock_buy_prog"
//         },
//         {
//           "kind": "block",
//           "type": "stock_fetch_price"
//         },
//       ]
//     }
//   ]
// }
// The toolbox gets passed to the configuration struct during injection.
onMounted(() => {
  Blockly.inject('blocklyDiv', {toolbox: toolbox});

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
