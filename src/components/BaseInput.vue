<template>
  <div class="input-container">
    <div class="row g-2 mb-3 px-1 align-items-end">
      <!-- Cantidad -->
      <div class="col-6 col-md-9">
        <label class="form-label fw-semibold text-nowrap" for="cantidad">
          Cantidad
        </label>

        <div class="input-group">
          <input
            type="number"
            id="cantidad"
            class="form-control"
            min="0"
            step="0.01"
            :value="modelValue"
            @input="onInput"
          />

          <!-- Reset -->
          <button
            :disabled="modelValue === 1"
            type="button"
            class="btn btn-reset-input d-flex align-items-center justify-content-center"
            @click="reset"
            aria-label="Reiniciar valor"
          >
            <span class="icon-reset">⟲</span>
          </button>
        </div>
      </div>

      <!-- Modo -->
      <div class="col-6 col-md-3">
        <label class="form-label fw-semibold text-nowrap">
          Calcular
        </label>
        <select
          class="form-select h-auto"
          :value="mode"
          @change="onModeChange"
        >
          <option value="USD">USD → Bs</option>
          <option value="VES">Bs → USD</option>
        </select>
      </div>
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

<style scoped> 
.input-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bs-body-bg);
  /*height: 88px;
  border-bottom: 1px solid var(--bs-border-color);*/
}

.btn-reset-input {
  border: 1px solid var(--bs-border-color);
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 0 0.5rem;
  line-height: 1;
}

.btn-reset-input:hover:not(:disabled) {
  background-color: var(--bs-tertiary-bg);
  border-color: var(--bs-border-color-translucent);
}

.btn-reset-input:focus {
  outline: 0;
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-reset-input:disabled {
  background-color: var(--bs-secondary-bg);
  border-color: var(--bs-border-color);
  opacity: 0.65;
  color: var(--bs-secondary-color);
}

.icon-reset {
  font-size: 1.35rem;
  font-weight: 500;
  display: inline-block;
  transform: translateY(-1px); /* Pequeña compensación visual si notas que el carácter ⟲ no está perfectamente centrado */
}
</style>