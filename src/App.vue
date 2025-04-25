<template>
  <div class="min-h-screen bg-black">
    <Header />
    <VueLenis root>
      <main>
        <RouterView />
      </main>
      <Footer />
    </VueLenis>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";
import { VueLenis } from "lenis/vue";
</script>

<style scoped></style>
