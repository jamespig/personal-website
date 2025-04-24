<template>
  <footer class="bg-black flex flex-col gap-2 p-6">
    <header class="flex justify-end items-center px-2 py-4">
      <button class="bg-white rounded-lg px-2 py-4">
        <ArrowUp :size="30" :stroke-width="2" />
      </button>
    </header>
    <main class="flex flex-col items-center justify-center">
      <img :src="jamespig" loading="lazy" alt="big logo" class="w-auto h-45" />
    </main>
    <footer
      class="flex justify-center items-center px-4 py-2 border-2 border-white rounded-lg"
    >
      <h1 class="text-3xl font-bold text-white">2025 Design by JamesPig</h1>
    </footer>
  </footer>
</template>

<script lang="ts" setup>
import jamespig from "../../assets/images/imagery/Jamespig.svg";
import { ArrowUp } from "lucide-vue-next";
</script>

<style lang="scss" scoped></style>
