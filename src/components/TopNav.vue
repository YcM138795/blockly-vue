<template>
    <div>
        <div class="first-floor">
            <div class="TopNav">
            <div class="left">
                <img src="../assets/img/logo.png" alt="logo" class="logo"> 
            </div>
            <div class="center">
                <div class="custom-select-container">
                    <div class="custom-select-box" @click.stop="toggleDropdown">
                        <img :src="selectedIcon" alt="Selected Icon" class="option-icon">
                        <span style="font-size: 14px;">{{ selectedText }}</span>
                        <i class="arrow-down"></i> <!-- 箭头图标 -->
                    </div>
                    <ul v-if="dropdownVisible" class="custom-options" ref="dropdown">
                        <li v-if="selected==2" @click="selectOption('积木模式', 1)" class="custom-option">
                        <img src="../assets/img/block.png" alt="Icon1" class="option-icon"> 
                        <div style="font-size: 14px;margin-left: 24px;">积木模式</div>
                        </li>
                        <li v-else-if="selected==1" @click="selectOption('代码模式', 2)" class="custom-option">
                        <img src="../assets/img/shape.png" alt="Icon2" class="option-icon"> 
                        <div style="font-size: 14px;margin-left: 24px;">代码模式</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right">
                    <!-- <div class="button" @click="tipAction">
                <img src="../assets/img/prompt.png" alt="Prompt" style="padding-right: 5px;">提示
                    </div> -->
                <div style="display:flex; flex-direction: row;flex: 1;">
                    <div class="button" @click="clearAction">
                        <img src="../assets/img/reset.png" alt="Reset" style="padding-right: 5px; ">清空
                    </div>
                    <div class="button" @click="dowmloadAction">
                        <img src="../assets/img/download.png" alt="Download" style="padding-right: 5px; "> 云编译
                    </div>
                    <div class="button" @click="saveAction">
                        <img src="../assets/img/save.png" alt="Save" style="padding-right: 5px; ">保存
                    </div>
                </div>
                <div class="avatar">
                    <el-dropdown trigger="click">
                    <div class="avatar-wrapper">
                        <el-avatar  :src="store.getters.avatar"></el-avatar>
                    </div>
                    <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
                        <el-dropdown-item divided @click.native="logout">
                            <span>退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- <button class="runButton" title="运行" @click="runAction"></button> -->
                <!-- <button class="recompileButton" @click="recompileAction" title="点击重新编译"></button>
                <button class="dowmloadButton" title="云下载" @click="dowmloadAction" v-loading="loading"
                    element-loading-text="代码编译中" element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(240,255,255, 0.7)"></button>
                <button class="saveButton" title="保存" @click="saveAction"></button>
                <button class="tipButton" title="提示" @click="tipAction"></button>
                <button class="clearButton" title="清空所有块" @click="clearAction"></button> -->
            </div>
            </div>
        </div>
        <div class="second-floor">
            <div class="view">
            <div :style="{ display: viewShow == 'workbench' ? 'block' : 'none' }" class="workbench"> 
                <div class="workbench-image">
                    任务点检测
                </div>
                <!-- <div class="history-files">
                    <div class="history-file" v-for="(history_file, index) in history_files" :key="index" @click="selectFile(index)">
                        <img :src="history_file.picture"/>
                        <div>
                            <div>
                                {{ history_file.title }}
                            </div>
                        {{ history_file.detail }}
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- <div class="tip" :style="{ display: viewShow == 'tip' ? 'block' : 'none' }">

                <h3>提示</h3>
                <span>(再次点击提示收起)</span>
                <br>
                <span>通过拖动积木并拼装可以实现在线的代码生成,<br>得到符合你逻辑的代码:</span>
                <br><br><br>
                <span>例1:通过三重判断验证3与2的关系,输出较大的数<br></span>
                <button @click="exampleOne">例1</button>
                <img class="exampleOne" :style="{ display: oneShow ? 'block' : 'none' }"
                    src="../assets/img/exampleOne.png" alt="">
                <br><br><br><br><br><br>

                <span>例2:筛选出长度大于4的字符串,并将其输出同等的次数<br></span>
                <button @click="exampleTwo">例2</button>
                <img class="exampleTwo" :style="{ display: twoShow ? 'block' : 'none' }"
                    src="../assets/img/exampleTwo.png" alt="">
                <br><br><br><br><br><br>

                <span>例3:指定循环次数与灯亮灭时间,循环灯亮与灯灭并最终灭灯<br></span>
                <button @click="exampleThree">例3</button>
                <img class="exampleThree" :style="{ display: threeShow ? 'block' : 'none' }"
                    src="../assets/img/exampleThree.png" alt="">
                <br><br><br><br><br><br>

                <span>例4:烧录--循环操作小车灯的亮灭,每次亮灭持续两秒<br></span>
                <button @click="exampleFour">例4</button>
                <img class="exampleFour" :style="{ display: fourShow ? 'block' : 'none' }"
                    src="../assets/img/exampleFour.png" alt="">
                <br><br><br><br><br><br>
            </div> -->
            <div id="animation" :style="{ display: viewShow == 'run' ? 'block' : 'none' }">
                <img src="../assets/SVG/灯亮.svg" :style="{ display: imgShow == 'img1' ? 'block' : 'none' }">
                <img src="../assets/SVG/灯灭.svg" :style="{ display: imgShow == 'img2' ? 'block' : 'none' }">
            </div>
            <div class="dowmload" :style="{ display: viewShow == 'dowmload' ? 'block' : 'none' }">
                <br><br>
                <input type="text" ref="stat" value="串口信息提示" size="18" readonly="readonly">
                <br><br>
                <button @click="serial_request">请求端口</button>
                <button @click="kermit_start">开始烧录</button>
                <button @click="kermit_stop">停止烧录</button>
                <br><br>
                <input type="text" ref="kermit_stat" value="烧录信息提示" size="24" readonly="readonly">
                <br><br>
                <div id="progressContainer" style="width: 200px; height: 16px; margin: 0 auto; border: 1px solid #000;">
                </div>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
