<template>
  <div v-if="error" class="text-center py-5">
    <div class="mb-3">
      <span class="display-1 text-danger">⚠️</span>
    </div>
    <h4 class="fw-bold">¡Ups! Algo salió mal</h4>
    <p class="text-muted">{{ error }}</p>
    <button 
      class="btn btn-primary rounded-pill px-4 mt-2 shadow-sm" 
      @click="fetchRates"
    >
      🔄 Reintentar
    </button>
  </div>
</template>

<script setup>
  defineProps({
    error: String
  })
</script>