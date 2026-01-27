<template>
  <div ref="cardRef" class="card rate-card h-100 shadow-sm position-relative" :class="{ 'best-rate': highlight }">
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
          
          <button
            class="btn btn-sm btn-outline-secondary ms-2 p-1 border-0"
            :class="copied ? 'btn-success' : 'btn-outline-secondary'"
            @click="copyValue"
            title="Copiar monto"
          >
            <span v-if="copied">✅</span>
            <span v-else>📋</span>
          </button>
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

    <button
      class="btn btn-sm btn-outline-secondary position-absolute bottom-0 end-0 m-2 border-0 p-1"
      @click="shareCard"
      title="Compartir"
    >
      📤
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import html2canvas from "html2canvas";

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

const copied = ref(false);
const cardRef = ref(null);

function copyValue() {
  navigator.clipboard.writeText(formattedValue.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1500);
}

async function shareCard() {
  const canvas = await html2canvas(cardRef.value, {
    backgroundColor: null,
    scale: 2
  });

  const blob = await new Promise(resolve =>
    canvas.toBlob(resolve, "image/png")
  );

  const file = new File([blob], "venetasas.png", { type: "image/png" });

  const text = `${props.title}
Tasa: ${props.rate}
Monto: ${formattedValue.value}
Actualizado: ${props.updatedAt}`;

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      title: "VeneTasas",
      text,
      files: [file]
    });
  } else {
    // fallback: copiar texto
    await navigator.clipboard.writeText(text);
    alert("Texto copiado para compartir");
  }
}

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
  "text-warning":props.diff > 35,
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