import { Compile } from '../utils'
import { serial_request, kermit_start, kermit_stop } from '../utils/burn'

import { EventBus } from '../utils/eventBus';
import ProgressBar from 'progressbar.js';
import store from '@/store';
export default {
    name: 'TopNav',

    data() {

        return {
            //定时器id记录
            timerId: null,
            //亮灭灯图片展示的数据
            imgShow: 'img1',
            //右侧视图的展示选择
            viewShow: 'workbench',
            dowmloadShow: '',
            oneShow: false,
            twoShow: false,
            threeShow: false,
            fourShow: false,
            loading: false, // 控制加载状态
            //二进制文件数据
            file: null,
            //是否停止烧录
            flashing: {boolean:true,first:true},
            selected:1,
            dropdownVisible: false,
            selectedText: '积木模式', // 默认显示的文本  
            selectedIcon: require("@/assets/img/block.png"), // 默认选中项图标
            store:store,
            selectedFile:"https://knowledge-emergency.oss-cn-hangzhou.aliyuncs.com/images/new1.jpg",
            history_files:[{picture:"https://knowledge-emergency.oss-cn-hangzhou.aliyuncs.com/images/news2.jpg",title:"未命名工程",detail:"xxxxxxxxxxxxxxxxxxxxxxxxx",update_time:"2024/10/07 19:00"},
            {picture:"https://knowledge-emergency.oss-cn-hangzhou.aliyuncs.com/images/new1.jpg",title:"未命名工程",detail:"xxxxxxxxxxxxxxxxxxxxxxxxx",update_time:"2024/10/07 19:00"}]
        }
    },
    mounted() {
        this.progressBar = new ProgressBar.Line('#progressContainer', {
            strokeWidth: 8,
            color: '#008000',
            duration: 1400,
        });
        //进度条的全局事件监听
        EventBus.$on('progress', (data) => {
            this.progressBar.set(data.sended / data.total);
        });
        //二进制文件数据的全局事件监听
        EventBus.$on('file', (file) => {
            this.file = file;
            console.log('file:', this.file);
        });
        //是否正在烧录的全局事件监听
        EventBus.$on('flashing', (data) => {
            // 更新 flashing 对象的具体属性
            this.flashing.boolean = data.boolean;
            this.flashing.first = data.first;
        // 打印更新后的 flashing 对象到控制台
        console.log('flashing:', this.flashing);
});
    document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
    // 在组件销毁时移除全局点击事件监听
    document.removeEventListener('click', this.handleClickOutside);
  },
    props: {
        code: {
            type: String, // 声明code为字符串类型的prop
            required: true // 如果必须传递code，将required设置为true
        },
    },
    methods: {
        serial_request() {
            serial_request(this.$refs);
        },
        kermit_start() {
            kermit_start(this.$refs, this.file, this.flashing);
        },
        kermit_stop() {
            kermit_stop(this.$refs, this.flashing);
        },
        //返回
        returnAction() {
            alert('返回')
        },

        //保存
        saveAction() {
            this.$emit('save');
            const h = this.$createElement;
            this.$notify({
                title: '',
                message: h('i', { style: 'color: teal' }, '积木保存成功'),
                duration: 700,
                type: 'success',
                offset: 50
            });
        },
        tipAction() {
            this.viewShow = this.viewShow !== 'tip' ? 'tip' : 'workbench';

        },

        //重新编译
        recompileAction() {
            if (this.viewShow != 'dowmload') {
                this.dowmloadAction();
            } else {
                this.dowmloadAction();
                this.dowmloadAction();
            }
        },

        //云下载
        async dowmloadAction() {
            if (this.loading == true) {
                return;
            }
            if (this.viewShow == 'dowmload') {
                this.viewShow = 'code';
                this.$emit('viewShowUpdate', this.viewShow);
                return;
            }

            this.loading = true; // 开始显示加载动画
            this.$emit('loading',this.loading);
            this.viewShow = this.viewShow !== 'dowmload' ? 'dowmload' : 'workbench';
            let state;
            state = await Compile(this.code);
            if (state == '代码编译超时,请稍后再试') {
                const h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal' }, `${state}`),
                    duration: 1000,
                    type: 'error',
                    offset: 50
                });
            } else if (state == '代码编译出错,积木代码逻辑有误') {
                const h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal' }, `${state}`),
                    duration: 1000,
                    type: 'error',
                    offset: 50
                });
            } else if (state == '服务器繁忙，请稍后再试') {
                const h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal' }, `${state}`),
                    duration: 1000,
                    type: 'error',
                    offset: 50
                });
            } else if (state == '阿里云服务器出错，请稍后再试') {
                const h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal' }, `${state}`),
                    duration: 1000,
                    type: 'error',
                    offset: 50
                });
            } else if (state == '代码编译成功') {
                this.viewShow = 'dowmload';
                this.$emit('viewShowUpdate', this.viewShow);

                const h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal' }, `${state}`),
                    duration: 1000,
                    type: 'success',
                    offset: 50
                });
            }
           
            state = '';

            // 模拟下载过程，例如调用API
            this.loading = false; // 完成后隐藏加载动画
            this.$emit('loading',this.loading);
        },

        //清除
        clear() {
            this.$emit('clear');
        },
        clearAction() {
            this.$confirm('此操作将清空所有块(不会删除缓存), 是否清空?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.clear();
                this.$message({
                    type: 'success',
                    message: '清空成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清空'
                });
            });
        },

        //提示案例
        exampleOne() {
            this.oneShow = !this.oneShow
        },
        exampleTwo() {
            this.twoShow = !this.twoShow
        },
        exampleThree() {
            this.threeShow = !this.threeShow
        },
        exampleFour() {
            this.fourShow = !this.fourShow
        },
        toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    selectOption(text, value) {
      this.selectedText = text;
      this.dropdownVisible = false;
      this.selected=value;
      if(value==1){
        this.selectedIcon=require("@/assets/img/block.png")
      }else if(value==2){
        this.selectedIcon=require("@/assets/img/shape.png")
      }
      this.$emit('change',this.selected);
    },
    handleClickOutside(event) {
      // 如果点击的元素不在下拉框内，收起下拉框
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.dropdownVisible = false;
      }
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/login';//返回登录界面
        })
      }).catch(() => { });
    },
    selectFile(index){
        this.selectedFile=this.history_files[index].picture;
    }
    },
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
    display:flex; 
    flex-direction: row;
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
    flex-direction: row;
}

