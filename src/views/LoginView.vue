<template>
    <div class="login">
      <div>
      <img src="../assets/img/login_logo.png">
      </div>
      <div style="font-weight: bold;font-size: 20px;">登录</div>
      <div><img src="../assets/img/line.png"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <div>账号</div>
        <el-form-item prop="username" class="input">
          <el-input v-model="ruleForm.username"  class="rounded-input"></el-input>
        </el-form-item>
        <div>密码</div>
        <el-form-item  prop="password" class="input">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="rounded-input"></el-input>
        </el-form-item>
        <div>验证码</div>
        <div style="display:flex;flex-direction: row;">
          <el-form-item prop="code"  class="input" style="width: 110px;">
            <el-input
            v-model="ruleForm.code"
            auto-complete="off"
            @keyup.enter.native="submitForm"
            class="rounded-input" 
            />
          </el-form-item>
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>  
        <el-form-item>
          <el-button @click="submitForm" style="border-radius: 15px;width: 100px;height: 40px;padding: 8px 4px 10px 10px; background-color: transparent;border: 1px solid #FF8D1A;"><img src="../assets/img/enter.png"></el-button>
        </el-form-item>
      </el-form>
<div style="font-size: 12px;height: 30px;">你还可以，选择以下登录方式</div>
<div><img src="../assets/img/phone.png"></div>
<div style="font-size: 12px;height: 100px;">验证码登录</div>
<div>还没有账号？点击此处<a style="color: #FF8D1A; cursor: pointer;">获取账号</a></div>
    </div>
  </template>
  
  <script>
  import { getCodeImg } from "@/api/login";
  import Cookies from "js-cookie";
  import { encrypt, decrypt } from '@/utils/jsencrypt'
   export default {
    data() {
      return {
        ruleForm: {
          username: "",
          password:'',
          code:'',
          uuid: ""
        },
        redirect: undefined,
        codeUrl: "",
        loading: false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code: [{ required: true, trigger: "change", message: "请输入验证码" }]
        }
      };
    },
    watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      }
    }
  },
    created() {
    console.log(this.$store)  // 检查 store 是否存在
    this.getCode();
    this.getCookie();
  },
    methods: {
      getCookie() {
      const username = Cookies.get("username_stu");
      const password = Cookies.get("password_stu");
      this.ruleForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
      };
    },
      submitForm() {

        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch("Login", this.ruleForm).then(() => {
            Cookies.set("username_stu", this.ruleForm.username, { expires: 30 });
            Cookies.set("password_stu", encrypt(this.ruleForm.password), { expires: 30 });
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
              this.getCode();
          });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCode() {
      getCodeImg().then(res => {
          //console.log(res.data);
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.ruleForm.uuid = res.uuid;
        }
      );
    },
    }
  }
  
  </script>
  
  <style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/img/background.png");
    background-size: cover;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    flex-direction: column;
  }
  .input .el-form-item__content{
    width: 100%;
    padding: 10px 0px 0px 10px;
  }
  .input .el-form-item__error{
    padding-left: 12px;
  }
  .rounded-input .el-input__inner {
  border-radius: 10px;
  border-color: #FF8D1A;
}
.rounded-input .el-input__inner:focus {
  border-color: #FF8D1A;
  outline: none;
}
.login-code-img {
  height: 30px;
  padding-top:14px ;
  padding-left: 20px;
}
.demo-ruleForm{
  width: 210px;
}
  </style>
  