<template>
  <div class="flex flex-col h-screen bg-[#6E163C]">
    <img :src="portfolio" loading="lazy" alt="portfolio" class="w-auto h-45" />
  </div>
</template>

<script lang="ts" setup>
import portfolio from "../../assets/images/imagery/Portfolio.svg";
</script>
