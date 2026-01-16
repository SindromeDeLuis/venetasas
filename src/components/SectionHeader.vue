<template>
  <div class="d-flex justify-content-between align-items-center mb-2">
    <h6 class="mb-0 fw-semibold">
      {{ title }}
    </h6>

    <small v-if="updatedAt" class="text-muted">
      Actualizado: {{ formattedDate }}
    </small>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/date'

const props = defineProps({
  title: String,
  updatedAt: String
})

const formattedDate = computed(() =>
  formatDate(props.updatedAt)
)
</script>
