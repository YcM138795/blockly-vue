<template>
    <div>
        <div class="first-floor">
            <div class="TopNav">
                <div class="left">
                    <img src="https://jnui-edu.oss-cn-hangzhou.aliyuncs.com/commonResource/edu-logo.jpg" alt="logo" class="logo">
                </div>
                <div class="center">
                    <div class="custom-select-container">
                        <div class="custom-select-box" @click.stop="toggleDropdown">
                            <img :src="selectedIcon" alt="Selected Icon" class="option-icon">
                            <span style="font-size: 14px;">{{ selectedText }}</span>
                            <i class="arrow-down"></i> <!-- 箭头图标 -->
                        </div>
                        <ul v-if="dropdownVisible" class="custom-options" ref="dropdown">
                            <li v-if="selected == 2" @click="selectOption('积木模式', 1)" class="custom-option">
                                <img src="../assets/img/block.png" alt="Icon1" class="option-icon">
                                <div style="font-size: 14px;margin-left: 24px;">积木模式</div>
                            </li>
                            <li v-else-if="selected == 1" @click="selectOption('代码模式', 2)" class="custom-option">
                                <img src="../assets/img/shape.png" alt="Icon2" class="option-icon">
                                <div style="font-size: 14px;margin-left: 24px;">代码模式</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right">
                    <div style="display:flex; flex-direction: row;flex: 1;">
                        <button class="topButton reset" @click="clearAction">清空</button>
                        <button class="topButton download" @click="dowmloadAction">云编译</button>
                        <button class="topButton save" @click="changeDialogVisable">保存</button>
                        <button class="topButton historyFiles" @click="historyFilesVisable">记录</button>
                    </div>
                    <div class="avatar">
                        <el-dropdown trigger="click">
                            <div class="avatar-wrapper">
                                <el-avatar :src="store.getters.avatar"></el-avatar>
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
                </div>
            </div>
        </div>

        <div class="second-floor">
            <div class="view">
                <div :style="{ display: viewShow == 'workbench' ? 'block' : 'none' }" class="workbench">
                    <!-- <div class="workbench-image">
                    <img src="../assets/img/historyFile_logo.png"/>
                </div> -->
                    <div style="text-align:left;padding:10px 0px 5px 20px; display: flex;flex-direction: row;">
                        <img src="../assets/img/menu.png">
                        <div style="font-size: 13px;">历史文件</div>
                    </div>
                    <div class="history-files">
                        <div v-if="history_files.length === 0" style="height: 100%;display: contents">暂无工程项目</div>
                        <div class="history-file" v-for="(history_file, index) in history_files" :key="index"
                            @click="selectFile(index)" :class="{ 'selected-file': selectedIndex === index }">
                            <img src="../assets/img/historyFile_logo.png" />
                            <div style="text-align: left;">
                                <div style="font-size: 17px;margin: 10px 0px 5px 0px;">
                                    {{ history_file.projectName }}
                                </div>
                                最后修改日期：{{ history_file.updatedAt }}
                            </div>
                            <div class="icons-container">
                                <img src="../assets/img/edit.png" style="width: 15px;height: 15px;" @click="editFile(history_file,index)"/>
                                <img src="../assets/img/delete.png" style="width: 15px;height: 15px;margin-right: 20px;" @click="deleteFile(history_file)"/>
                            </div>
                            
                        </div>
                    </div>
                    <div class="view-code">
                        <!-- {{ advancedBlockStore.code }} -->
                        <div id="code" ref="codeView" style="height:220px;"></div>
                    </div>
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
                    <div id="progressContainer"
                        style="width: 200px; height: 16px; margin: 0 auto; border: 1px solid #000;">
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="新建项目" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectName">
                    <el-input v-model="form.projectName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeDialogVisable">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { Compile } from '../utils'
import { serial_request, kermit_start, kermit_stop } from '../utils/burn'
import { EventBus } from '../utils/eventBus';
import ProgressBar from 'progressbar.js';
import store from '@/store';

import * as Blockly from 'blockly/core';
//设置语言
import * as zh_hans from 'blockly/msg/zh-hans';
Blockly.setLocale(zh_hans);
import * as monaco from 'monaco-editor';

