<template>
    <div class="text-white text-xl md:text-xl flex flex-col gap-2 w-full sm:min-w-[14rem]">
      <span class="!font-bold">{{ title }}</span>

      <span>Tid: {{ formatDateHours(price.time) }}</span>

      <div class="flex flex-row gap-2">
        <p>Pris:</p>
      <span
        :class="{
          'text-green-500': price.value < 100,
          'text-yellow-500': price.value > 100,
          'text-red-500': price.value > 300,
        }"
          >{{ price.value.toFixed(2) }} kr/kWh</span
        >
      </div>
    </div>
</template>

<script setup lang="ts">
import { formatDateHours } from "@/utils/date";
defineProps<{
  price: { time: Date; value: number };
  title: string;
}>();
</script>
