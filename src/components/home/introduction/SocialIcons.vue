<template>
  <div class="absolute w-full h-full">
    <!-- 社交媒体图标 -->
    <div class="grid grid-cols-12 grid-rows-12 w-full h-full">
      <img
        v-for="(icon, name) in socialIcons"
        :key="`social-${name}`"
        :src="icon.src"
        :alt="name"
        :class="`social-icon w-full h-auto object-contain ${icon.position} ${icon.backgroundColor} p-2`"
        ref="socialIconRefs"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { socials } from "../../../constants/image";

// 社交图标位置信息
const socialIcons = {
  github: {
    src: socials.github,
    position: "col-start-2 col-end-3 row-start-2 row-end-3",
    backgroundColor: "bg-blue-500",
  },
  instagram: {
    src: socials.instgram,
    position: "col-start-2 col-end-3 row-start-9 row-end-10",
    backgroundColor: "bg-blue-500",
  },
  figma: {
    src: socials.figma,
    position: "col-start-10 col-end-11 row-start-5 row-end-6",
    backgroundColor: "bg-blue-500",
  },
  medium: {
    src: socials.medium,
    position: "col-start-10 col-end-12 row-start-9 row-end-11",
    backgroundColor: "bg-blue-500",
  },
};

const socialIconRefs = ref([]);

// 暴露组件引用
defineExpose({
  socialIconRefs,
});
</script>

<style scoped>
@media (max-width: 767px) {
  .social-icon {
    display: none !important;
  }
}
</style>