export default {
    name: 'TopNav',
    data() {
        return {
            //定时器id记录
            timerId: null,
            //右侧视图的展示选择
            viewShow: 'workbench',
            dowmloadShow: '',
            loading: false, // 控制加载状态
            //二进制文件数据
            file: null,
            //是否停止烧录
            flashing: { boolean: true, first: true },
            selected: 1,
            dropdownVisible: false,
            selectedText: '积木模式', // 默认显示的文本  
            selectedIcon: require("@/assets/img/block.png"), // 默认选中项图标
            store: store,
            dialogFormVisible: false,
            form: {
                projectName: ''
            },
            formLabelWidth: '120px',
            rules: {
                projectName: [
                    { required: true, message: '项目名称不能为空', trigger: 'blur' },
                    { validator: this.checkDuplicate, trigger: 'blur' }
                ]
            },
            selectedIndex: null, // 存储被选中的文件索引
            codeViewIns: null,
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

        this.codeViewIns = monaco.editor.create(this.$refs.codeView, {
            theme: "my-custom-theme", // 主题
            value: "c", // 默认显示的值
            language: "c",
            folding: true, // 是否折叠
            foldingHighlight: true, // 折叠等高线
            foldingStrategy: "indentation", // 折叠方式  auto | indentation
            showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
            disableLayerHinting: true, // 等宽优化
            emptySelectionClipboard: false, // 空选择剪切板
            selectionClipboard: false, // 选择剪切板
            automaticLayout: false, // 自动布局
            codeLens: true, // 代码镜头
            scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
            colorDecorators: true, // 颜色装饰器
            accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
            lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
            lineNumbersMinChars: 1, // 行号最小字符   number
            enableSplitViewResizing: false,
            readOnly: true, //是否只读  取值 true | false
            minimap: {
                enabled: true // 启用迷你地图
            }
        });
        this.codeViewIns.setValue(this.code);
    },
    watch: {
        code(newCode) {
            this.codeViewIns.setValue(newCode);
        }
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
        history_files: {
            type: Array,
            require: true
        }
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

        //保存
        async saveAction() {
            this.changeDialogVisable();
            this.$emit('save', this.form.projectName);
            this.form.projectName = '';
            // 生成成功通知
            const h = this.$createElement;
            this.$notify({
                title: '',
                message: h('i', { style: 'color: teal' }, '积木保存成功'),
                duration: 700,
                type: 'success',
                offset: 50
            });
        },

        //云下载
        async dowmloadAction() {
            this.$confirm('是否需要编译?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if (this.loading == true) {
                    return;
                }
                this.loading = true; // 开始显示加载动画
                this.$emit('loading', this.loading, '代码编译中');
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
                this.$emit('loading', this.loading);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消编译'
                });
            });
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

        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },

        selectOption(text, value) {
            this.selectedText = text;
            this.dropdownVisible = false;
            this.selected = value;
            if (value == 1) {
                this.selectedIcon = require("@/assets/img/block.png")
            } else if (value == 2) {
                this.selectedIcon = require("@/assets/img/shape.png")
            }
            this.$emit('change', this.selected);
        },
        handleClickOutside(event) {
            // 如果点击的元素不在下拉框内，收起下拉框
            if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
                this.dropdownVisible = false;
            }
        },
        changeDialogVisable() {
            this.dialogFormVisible = !this.dialogFormVisible;
        },
        async logout() {
            this.$confirm('确定注销并退出系统吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('LogOut').then(() => {
                    location.href = '#/login';//返回登录界面
                })
            }).catch(() => { });
        },
        checkDuplicate(rule, value, callback) {
            const isDuplicate = this.history_files.some(project => project.projectName === value);
            if (isDuplicate) {
                callback(new Error('项目名称已存在'));
            } else {
                callback();
            }
        },
        editFile(history_file,index){
            if(index==this.selectedIndex){
                this.$emit('edit', history_file.projectName);
            }
        },
        deleteFile(history_file){

            this.$emit('delete', history_file.projectName);
            this.selectedIndex=""
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveAction(); // Call your save method here
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        selectFile(index) {
            if(this.selectedIndex!=index){
                this.selectedIndex = index;
                this.$emit('blockCode', this.history_files[index]);
            }
        },
        historyFilesVisable() {
            this.viewShow = 'workbench';
        }
    },
}
</script>

