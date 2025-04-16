<template>
  <div class="absolute w-full h-full">
    <!-- 左側技能图标 - 向下滾動 -->
    <div class="skill-icons-container-left absolute left-4 md:left-8 top-0 z-0">
      <!-- 左側視口容器 -->
      <div
        class="skill-icons-viewport overflow-hidden h-screen"
        style="width: 80px"
      >
        <!-- 左側循環圖標組 -->
        <div class="skill-icons-wrapper-left" ref="skillIconsLeftWrapperRef">
          <!-- 預先添加一組，確保初始位置有圖標顯示 -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-left-${name}-pre`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
          <!-- 第一組圖標 -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-left-${name}`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
          <!-- 第二組圖標（與第一組相同，用於無縫循環） -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-left-${name}-dup`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
          <!-- 第三組圖標 -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-left-${name}-dup2`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 右側技能图标 - 向上滾動 -->
    <div
      class="skill-icons-container-right absolute right-4 md:right-8 top-0 z-0"
    >
      <!-- 右側視口容器 -->
      <div
        class="skill-icons-viewport overflow-hidden h-screen"
        style="width: 80px"
      >
        <!-- 右側循環圖標組 -->
        <div class="skill-icons-wrapper-right" ref="skillIconsRightWrapperRef">
          <!-- 預先添加一組，確保初始位置有圖標顯示 -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-right-${name}-pre`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
          <!-- 第一組圖標 -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-right-${name}`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
          <!-- 第二組圖標（與第一組相同，用於無縫循環） -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-right-${name}-dup`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
          <!-- 第三組圖標 -->
          <div class="flex flex-col items-center">
            <img
              v-for="(icon, name) in allSkillIcons"
              :key="`skill-right-${name}-dup2`"
              :src="icon.src"
              :alt="name"
              class="skill-icon w-16 h-16 object-contain p-2 bg-white my-2"
            />
          </div>
        </div>
      </div>
    </div>

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
import { logos, socials } from "../../constants/image";

// 將所有技能圖標放在一起
const allSkillIcons = {
  typescript: { src: logos.typescript },
  react: { src: logos.react },
  vue: { src: logos.vue },
  nuxt: { src: logos.nuxt },
  next: { src: logos.next },
  tailwindcss: { src: logos.tailwindcss },
  vite: { src: logos.vite },
  docker: { src: logos.docker },
};

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
const skillIconsLeftWrapperRef = ref(null);
const skillIconsRightWrapperRef = ref(null);

// 暴露组件引用
defineExpose({
  socialIconRefs,
  skillIconsLeftWrapperRef,
  skillIconsRightWrapperRef,
});
</script>

<style scoped>
/* 包装器样式确保图标可以无缝滚动 */
.skill-icons-wrapper-left,
.skill-icons-wrapper-right {
  position: relative;
  will-change: transform;
}

/* 视口容器遮挡溢出内容 */
.skill-icons-viewport {
  position: relative;
  overflow: hidden;
}

@media (max-width: 767px) {
  .skill-icon,
  .social-icon {
    display: none !important;
  }
}
</style>
