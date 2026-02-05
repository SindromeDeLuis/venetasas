<template>
  <nav class="bottom-nav shadow-lg">
    <button
      v-for="item in items"
      :key="item.name"
      class="nav-btn"
      :class="{ active: route.name === item.route }"
      @click="go(item.route)"
    >
      <i :class="item.icon"></i>
      <small>{{ item.label }}</small>
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const items = [
  { name: "rates", label: "Tasas", route: "rates", icon: "bi bi-currency-exchange" },
  { name: "history", label: "Historial", route: "history", icon: "bi bi-clock-history" },
];

function go(routeName) {
  router.push({ name: routeName });
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 62px;
  background: var(--bs-body-bg);
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1050;
  backdrop-filter: blur(6px);
}

.nav-btn {
  background: none;
  border: none;
  color: var(--bs-body-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  transition: all 0.2s ease;
}

.nav-btn i {
  font-size: 22px;
}

.nav-btn small {
  font-size: 11px;
}

.nav-btn.active {
  color: var(--bs-primary);
  transform: translateY(-2px);
}

.nav-btn.active i {
  animation: pop 0.3s ease;
}

@keyframes pop {
  0% { transform: scale(0.8); }
  100% { transform: scale(1); }
}
</style>
