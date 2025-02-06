import { defineStore } from 'pinia';

export const useAdvancedBlockStore = defineStore('advancedBlockStore', {
  state: () => ({
    code:'',
    functionBlock: [],
    constantBlock: ["Fn:重命名此变量", "Fn:删除此变量"],
    arrayBlock: ["Fn:重命名此数组", "Fn:删除此数组"],
  }),
  actions: {
    ifFunNameExist(funName, oddBlockId) {
      if (oddBlockId) {
        return this.functionBlock.some((item) => item[0] !== oddBlockId && item[1] === funName);
      } else {
        return this.functionBlock.some((item) => item[1] === funName);
      }
    },
    refreshFunctionBlock(selectedParams) {
      let id = selectedParams[0];

      let index = this.functionBlock.findIndex(block => block[0] === id);

      if (index !== -1) {
        this.functionBlock[index] = selectedParams;
      } else {
        console.log("没有找到匹配的 id");
      }

    }
  }
});

