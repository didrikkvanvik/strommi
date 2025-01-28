<template>
  <div
    class="grid grid-cols-2 gap-4 !mt-4 sm:!mt-6 bg-black p-4 rounded-lg max-w-[34rem]"
  >
      <PriceCard :price="highestPrice" title="Høyeste" />
      <PriceCard :price="lowestPrice" title="Laveste" />
  </div>

  <div
    class="flex flex-col items-center justify-center gap-4 !mt-4 sm:!mt-6 bg-black p-4 rounded-lg"
  >
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 text-white text-xl md:text-xl cursor-pointer hover:text-green-500 transition-colors"
    >
      <span>Greit å vite</span>
      <svg
        class="w-5 h-5 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-show="isOpen"
        class="list-disc text-white text-xl md:text-xl space-y-2 pl-6"
      >
        <li>
          Strømstøtten er ikke trukket fra strømprisen. Selv ikke etter 1.
          september 2023, hvor strømstøtten beregnes time for time.
        </li>
        <li>
          Historiske data kan kun hentes tilbake til og med 1. desember 2021.
        </li>
        <li>
          Priser er uten mva. Husk også at NO4 (Nord-Norge) heller ikke betaler
          mva.
        </li>
        <li>Morgendagens strømpris kommer tidligst kl 13 dagen før.</li>
        <li>
          Strømprisene hentes fra ENTSO-E i euro, og konverterer selv til norske
          kroner med siste vekslingskurs fra Norges Bank.
        </li>
        <li>
          Prisene kan derfor avvike noe fra offisielle priser i norske kroner du
          for eksempel finner på Nord Pool, men grunnlaget og variasjonene er de
          samme.
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PriceCard from "@/components/PriceCard.vue";
defineProps<{
  highestPrice: { time: Date; value: number };
  lowestPrice: { time: Date; value: number };
}>();

const isOpen = ref(false);
</script>
