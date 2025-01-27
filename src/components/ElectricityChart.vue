<template>
  <Bar :id="chartId" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { ref } from "vue";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const chartId = "my-chart-id";
const chartData = ref();

const chartOptions = ref({
  responsive: true,
});
</script>
