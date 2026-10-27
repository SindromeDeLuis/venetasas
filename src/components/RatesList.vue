<template>
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
</template>

<script setup>
import { computed } from "vue";

import SectionHeader from '@/components/SectionHeader.vue'
import RateCard from "@/components/RateCard.vue";

import {
  percentageDiff,
  cashBuyPrice,
  convert
} from "@/utils/calculations";

const props = defineProps({
  rates: {
    type: Object,
    required: true
  },
  base: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
})

const HOT_THRESHOLD = 35;
const MAX_USDT = 96;

const rateList = computed(() => {
  if (!props.rates) return [];

  return [
    {
      key: 'bcv',
      title: 'BCV',
      updatedAt: props.rates.bcv.updatedAt,
      items: [
        {
          key: "usd",
          label: "USD Oficial",
          rate: props.rates.bcv.usd,
          variation: props.rates.bcv.changePercentage.usd
        },
        {
          key: "eur",
          label: "EUR Oficial",
          rate: props.rates.bcv.eur,
          variation: props.rates.bcv.changePercentage.eur,
          diff: percentageDiff(
            props.rates.bcv.eur,
            props.rates.bcv.usd
          )
        }
      ],
    },
    {
      key: 'binance',
      title: 'Binance P2P',
      updatedAt: props.rates.binance.updatedAt,
      items: [
        {
          key: "usdtbuy",
          label: "USDT Compra",
          rate: props.rates.binance.usdt.buy,
          diff: percentageDiff(
            props.rates.binance.usdt.buy,
            props.rates.bcv.usd
          )
        },
        {
          key: "usdtsell",
          label: "USDT Venta",
          rate: props.rates.binance.usdt.sell,
          diff: percentageDiff(
            props.rates.binance.usdt.sell,
            props.rates.bcv.usd
          )
        }/*,
        {
          key: "usdcbuy",
          label: "USDC Compra",
          rate: props.rates.binance.usdc.buy,
          diff: percentageDiff(
            props.rates.binance.usdc.buy,
            props.rates.bcv.usd
          )
        },
        {
          key: "usdcsell",
          label: "USDC Venta",
          rate: props.rates.binance.usdc.sell,
          diff: percentageDiff(
            props.rates.binance.usdc.sell,
            props.rates.bcv.usd
          )
        },*/
      ]
    },
    {
      key: 'airtm',
      title: 'AirTM',
      updatedAt: props.rates.airtm.updatedAt,
      items: [
        {
          key: "airtm_deposit",
          label: "USDC Deposito",
          rate: props.rates.airtm.usdc.buy,
          diff: percentageDiff(
            props.rates.airtm.usdc.buy,
            props.rates.bcv.usd
          )
        },
        {
          key: "airtm_withdraw",
          label: "USDC Retiro",
          rate: props.rates.airtm.usdc.sell,
          diff: percentageDiff(
            props.rates.airtm.usdc.sell,
            props.rates.bcv.usd
          )
        },
      ]
    },
    {
      key: 'cash',
      title: 'Indicadores de compra en efectivo',
      items: [
        {
          key: "cashWU",
          label: "WU",
          rate: cashBuyPrice(props.rates.bcv.usd, -9) * 100 / MAX_USDT,
          diff: percentageDiff(
            cashBuyPrice(props.rates.bcv.usd, -9) * 100 / MAX_USDT,
            props.rates.bcv.usd
          )
        },
        {
          key: "cash5",
          label: "USDT -5%",
          rate: cashBuyPrice(props.rates.binance.usdt.sell, 5),
          diff: percentageDiff(
            cashBuyPrice(props.rates.binance.usdt.sell, 5),
            props.rates.bcv.usd
          )
        },
        {
          key: "cash10",
          label: "USDT -10%",
          rate: cashBuyPrice(props.rates.binance.usdt.sell, 10),
          diff: percentageDiff(
            cashBuyPrice(props.rates.binance.usdt.sell, 10),
            props.rates.bcv.usd
          )
        },
        {
          key: "cash15",
          label: "USDT -15%",
          rate: cashBuyPrice(props.rates.binance.usdt.sell, 15),
          diff: percentageDiff(
            cashBuyPrice(props.rates.binance.usdt.sell, 15),
            props.rates.bcv.usd
          )
        },
        {
          key: "cash35",
          label: "BCV +35%",
          rate: cashBuyPrice(props.rates.bcv.usd, -35),
          diff: percentageDiff(
            cashBuyPrice(props.rates.bcv.usd, -35),
            props.rates.bcv.usd
          )
        },
      ]
    }
  ];
});

const bestRateKey = computed(() => {
  const binanceSection = rateList.value.find(
    s => s.key === 'binance'
  )

  if (!binanceSection?.items?.length) return null;

  const sorted = [...binanceSection.items].sort((a, b) =>
    props.mode === "USD"
      ? b.rate - a.rate
      : a.rate - b.rate
  );

  return sorted[0].key;
});
</script>