import { createApp } from 'vue';
import App from './src/App.vue';
import SyUI from 'sy-vue-ui';
import 'sy-vue-ui/theme-chalk/index.css';

const app = createApp(App);
app.use(SyUI);
app.mount('#app');
