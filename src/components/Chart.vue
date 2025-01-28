<template>
  <LineChart
    id="my-chart-id"
    :options="chartOptions"
    :data="formattedChartData"
  />
</template>

<script lang="ts">
import type { IElectricity } from "@/types";
import { formatDateHours } from "@/utils/date";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import type { PropType } from "vue";
import { Line as LineChart } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "ChartComponent",
  components: { LineChart },
  props: {
    chartData: {
      type: Array as PropType<IElectricity[]>,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: { parsed: { y: number } }) {
                return `Pris: ${context.parsed.y.toFixed(1)} øre/kWh`;
              },
              title: function (context: Array<{ label: string }>) {
                return `Kl ${context[0].label}`;
              },
            },
            padding: 12,
            borderWidth: 1,
            borderRadius: 16,
            borderColor: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleFont: {
              size: 18,
            },
            bodyFont: {
              size: 16,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (tickValue: number | string) {
                return `${tickValue} øre`;
              },
              font: {
                size: 16,
              },
            },
            title: {
              display: true,
              text: "Pris (øre/kWh)",
              font: {
                size: 18,
                weight: 600,
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 16,
              },
            },
            title: {
              display: true,
              text: "Tidspunkt",
              font: {
                size: 18,
                weight: 600,
              },
            },
          },
        },
      },
    };
  },
  computed: {
    formattedChartData() {
      return {
        labels: this.chartData.map((item: IElectricity) =>
          formatDateHours(item.time_start),
        ),
        datasets: [
          {
            label: "Strøm pris",
            borderColor: "#fff",
            borderWidth: 1,
            tension: 0.3,
            pointRadius: 4,
            backgroundColor: "#f87979",
            data: this.chartData.map(
              (item: IElectricity) => item.NOK_per_kWh * 100,
            ),
          },
        ],
      };
    },
  },
};
</script>
