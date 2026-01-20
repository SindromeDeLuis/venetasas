<template>
  <div class="card rate-card h-100 shadow-sm" :class="{ 'best-rate': highlight }">
    <div class="card-body p-2">
      <h6 class="card-title mb-1 d-flex align-items-center gap-1">
        {{ title }}
        <span v-if="hot" class="hot-emoji">🔥</span>
      </h6>

      <Transition name="fade-scale" mode="out-in">
        <div
          :key="value"
          class="fw-bold fs-5"
        >
          {{ formattedValue }}
          <span class="fs-6 text-muted">
            {{ unit }}
          </span>
        </div>
      </Transition>

      <div class="small text-muted">
        Tasa: {{ rate.toFixed(2) }}
        <span
          v-if="variation !== undefined"
          class="small fw-semibold"
          :class="variationClass"
        >
          {{ variationSign }}
          {{ Math.abs(variation).toFixed(2) }}%
        </span>
      </div>

      <div
        v-if="diff !== undefined"
        class="small mt-1"
        :class="diffClass"
      >
        {{ diff.toFixed(2) }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  rate: Number,
  value: Number,
  diff: Number,
  variation: Number,
  mode: String,
  highlight: Boolean,
  hot: Boolean
});

const unit = computed(() =>
  props.mode === "USD" ? "Bs" : "$"
);

const formattedValue = computed(() =>
  props.value?.toFixed(2)
);

const variationSign = computed(() => {
  if (props.variation > 0) return '▲'
  if (props.variation < 0) return '▼'
  return ''
})

const variationClass = computed(() => {
  if (props.variation > 0) return 'text-success'
  if (props.variation < 0) return 'text-danger'
  return 'text-muted'
})

const diffClass = computed(() => ({
  "text-success": props.diff > 0,
  "text-danger": props.diff < 0
}));
</script>

<style scoped>
.hot-emoji {
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
</style>
