<template>
  <div class="card rate-card h-100 shadow-sm" :class="{ 'best-rate': highlight }">
    <div class="card-body p-2">
      <h6 class="card-title mb-1 text-truncate">
        {{ title }}
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
      </div>

      <div
        v-if="diff !== undefined"
        class="small mt-1"
        :class="diffClass"
      >
        {{ diff.toFixed(2) }}%
      </div>

      <div
        v-if="updatedAt"
        class="small text-muted mt-1"
      >
        Actualizado:
        {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatDate } from '@/utils/date'

const props = defineProps({
  title: String,
  rate: Number,
  value: Number,
  diff: Number,
  mode: String,
  highlight: Boolean,
  updatedAt: String
});

const unit = computed(() =>
  props.mode === "USD" ? "Bs" : "$"
);

const formattedValue = computed(() =>
  props.value?.toFixed(2)
);

const diffClass = computed(() => ({
  "text-success": props.diff > 0,
  "text-danger": props.diff < 0
}));

const formattedDate = computed(() =>
  formatDate(props.updatedAt)
)
</script>
