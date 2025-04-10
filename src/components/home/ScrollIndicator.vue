<template>
  <div
    ref="scrollIndicatorRef"
    class="grid justify-items-center gap-2 col-span-full row-start-3 row-end-4 self-end pb-8"
  >
    <img :src="arrowDown" alt="Scroll Down" class="w-8 h-8 animate-bounce" />
    <span class="text-sm font-semibold">scroll down</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import arrowDown from "../../assets/images/icons/logos/arrow-down.svg";

const scrollIndicatorRef = ref(null);

// 暴露引用给父组件
defineExpose({
  scrollIndicatorRef,
});
</script>
