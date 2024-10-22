<template>
    <div></div>
</template>

<script>
export default {
    name: "AdvancedBlock",
    data() {
        return {
            toolbox: {
                contents: [
                    {
                        "kind": "category",
                        "name": "基础",
                        "custom": "DYNAMIC_FUNCTION_CATEGORY", // 动态类别
                        "categoryStyle": "advanced_category",
                        "cssConfig": {
                            "container": "advanced",
                            "icon": "advancedIcon"
                        },
                        "contents": [
                            {
                                kind: "label",
                                text: "函数"
                            },
                            {
                                kind: "button",
                                text: "点击创建新函数",
                                callbackKey: "createAdvancedToolbox"  // 关键：添加callbackKey
                            },
                            {
                                kind: "label",
                                text: "常量"
                            },
                            {
                                kind: "button",
                                text: "点击创建新常量",
                                callbackKey: "createAdvancedToolbox"  // 关键：添加callbackKey
                            },
                            {
                                kind: "label",
                                text: "数组"
                            },
                            {
                                kind: "button",
                                text: "点击创建新数组",
                                callbackKey: "createAdvancedToolbox"  // 关键：添加callbackKey
                            }, 
                            {
                                kind: "label",
                                text: "文本"
                            },
                            {
                                kind: "block",
                                type: "string"
                            },
                            {
                                kind: "block",
                                type: "string_length"
                            },

                        ]
                    },
                ],
            },
        };
    },
    mounted() {
        this.$emit('advancedBlock', this.toolbox);
    },

};

</script>

<style>
.advanced {
    color: #B4D599;
    font-size: 75px;
}

.advancedIcon {
    content: url('../../assets/SVG/编辑函数.svg');
    height: 32px;
}

/* 为 Blockly 按钮定义样式 */
.blocklyFlyoutButton {
    fill: #a5d599;
    cursor: pointer;
    /* 鼠标悬停时变为手型 */
}
</style>