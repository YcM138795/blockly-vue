import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import pinia from './store'
import { MessageBox, Message , Notification } from 'element-ui';``
import 'element-ui/lib/theme-chalk/index.css';

// const pinia = createPinia()
Vue.config.productionTip = false;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

new Vue({
  router,
  // pinia,
  render: h => h(App)
}).$mount('#app')
