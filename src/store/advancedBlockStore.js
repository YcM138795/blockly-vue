import { defineStore } from 'pinia';

export const useAdvancedBlockStore = defineStore('advancedBlockStore', {
  state: () => ({
    functionBlock: [],
    constantBlock: ["Fn:重命名此常量","Fn:删除此常量"],
    arrayBlock: ["Fn:重命名此数组","Fn:删除此数组"],
    editFunctionBlock: {}
  }),
  actions: {
    ifFunNameExist(funName, oddBlockId) {
      if (oddBlockId) {
        return this.functionBlock.some((item) => item[0] !== oddBlockId && item[1] === funName);
      } else {
        return this.functionBlock.some((item) => item[1] === funName);
      }
    }
  }
});

