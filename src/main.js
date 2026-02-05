import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

import "@/assets/css/custom.css";

import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

document.documentElement.setAttribute("data-bs-theme", "dark");

createApp(App)
  .use(router)
  .mount("#app");
