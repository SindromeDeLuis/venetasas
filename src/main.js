import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "@/assets/css/custom.css";

import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

document.documentElement.setAttribute("data-bs-theme", "dark");

createApp(App).mount("#app");