/* .center img {
    height: 60px;
    width: auto;
} */

.center span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    /* margin-top: 20px; */
}



/* 左侧返回按钮样式 */
.left .returnButton {
    background-color: rgb(237, 246, 246);
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


/* 右侧按钮样式 */
.right Button {
    height: 60px;
    width: 65px;
    border: none;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    /* 图片大小适应按钮 */
    background-position: center;
    /* 图片居中 */
    cursor: pointer;
    transition: background-color 0.5s;
}

/* 右侧运行按钮 */
/* 
.right .runButton {
    /* margin: 0; */
/*   background-image: url('../assets/SVG/运行.svg')*/
/* } */

/* 右侧重新编译按钮 */
.right .recompileButton {
    margin-right: 50px;
    background-image: url('../assets/SVG/重新编译.svg');
}

/* 右侧保存按钮 */
.right .saveButton {
    margin-right: 50px;
    background-image: url('../assets/SVG/save.svg');
}


/* 右侧提示按钮 */
.right .tipButton {
    margin-right: 50px;
    background-color: rgb(185, 240, 222);
    background-image: url('../assets/SVG/提示.svg');
}

/* 右侧提示按钮 */
.right .dowmloadButton {
    margin-right: 50px;
    background-color: rgb(185, 240, 222);
    background-image: url('../assets/SVG/云下载.svg');
}

/* 右侧清空按钮 */
.right .clearButton {
    margin-right: 5px;
    background-image: url('../assets/SVG/delete.svg');
}

/* 右侧按钮悬浮样式 */
.right Button:hover {
    /* 微微放大 */
    transform: scale(1.05);
    /* 背景颜色稍稍变深 */
    filter: brightness(110%);
}

/* 右侧按钮激活样式 */
.right Button:active {
    transform: translateY(1px);
    /* 按下按钮时向下移动 1px */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    /* 添加阴影效果 */
}

/* 提示 */
.view {
    overflow: scroll;
    position: absolute;
    right: 0px;
    height: calc(100vh - 60px);
    width: 30%;
    border-radius: 30px;
    background-color: rgb(233, 241, 252);
    /* transition:all 1s; */
}

.tip Button {
    position: absolute;
    left: 27%;
    background-color: rgb(233, 241, 252);
    height: 60px;
    width: 100px;
    border: none;
    border-radius: 50%;
    background-image: url('../assets/SVG/按钮.svg');
    background-repeat: no-repeat;
    background-size: contain;
    /* 图片大小适应按钮 */
    background-position: center;
    /* 图片居中 */
    cursor: pointer;
    transition: background-color 0.5s;
}

.tip Button:hover {
    transform: scale(1.05);
    /* filter: brightness(110%); */
}

.tip Button:active {
    transform: translateY(1px);
}


.tip img {
    margin-top: 60px;
}

.exampleOne {
    margin-left: 100px;
    height: 316px;
    width: 264.72px;

}

.exampleTwo {
    /* margin-left: 50px; */
    margin-left: 85px;
    width: 347px;
    height: 266px;
}

.exampleThree {
    /* margin-left: 50px; */
    margin-left: 80px;
    width: 347px;
    height: 266px;
}

.exampleFour {
    /* margin-left: 50px; */
    margin-left: 80px;
    width: 331px;
    height: 418px;
}

#animation {
    margin-top: 50px;
    margin-left: 50px;
}

