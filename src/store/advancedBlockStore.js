import { defineStore } from 'pinia';

export const useAdvancedBlockStore = defineStore('advancedBlockStore', {
  state: () => ({
    functionBlock: [],
    constantBlock: [],
    arrayBlock: [],
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

