<template>
  <div class="row g-2 mb-3 align-items-end">
    <!-- Cantidad -->
    <div class="col-8">
      <label class="form-label fw-semibold">
        Cantidad
      </label>
      <input
        type="number"
        class="form-control form-control-sm"
        min="0"
        step="0.01"
        :value="modelValue"
        @input="onInput"
      />
    </div>

    <!-- Modo -->
    <div class="col-4">
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
</script>