<style>
.TopNav {
    display: flex;
    justify-content: space-between;
    /* 让子元素平均分布在父容器内 */
    background-color: azure;
}
.logo{
    width: 50px;
}
.left {
    text-align: left;
}

.right {
    text-align: right;
    display: flex;
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

.center span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    /* margin-top: 20px; */
}


/* 提示 */
.view {
    overflow: hidden;
    position: absolute;
    right: 0px;
    height: calc(100vh - 60px);
    width: 30%;
    height: 100vh;
    border-radius: 30px;
    background-color: rgb(233, 241, 252);
    /* transition:all 1s; */
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
}

.dowmload Button:active {
    transform: translateY(1px);
}

.custom-select-container {
    position: relative;
    width: 130px;
    /* 可根据需要调整宽度 */
    margin: 10px 200px 0px 0px;
    cursor: pointer;
}

.custom-select {
    appearance: none;
    /* 移除默认样式 */
    width: 100%;
    padding: 10px;
    padding-right: 40px;
    /* 为箭头留出空间 */
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
    right: 18px;
    /* 自定义箭头的位置 */
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #333;
    /* 箭头的颜色 */
    transform: translateY(-50%);
    pointer-events: none;
    /* 保证箭头不影响点击 */
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

.logo {
    padding: 10px;
    margin: 5px;
}

.button {
    font-size: 16px;
    padding: 25px 15px 10px 16px;
    cursor: pointer;
}

.avatar {
    width: 100px;
    padding: 10px 20px 10px 0px;
    cursor: pointer;
}

.workbench {
    height: 100%;
    /* 设为父容器的高度 */
}

.workbench-image {
    font-size: 16px;
    width: 100%;
    height: 200px;
    overflow: hidden;
    /* 禁止滚动条 */
}

.workbench-image img {
    font-size: 16px;
    width: 300px;
    height: 300px;
    border: 2px solid #ccc;
    margin-bottom: 20px;
}

.history-files {
    max-height: calc(100vh - 375px);
    /* max-height: 90vh ; */
    overflow-y: auto;
    /* 允许垂直滚动 */
    padding: 0px 10px 10px 10px;
    height: 100%;
}

.history-file {
    display: flex;
    gap: 10px;
    border: 1px solid #FF8D1A;
    margin: 10px;
    height: 100px;
    cursor: pointer;
}
.icons-container {
    display: flex;
    align-items: center;
    margin-left: auto; /* 让图标紧贴右侧 */
}
.selected-file {
    border-color: #FF8D1A;
    /* 选中后变为高亮绿色 */
    border-width: 3px;
    /* 选中后加粗边框 */
}

.history-file img {
    width: 80px;
    height: 80px;
    margin: 10px;
}

.view-code {
    margin-top: 10px;
    background-color: #d6d9da;
    padding: 10px;
    height: 240px;
}

.topButton {
    margin-top: 10px;
    margin-right: 15px;
    background-color: #e9f1fc;
    /* 背景颜色 */
    height: 40px;
    /* 按钮高度 */
    border: none;
    /* 去除边框 */
    border-radius: 20px;
    /* 半径等于高度的一半，形成胶囊形状 */
    display: flex;
    /* 使用 Flexbox */
    justify-content: center;
    align-items: center;
    font-size: 14px;
    /* 字体大小 */
    color: #333;
    /* 字体颜色 */
    cursor: pointer;
    /* 鼠标悬停样式 */
    transition: background-color 0.5s;
    /* 背景色过渡动画 */
    background-repeat: no-repeat;
    /* 禁止图片重复 */

    width: 80px;
    /* 按钮宽度，加宽形成椭圆 */
    background-position: 25% center;
    /* 背景图向左靠边 */
    padding-left: 17px;
}

.topButton:hover {
    background-color: rgb(200, 220, 240);
    /* 鼠标悬停时的背景色 */
}

.reset {
    background-image: url('../assets/img/reset.png');
}

.download {
    background-image: url('../assets/img/download.png');
    font-size: 11px;
    /* 按钮宽度，加宽形成椭圆 */
    background-position: 22% center;
    /* 背景图向左靠边 */
    padding-left: 15px;
}

.save {
    background-image: url('../assets/img/save.png');
    
}

.historyFiles {
    background-image: url('../assets/img/menu.png');
    
}
</style>