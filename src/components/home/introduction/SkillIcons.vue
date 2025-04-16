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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { logos } from "../../../constants/image";

// 所有技能圖標
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

const skillIconsLeftWrapperRef = ref(null);
const skillIconsRightWrapperRef = ref(null);

// 設置動畫
onMounted(() => {
  const leftWrapper = skillIconsLeftWrapperRef.value;
  const rightWrapper = skillIconsRightWrapperRef.value;

  if (!leftWrapper || !rightWrapper) return;

  // 使用類型斷言來處理DOM操作
  // 創建左側技能圖標向下滾動動畫
  // 獲取左側圖標組的父元素
  const leftIconGroups = (leftWrapper as HTMLElement).querySelectorAll(
    ".flex.flex-col"
  );
  const leftFirstGroup = leftIconGroups[0] as HTMLElement;
  const leftGroupHeight = leftFirstGroup.offsetHeight;

  // 對於左側向下滾動，設置初始位置為負值，讓第一組在視口外，第二組在視口內
  gsap.set(leftWrapper, { y: -leftGroupHeight });

  // 建立左側無限循環動畫
  gsap.to(leftWrapper, {
    y: "+=" + leftGroupHeight, // 向下滾動一個組的高度
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      y: (y) => {
        // 當y值超過預設範圍時，立即重置到初始位置
        const currentY = parseFloat(y);
        return (currentY % (leftGroupHeight * 2)) - leftGroupHeight + "px";
      },
    },
  });

  // 創建右側技能圖標向上滾動動畫
  const rightIconGroups = (rightWrapper as HTMLElement).querySelectorAll(
    ".flex.flex-col"
  );
  const rightFirstGroup = rightIconGroups[0] as HTMLElement;
  const rightGroupHeight = rightFirstGroup.offsetHeight;

  // 對於右側向上滾動，設置初始位置為0
  gsap.set(rightWrapper, { y: 0 });

  // 建立右側無限循環動畫
  gsap.to(rightWrapper, {
    y: "-=" + rightGroupHeight, // 向上滾動一個組的高度
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      y: (y) => {
        // 當y值超過預設範圍時，立即重置
        const currentY = parseFloat(y);
        const mod = currentY % (rightGroupHeight * 2);
        return mod + "px";
      },
    },
  });
});

// 暴露组件引用
defineExpose({
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
  .skill-icon {
    display: none !important;
  }
}
</style>
