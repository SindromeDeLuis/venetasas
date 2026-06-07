<template>
  <div class="container min-h-[100dvh]">
    
    <!-- Input base -->
    <BaseInput
      v-model="base"
      v-model:mode="mode"
    />

    <!-- Loader -->
    <Loader :loading="loading" />

    <!-- Error -->
    <Error
      :error="error"
      @fetchRates="fetchRates"
    />

    <!-- Rates -->
    <RatesList 
      v-if="rates" 
      :rates="rates" 
      :base="base" 
      :mode="mode"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import BaseInput from "@/components/BaseInput.vue";
import Loader from "@/components/Loader.vue";
import Error from '@/components/Error.vue'
import RatesList from '@/components/RatesList.vue'

import { getAllRates } from "@/services/rates.service";

const base = ref(1);
const mode = ref("USD");
const rates = ref(null);

const loading = ref(false);
const error = ref(null);

const fetchRates = async () => {
  loading.value = true;
  error.value = null;
  rates.value = null;

  try {
    rates.value = await getAllRates();
  } catch (err) {
    error.value = "No se pudieron cargar las tasas. Intenta de nuevo.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRates);
</script>
