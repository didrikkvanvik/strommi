<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <DataInfoCard :highest-price="highestPrice" :lowest-price="lowestPrice" />
  <div v-if="data" class="!mt-10 sm:!mt-22 w-full">
    <LineChart :chart-data="data" />
  </div>
</template>

<script setup lang="ts">
import LineChart from "@/components/Chart.vue";
import DataInfoCard from "@/components/DataInfoCard.vue";
import { axiosFetch } from "@/hooks/fetch";
import { PRICE_AREA, type IElectricity } from "@/types";
import { formatDateForEndpoint, isValidDate } from "@/utils/date";
import { useQuery } from "@tanstack/vue-query";
import { computed, watch } from "vue";

const props = defineProps<{
  date: Date;
}>();

const priceArea = PRICE_AREA.SOUTH_NORWAY;

const formattedDate = computed(() => formatDateForEndpoint(props.date));

const query = useQuery({
  queryKey: ["electricity", formattedDate.value, priceArea],
  queryFn: () =>
    axiosFetch<IElectricity[]>({
      url: `${formattedDate.value}_${priceArea}`,
    }),
  enabled: isValidDate({
    date: props.date,
    priceArea,
  }),
});

watch(
  () => props.date,
  () => {
    query.refetch();
  },
);

const { data, isLoading, error } = query;

const highestPrice = computed(() => {
  if (!data.value) return { time: new Date(), value: 0 };
  const prices = data.value.map((price) => ({
    time: new Date(price.time_start),
    value: price.NOK_per_kWh * 100
  }));
  return prices.reduce((max, current) => 
    current.value > max.value ? current : max
  , prices[0]);
});

const lowestPrice = computed(() => {
  if (!data.value) return { time: new Date(), value: 0 };
  const prices = data.value.map((price) => ({
    time: new Date(price.time_start),
    value: price.NOK_per_kWh * 100
  }));
  return prices.reduce((min, current) => 
    current.value < min.value ? current : min
  , prices[0]);
});
</script>
