import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/index";
import LenisVue from "lenis/vue";

createApp(App).use(router).use(LenisVue).mount("#app");
