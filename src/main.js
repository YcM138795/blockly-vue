import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import pinia from './store'
import { MessageBox, Message , Notification,  Loading } from 'element-ui';``
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Loading.directive);

// const pinia = createPinia()
Vue.config.productionTip = false;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;

new Vue({
  router,
  // pinia,
  render: h => h(App)
}).$mount('#app')
