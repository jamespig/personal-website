<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white rounded-b-lg shadow-2xl"
  >
    <img :src="jamespig" alt="big logo" class="w-auto h-10" />
    <nav>
      <ul class="flex items-center gap-4">
        <li
          v-for="route in routes"
          :key="route.path"
          class="text-base font-bold hover:shadow-inner transition-all duration-300 px-2 py-1 rounded-md"
        >
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import jamespig from "../../assets/images/imagery/Jamespig.svg";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Portfolio",
    path: "/portfolio",
  },
];
</script>

<style lang="scss" scoped></style>