#animation img {
    width: 160px;
    height: auto
}

.dowmload button {
    margin: 0 5px;
    background-color: rgb(233, 241, 252);
    height: 60px;
    width: 100px;
    border: none;
    border-radius: 50%;
    background-image: url('../assets/SVG/按钮.svg');
    background-repeat: no-repeat;
    background-size: contain;
    /* 图片大小适应按钮 */
    background-position: center;
    /* 图片居中 */
    cursor: pointer;
    transition: background-color 0.5s;
}

.dowmload Button:hover {
    transform: scale(1.05);
    /* filter: brightness(110%); */
}

.dowmload Button:active {
    transform: translateY(1px);
}
.custom-select-container {
  position: relative;
  width: 130px; /* 可根据需要调整宽度 */
  margin: 10px 200px 0px 0px;
  cursor: pointer;
}
.custom-select {
  appearance: none; /* 移除默认样式 */
  width: 100%;
  padding: 10px;
  padding-right: 40px; /* 为箭头留出空间 */
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: white;
  position: relative;
  cursor: pointer;
  
}

/* 自定义箭头的样式 */
.custom-select-container::after {
  content: '';
  position: absolute;
  top: 40%;
  right: 18px; /* 自定义箭头的位置 */
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333; /* 箭头的颜色 */
  transform: translateY(-50%);
  pointer-events: none; /* 保证箭头不影响点击 */
}
.custom-select-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #FFF6ED;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 20px;
}

.custom-options {
  list-style: none;
  padding: 0;
  margin: 5px 0px 0px 0px;
  position: absolute;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 100;
}

.custom-option {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
}

.custom-option:hover {
  background-color: #f0f0f0;
}

.option-icon {
  width: 20px !important;
  height: 20px !important;
  margin-right: -15px;
}
.logo{
    padding: 10px;
    margin: 5px;
}
.button{
    font-size: 16px;
    padding: 25px 15px 10px 16px;
    cursor: pointer;
}
.avatar{
    width: 100px;
    padding: 10px 20px 10px 0px;
    cursor: pointer;
}
.workbench {
  display: flex;
  flex-direction: column;
  align-items: center;

}
.workbench-image{
    font-size: 16px;
    width: 100%;
    height: 45%;
}
.workbench-image img {
    font-size: 16px;
  width: 300px;
  height: 300px;
  border: 2px solid #ccc;
  margin-bottom: 20px;
}

.history-file {
  display: flex;
  flex-wrap: row;
  gap: 10px;
}

.history-file img {
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: transform 0.2s;
}

.history-file img:hover {
  transform: scale(1.1);
}
</style>