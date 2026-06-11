import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HistoryView from "@/views/HistoryView.vue";

const routes = [
  { path: "/", redirect: "/rates" },
  { path: "/rates", name: "rates", component: HomeView },
  { path: "/history", name: "history", component: HistoryView }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
