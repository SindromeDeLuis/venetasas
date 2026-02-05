<template>
  <header class="container app-header d-flex align-items-center px-3">
    <div class="header-content flex-grow-1">
      <h1 class="h5 fw-bold mb-0 text-truncate">VeneTasas</h1>
    </div>
    
    <button
      class="btn border-0 theme-toggle d-flex align-items-center justify-content-center ms-2"
      @click="toggleTheme"
      :aria-label="theme === 'dark' ? 'Modo claro' : 'Modo oscuro'"
    >
      <span class="fs-5">{{ theme === "dark" ? "🌙" : "☀️" }}</span>
    </button>
  </header>
</template>

<script setup>
import { useTheme } from "@/composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.app-header {
  /* Sobrescribimos la altura de 88px de custom.css por una estándar de 64px */
  height: 64px !important; 
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
}

/* Tipografía refinada para títulos de Android */
.header-content h1 {
  letter-spacing: 0.15px;
  font-size: 1.20rem;
}

.header-content p {
  font-size: 0.75rem;
  letter-spacing: 0.2px;
}

/* Efecto de presión en el botón para simular feedback táctil */
.theme-toggle:active {
  background-color: rgba(128, 128, 128, 0.2);
  transform: scale(0.95);
}

/* Ajuste sutil para modo oscuro basado en tus variables */
[data-bs-theme="dark"] .app-header {
  border-bottom-color: rgba(255, 255, 255, 0.1) !important;
}
</style>