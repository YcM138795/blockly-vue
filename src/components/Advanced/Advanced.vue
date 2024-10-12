<template>
    <div ref="advanced">
        <FunctionBlock @functionBox="functionBox"></FunctionBlock>
    </div>
</template>


<script>
import FunctionBlock from '../Advanced/functionDefined/Function.vue';


export default {
    name: "AdvancedBlock",
    data() {
        return {
            functionToolbox: null,
            mergedToolbox: null,
        };
    },
    //引用的组件
    components: {
        FunctionBlock,
    },
    methods: {
        addToolbox() {
            // 合并子组件的工具箱与主组件的工具箱
            this.mergedToolbox = {
                contents: [{
                    kind: "category",
                    name: "高级",
                    "categoryStyle": "advanced_category",
                    "cssConfig": {
                        "container": "advanced",
                    },
                    contents: [
                        // 子组件的工具箱内容
                        ...this.functionToolbox.contents,
                    ]
                }]

            };
        },
        // 接收子组件传递的工具箱并存储
        functionBox(functionBox) {
            this.functionToolbox = functionBox
        },
    },
    mounted() {
        this.addToolbox();
        this.$emit('advancedBlock', this.mergedToolbox);


    },

};

</script>

<style>
.advanced {
    /* color: rgb(228, 228, 228); */
    font-size: 60px;
    border-radius: 13px;
    /* width: 5vw !important; */
    /* width: 1px; */
}
</style>