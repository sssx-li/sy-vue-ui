import { createApp } from "vue";
import App from "./src/App.vue";
import { SyButton } from "sy-vue-ui";
import "sy-vue-ui/theme-chalk/index.css";

const app = createApp(App);
app.use(SyButton);
app.mount("#app");
