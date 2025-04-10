<template>
  <div class="absolute w-full h-full grid grid-cols-12 grid-rows-12">
    <!-- Skill Icons -->
    <img
      v-for="(icon, name) in skillIcons"
      :key="`skill-${name}`"
      :src="icon.src"
      :alt="name"
      :class="`object-contain ${icon.position} opacity-30 md:opacity-100 p-2 rounded-full shadow-2xl`"
      ref="skillIconRefs"
    />

    <!-- Social Media Icons -->
    <img
      v-for="(icon, name) in socialIcons"
      :key="`social-${name}`"
      :src="icon.src"
      :alt="name"
      :class="`w-full h-auto rounded-full object-contain ${icon.position} opacity-30 md:opacity-100 p-2 shadow-2xl`"
      ref="socialIconRefs"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { logos, socials } from "../../constants/image";

// Skill Icons 位置資訊
const skillIcons = {
  html: {
    src: logos.html,
    position: "col-start-3 col-end-4 row-start-1 row-end-2",
  },
  css: {
    src: logos.css,
    position: "col-start-10 col-end-11 row-start-3 row-end-4",
  },
  javascript: {
    src: logos.javascript,
    position: "col-start-2 col-end-3 row-start-7 row-end-8",
  },
  typescript: {
    src: logos.typescript,
    position: "col-start-7 col-end-9 row-start-1 row-end-3",
  },
  react: {
    src: logos.react,
    position: "col-start-12 col-end-13 row-start-4 row-end-5",
  },
  vue: {
    src: logos.vue,
    position: "col-start-10 col-end-13 row-start-8 row-end-11",
  },
  nuxt: {
    src: logos.nuxt,
    position: "col-start-1 col-end-3 row-start-2 row-end-4",
  },
  next: {
    src: logos.next,
    position: "col-start-8 col-end-9 row-start-11 row-end-12",
  },
  tailwindcss: {
    src: logos.tailwindcss,
    position: "col-start-5 col-end-6 row-start-2 row-end-3",
  },
  vite: {
    src: logos.vite,
    position: "col-start-4 col-end-5 row-start-9 row-end-10",
  },
  docker: {
    src: logos.docker,
    position: "col-start-1 col-end-2 row-start-10 row-end-11",
  },
};

// Social Icons 位置資訊
const socialIcons = {
  github: {
    src: socials.github,
    position: "col-start-2 col-end-3 row-start-2 row-end-3",
  },
  instagram: {
    src: socials.instgram,
    position: "col-start-3 col-end-4 row-start-9 row-end-10",
  },
  figma: {
    src: socials.figma,
    position: "col-start-10 col-end-11 row-start-5 row-end-6",
  },
  medium: {
    src: socials.medium,
    position: "col-start-10 col-end-12 row-start-9 row-end-11",
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
