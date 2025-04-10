<template>
  <div class="h-screen bg-orange-500 flex items-center"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 導出供父組件引用的元素
const avatarContainerRef = ref<HTMLElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);
const experienceRef = ref<HTMLElement | null>(null);

// 導出組件引用
defineExpose({
  avatarContainerRef,
  dialogRef,
  experienceRef,
});
</script>
