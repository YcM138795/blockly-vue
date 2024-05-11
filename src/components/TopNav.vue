<template>
    <div class="TopNav">
        <div class="left">
            <button class="returnButton" title="返回" @click="returnAction"></button>
        </div>
        <div class="center">
            <img src="../assets/SVG/积木代码编程.svg" alt="">
            <span style="font-family: '阿里妈妈刀隶体 Regular', sans-serif;">积木代码编程</span>
        </div>
        <div class="right">
            <button class="saveButton" title="保存" @click="saveAction"></button>
            <button class="tipButton" title="提示" @click="tipAction"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopNav',
    data() {
        return {

        }
    },
    methods: {
        returnAction() {
            alert('返回')
        },
        saveAction(){

        },
        tipAction(){
            
        }
    }
}
</script>

<style>
/* 在组件样式中引入字体样式 */
@font-face {
    font-family: "阿里妈妈刀隶体 Regular";
    font-weight: 400;
    src: url("//at.alicdn.com/wf/webfont/GqAELnvwJVzD/m2qiLjm75WAB.woff2") format("woff2"),
        url("//at.alicdn.com/wf/webfont/GqAELnvwJVzD/ZegfFY54CT2D.woff") format("woff");
    font-display: swap;
}

.TopNav {
    display: flex;
    justify-content: space-between;
    /* 让子元素平均分布在父容器内 */
    background-color: azure;
    /* background-color: rgb(185, 240, 222); */
}

.left {
    text-align: left;
}

.right {
    text-align: right;
}

.left,
.center,
.right {
    height: 60px;
    flex: 1;
}

.center {
    background-color: azure;
    display: flex;
    justify-content: center;
    text-align: center;
}

.center img {
    height: 60px;
    width: auto;
}

.center span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    /* margin-top: 20px; */
}



/* 左侧返回按钮样式 */
.left .returnButton {
    background-color:rgb(237, 246, 246);
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 10px;
    background-image: url('../assets/SVG/返回列表.svg');
    background-repeat: no-repeat;
    background-size: contain;
    /* 图片大小适应按钮 */
    background-position: center;
    /* 图片居中 */
    cursor: pointer;
    transition: background-color 0.5s;
    /* 添加过渡效果 */
}

.left .returnButton:hover {
    background-color: #4cb5ea;
    /* 鼠标悬停时改变背景色 */
}

.left .returnButton:active {
    transform: translateY(2px);
    /* 按下按钮时向下移动 1px */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}


/* 右侧保存按钮样式 */
.right .saveButton {
    margin: 0 50px;
    background-color: rgb(188, 28, 42);
    /* background-color: rgb(185, 240, 222); */
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 50%;
    background-image: url('../assets/SVG/save.svg');
    background-repeat: no-repeat;
    background-size: contain;
    /* 图片大小适应按钮 */
    background-position: center;
    /* 图片居中 */
    cursor: pointer;
    transition: background-color 0.5s;
    /* 添加过渡效果 */
}

.right .saveButton:hover {
    /* background-color: #4cb5ea; 鼠标悬停时改变背景色 */
    transform: scale(1.05);
    /* 微微放大 */
    filter: brightness(110%);
    /* 背景颜色稍稍变深 */
}

.right .saveButton:active {
    transform: translateY(1px);
    /* 按下按钮时向下移动 1px */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}

/* 右侧提示按钮样式 */
.right .tipButton {
    margin-right: 80px;
    background-color: rgb(185, 240, 222);
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 50%;
    background-image: url('../assets/SVG/灯泡.svg');
    background-repeat: no-repeat;
    background-size: contain;
    /* 图片大小适应按钮 */
    background-position: center;
    /* 图片居中 */
    cursor: pointer;
    transition: background-color 0.5s;
    /* 添加过渡效果 */
}

.right .tipButton:hover {
    /* background-color: #4cb5ea; 鼠标悬停时改变背景色 */
    transform: scale(1.05);
    /* 微微放大 */
    filter: brightness(110%);
    /* 背景颜色稍稍变深 */
}

.right .tipButton:active {
    transform: translateY(1px);
    /* 按下按钮时向下移动 1px */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}
</style>