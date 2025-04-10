<template>
  <div class="fixed top-0 left-0 w-full h-screen overflow-hidden">
    <div
      ref="bgRef"
      class="absolute top-0 left-0 w-full h-screen bg-white"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const bgRef = ref(null);

// 暴露背景元素引用给父组件
defineExpose({
  bgRef,
});
</script>
