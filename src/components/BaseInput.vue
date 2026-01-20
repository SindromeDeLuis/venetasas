<template>
  <div class="row g-2 mb-3 align-items-end">
    <!-- Cantidad -->
    <div class="col-8 col-md-9">
      <label class="form-label fw-semibold" for="cantidad">
        Cantidad
      </label>

      <div class="input-group input-group-sm">
        <input
          type="number"
          id="cantidad"
          class="form-control form-control-sm"
          min="0"
          step="0.01"
          :value="modelValue"
          @input="onInput"
        />

        <!-- Reset -->
        <button
          :disabled="modelValue === 1"
          type="button"
          class="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
          @click="reset"
          aria-label="Reiniciar valor"
        >
          ⟲
        </button>
      </div>
    </div>

    <!-- Modo -->
    <div class="col-4 col-md-3">
      <label class="form-label fw-semibold">
        Calcular en
      </label>
      <select
        class="form-select form-select-sm"
        :value="mode"
        @change="onModeChange"
      >
        <option value="USD">$ USD → Bs</option>
        <option value="VES">Bs → USD</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
});

const emit = defineEmits([
  "update:modelValue",
  "update:mode"
]);

function onInput(e) {
  emit("update:modelValue", Number(e.target.value));
}

function onModeChange(e) {
  emit("update:mode", e.target.value);
}

function reset() {
  emit('update:modelValue', 1)
}
</script>
