import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import pinia from './store'
import { MessageBox, Message , Notification,  Loading, Dialog, Form,FormItem,Input, Select,Option,Button,Avatar,Dropdown, DropdownMenu, DropdownItem} from 'element-ui';``
import store from './store'
import './permission' // permission control
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia';


Vue.use(PiniaVuePlugin);// 注册 Pinia 插件
Vue.use(Loading.directive);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.config.productionTip = false;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
const pinia = createPinia();


new Vue({
  router,
  store,
  pinia,
  render: h => h(App)
}).$mount('#app')
