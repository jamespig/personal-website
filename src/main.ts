import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/index";
import LenisVue from "lenis/vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Set Lenis options
const lenisOptions = {
  lerp: 0.15, // Higher lerp value for stronger stickyness
  wheelMultiplier: 0.6, // Decrease scroll speed
  duration: 2.2, // Longer duration
  smoothWheel: true, // Smooth wheel
};

const app = createApp(App);

app.use(router);
app.use(LenisVue, lenisOptions);

app.mount("#app");
