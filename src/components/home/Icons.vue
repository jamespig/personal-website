<template>
  <div class="absolute w-full h-full grid grid-cols-12 grid-rows-12">
    <!-- Skill Icons -->
    <img
      v-for="(icon, name) in skillIcons"
      :key="`skill-${name}`"
      :src="icon.src"
      :alt="name"
      :class="`skill-icon object-contain ${icon.position} p-2 ${icon.backgroundColor}`"
      ref="skillIconRefs"
    />

    <!-- Social Media Icons -->
    <img
      v-for="(icon, name) in socialIcons"
      :key="`social-${name}`"
      :src="icon.src"
      :alt="name"
      :class="`social-icon w-full h-auto object-contain ${icon.position} ${icon.backgroundColor} p-2`"
      ref="socialIconRefs"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { logos, socials } from "../../constants/image";

// Skill Icons 位置資訊
const skillIcons = {
  typescript: {
    src: logos.typescript,
    position: "col-start-7 col-end-9 row-start-0 row-end-2",
    backgroundColor: "bg-white",
  },
  react: {
    src: logos.react,
    position: "col-start-12 col-end-13 row-start-4 row-end-5",
    backgroundColor: "bg-white",
  },
  vue: {
    src: logos.vue,
    position: "col-start-10 col-end-13 row-start-8 row-end-11",
    backgroundColor: "bg-white",
  },
  nuxt: {
    src: logos.nuxt,
    position: "col-start-1 col-end-3 row-start-2 row-end-4",
    backgroundColor: "bg-white",
  },
  next: {
    src: logos.next,
    position: "col-start-8 col-end-9 row-start-11 row-end-12",
    backgroundColor: "bg-white",
  },
  tailwindcss: {
    src: logos.tailwindcss,
    position: "col-start-5 col-end-6 row-start-2 row-end-3",
    backgroundColor: "bg-white",
  },
  vite: {
    src: logos.vite,
    position: "col-start-3 col-end-4 row-start-10 row-end-11",
    backgroundColor: "bg-white",
  },
  docker: {
    src: logos.docker,
    position: "col-start-1 col-end-2 row-start-10 row-end-11",
    backgroundColor: "bg-white",
  },
};

// Social Icons 位置資訊
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

const skillIconRefs = ref([]);
const socialIconRefs = ref([]);

// 暴露图标引用给父组件
defineExpose({
  skillIconRefs,
  socialIconRefs,
});
</script>

<style scoped>
@media (max-width: 767px) {
  .skill-icon,
  .social-icon {
    display: none !important;
  }
}
</style>
