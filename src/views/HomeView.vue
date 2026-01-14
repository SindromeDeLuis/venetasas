<template>
  <div class="container py-3 min-vh-100">
    
    <button
      class="btn btn-sm btn-outline-secondary mb-3"
      @click="toggleTheme"
    >
      {{ theme === "dark" ? "🌙 Oscuro" : "☀️ Claro" }}
    </button>

    <!-- Header -->
    <div class="mb-4">
      <h1 class="fw-bold">Tasas de cambio VES</h1>
      <p class="text-muted mb-0">
        BCV vs Binance P2P
      </p>
    </div>

    <!-- Input base -->
    <BaseInput
      v-model="base"
      v-model:mode="mode"
    />

    <!-- Loader -->
    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border" role="status"></div>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Cards -->
     <div class="row g-2">
      <div
        v-for="item in rateList"
        :key="item.key"
        class="col-6 col-md-3"
      >
        <RateCard
          :title="item.label"
          :rate="item.rate"
          :value="convert(base, item.rate, mode)"
          :diff="item.diff"
          :mode="mode"
          :highlight="item.key === bestRateKey"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import BaseInput from "@/components/BaseInput.vue";
import RateCard from "@/components/RateCard.vue";

import { getAllRates } from "@/services/rates.service";
import {
  percentageDiff,
  calculateValue,
  cashBuyPrice,
  convert
} from "@/utils/calculations";

import { useTheme } from "@/composables/useTheme";

const { theme, toggleTheme } = useTheme();

const base = ref(1);
const mode = ref("USD");
const rates = ref(null);
const loading = ref(false);
const error = ref(null);

const rateList = computed(() => {
  if (!rates.value) return [];

  return [
    {
      key: "usd",
      label: "USD Oficial (BCV)",
      rate: rates.value.bcv.usd
    },
    {
      key: "eur",
      label: "EUR Oficial (BCV)",
      rate: rates.value.bcv.eur
    },
    {
      key: "usdt",
      label: "USDT Binance",
      rate: rates.value.binance.usdt,
      diff: percentageDiff(
        rates.value.binance.usdt,
        rates.value.bcv.usd
      )
    },
    {
      key: "usdc",
      label: "USDC Binance",
      rate: rates.value.binance.usdc,
      diff: percentageDiff(
        rates.value.binance.usdc,
        rates.value.bcv.usd
      )
    },
    {
      key: "cash",
      label: "Compra efectivo (-15%)",
      rate: cashBuyPrice(rates.value.binance.usdt, 15)
    }
  ];
});


onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    rates.value = await getAllRates();
  } catch (err) {
    error.value = "No se pudieron cargar las tasas";
  } finally {
    loading.value = false;
  }
});

const diffUSDT = computed(() => {
  if (!rates.value) return null;
  return percentageDiff(
    rates.value.binance.usdt,
    rates.value.bcv.usd
  );
});

const diffUSDC = computed(() => {
  if (!rates.value) return null;
  return percentageDiff(
    rates.value.binance.usdc,
    rates.value.bcv.usd
  );
});

const cashUSDT = computed(() => {
  if (!rates.value) return null;
  return cashBuyPrice(rates.value.binance.usdt, 15);
});

const bestRateKey = computed(() => {
  if (!rateList.value.length) return null;

  const sorted = [...rateList.value].sort((a, b) =>
    mode.value === "USD"
      ? b.rate - a.rate
      : a.rate - b.rate
  );

  return sorted[0].key;
});

</script>
