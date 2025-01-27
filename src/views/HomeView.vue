<script setup lang="ts">
import LineChart from "@/components/Chart.vue";
import { PRICE_AREA, useGetElectricity } from "@/hooks/useGetElectricty";

const { data, isLoading, error } = useGetElectricity({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  priceArea: PRICE_AREA.SOUTH_NORWAY,
});
</script>

<template>
  <main class="w-full flex-1 h-full max-w-[100rem] mx-auto">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-if="data" class="w-full h-full !mt-10 sm:!mt-22">
      <LineChart :chart-data="data" />
    </div>
  </main>
</template>
