import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MessageBox, Message , Notification,  Loading, Dialog, Form,FormItem,Input, Select,Option,Button,} from 'element-ui';``
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

Vue.config.productionTip = false;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
const pinia = createPinia();


new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
