<template>
  <div v-if="loading" class="text-center py-5">
      <div class="spinner-border mb-3" role="status"></div>
      <h4 class="fw-bold">Cargando tasas...</h4>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>