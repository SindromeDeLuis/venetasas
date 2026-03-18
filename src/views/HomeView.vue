<template>
  <div class="container">
    
    <div class="app-header2">

      <!-- Input base -->
      <BaseInput
        v-model="base"
        v-model:mode="mode"
      />
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border" role="status"></div>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-center py-5">
      <div class="mb-3">
        <span class="display-1 text-danger">⚠️</span>
      </div>
      <h4 class="fw-bold">¡Ups! Algo salió mal</h4>
      <p class="text-muted">{{ error }}</p>
      <button 
        class="btn btn-primary rounded-pill px-4 mt-2 shadow-sm" 
        @click="fetchRates"
      >
        🔄 Reintentar
      </button>
    </div>

    <!-- Rates -->
    <div
      v-for="section in rateList"
      :key="section.key"
      class="mb-4 px-1"
    >

      <!-- Header de la sección -->
      <SectionHeader
        :title="section.title"
        :updated-at="section.updatedAt"
      />

      <!-- Cards -->
      <div class="row g-2">
        <div
          v-for="item in section.items"
          :key="item.key"
          class="col-6 col-md-3"
        >
          <RateCard
            :title="item.label"
            :rate="item.rate"
            :value="convert(base, item.rate, mode)"
            :diff="item.diff"
            :variation="item.variation"
            :mode="mode"
            :highlight="item.key === bestRateKey"
            :updatedAt="section.updatedAt"
            :hot="item.diff && Math.abs(item.diff) <= HOT_THRESHOLD"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import BaseInput from "@/components/BaseInput.vue";
import RateCard from "@/components/RateCard.vue";
import SectionHeader from '@/components/SectionHeader.vue'

import { getAllRates } from "@/services/rates.service";
import {
  percentageDiff,
  cashBuyPrice,
  convert
} from "@/utils/calculations";

const base = ref(1);
const mode = ref("USD");
const rates = ref(null);

const bcvUpdatedAt = ref(null)
const binanceUpdatedAt = ref(null)

const loading = ref(false);
const error = ref(null);

const HOT_THRESHOLD = 35;

const rateList = computed(() => {
  if (!rates.value) return [];

  return [
    {
      key: 'bcv',
      title: 'BCV',
      updatedAt: bcvUpdatedAt.value,
      items: [
        {
          key: "usd",
          label: "USD Oficial",
          rate: rates.value.bcv.usd,
          variation: rates.value.bcv.changePercentage.usd
        },
        {
          key: "eur",
          label: "EUR Oficial",
          rate: rates.value.bcv.eur,
          variation: rates.value.bcv.changePercentage.eur
        }
      ],
    },
    {
      key: 'binance',
      title: 'Binance P2P',
      updatedAt: binanceUpdatedAt.value,
      items: [
        {
          key: "usdtbuy",
          label: "USDT Compra",
          rate: rates.value.binance.usdt.buy,
          diff: percentageDiff(
            rates.value.binance.usdt.buy,
            rates.value.bcv.usd
          )
        },
        {
          key: "usdtsell",
          label: "USDT Venta",
          rate: rates.value.binance.usdt.sell,
          diff: percentageDiff(
            rates.value.binance.usdt.sell,
            rates.value.bcv.usd
          )
        },
        {
          key: "usdcbuy",
          label: "USDC Compra",
          rate: rates.value.binance.usdc.buy,
          diff: percentageDiff(
            rates.value.binance.usdc.buy,
            rates.value.bcv.usd
          )
        },
        {
          key: "usdcsell",
          label: "USDC Venta",
          rate: rates.value.binance.usdc.sell,
          diff: percentageDiff(
            rates.value.binance.usdc.sell,
            rates.value.bcv.usd
          )
        },
      ]
    },
    {
      key: 'cash',
      title: 'Indicadores de compra en efectivo',
      items: [
        {
          key: "cash0",
          label: "USDT -10%",
          rate: cashBuyPrice(rates.value.binance.usdt.sell, 10),
          diff: percentageDiff(
            cashBuyPrice(rates.value.binance.usdt.sell, 10),
            rates.value.bcv.usd
          )
        },
        {
          key: "cash1",
          label: "USDT -15%",
          rate: cashBuyPrice(rates.value.binance.usdt.sell, 15),
          diff: percentageDiff(
            cashBuyPrice(rates.value.binance.usdt.sell, 15),
            rates.value.bcv.usd
          )
        },
        {
          key: "cash2",
          label: "BCV +35%",
          rate: cashBuyPrice(rates.value.bcv.usd, -35),
          diff: percentageDiff(
            cashBuyPrice(rates.value.bcv.usd, -35),
            rates.value.bcv.usd
          )
        },
      ]
    }
  ];
});

const fetchRates = async () => {
  loading.value = true;
  error.value = null;
  rates.value = null; // Limpiamos datos previos

  try {
    rates.value = await getAllRates();
    bcvUpdatedAt.value = rates.value.bcv.updatedAt;
    binanceUpdatedAt.value = rates.value.binance.updatedAt;
  } catch (err) {
    // Aquí puedes capturar el mensaje real si lo deseas
    error.value = "No se pudieron cargar las tasas. Intenta de nuevo.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const bestRateKey = computed(() => {
  const binanceSection = rateList.value.find(
    s => s.key === 'binance'
  )

  if (!binanceSection?.items?.length) return null;

  const sorted = [...binanceSection.items].sort((a, b) =>
    mode.value === "USD"
      ? b.rate - a.rate
      : a.rate - b.rate
  );

  return sorted[0].key;
});

onMounted(fetchRates);
</script>
