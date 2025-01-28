<script setup lang="ts">
import ChartContainer from "@/components/ChartContainer.vue";
import Datepicker from "@vuepic/vue-datepicker";
import { ref } from "vue";

const date = ref(new Date());
const minDate = new Date("2021-12-01");
const now = new Date();
const maxDate = new Date();

if (now.getHours() >= 13) {
  maxDate.setDate(maxDate.getDate() + 1);
}
</script>

<template>
  <main
    class="w-full flex-1 h-full max-w-[100rem] mx-auto flex items-center flex-col"
  >
    <p
      class="font-medium text-green-500 text-xl md:text-xl self-center italic !mt-8 text-center"
    >
      Strømmi er en enkel side for å se prisen på strøm i Norge.
    </p>
    <div class="flex flex-col w-full h-full !mt-10 items-center">
      <Datepicker
        v-model="date"
        :enable-time-picker="false"
        :min-date="minDate"
        :max-date="maxDate"
        :day-picker="true"
        class="sm:max-w-[14rem] self-center"
      />
      <ChartContainer :date="date" />
    </div>
  </main>
</template>
