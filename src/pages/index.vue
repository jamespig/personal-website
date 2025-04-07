<template>
  <div class="h-screen w-full overflow-auto" ref="scrollContainer">
    <!-- 固定背景區域，會隨滾動變色 -->
    <div class="fixed top-0 left-0 w-full h-screen overflow-hidden">
      <!-- 白色背景 -->
      <div
        ref="whiteBgRef"
        class="absolute top-0 left-0 w-full h-screen bg-white"
      ></div>
      <!-- 黄色背景，初始位置在屏幕下方 -->
      <div
        ref="yellowBgRef"
        class="absolute top-0 left-0 w-full h-screen bg-yellow-500 translate-y-full"
      ></div>
    </div>

    <!-- 固定內容區域，不隨滾動移動 -->
    <div
      class="fixed top-0 left-0 w-full h-screen flex justify-center items-center"
    >
      <!-- 中心人物和文字 -->
      <div class="z-10 flex flex-col items-center md:flex-row gap-4">
        <div class="flex items-center h-8">
          <h1 ref="iAmTextRef" class="text-3xl font-bold">I AM</h1>
        </div>
        <img
          src="../assets/images/head-shot/notion-face-cap-transparent.png"
          alt="James"
          class="size-50 object-contain mb-5 rounded-full bg-white"
        />
        <!-- 文字容器，這裡將放置兩個重疊的文本 -->
        <div class="relative flex items-center h-8 w-32 overflow-hidden">
          <!-- JAMES，會隨滾動淡出 -->
          <h1
            ref="jamesTextRef"
            class="text-3xl font-bold absolute text-center w-full"
          >
            JAMES
          </h1>
          <!-- DEVELOPER，初始透明，會隨滾動淡入 -->
          <h1
            ref="devTextRef"
            class="text-3xl font-bold absolute text-center w-full translate-y-full"
          >
            DEVELOPER
          </h1>
        </div>
      </div>

      <!-- Skill Icons -->
      <img
        v-for="(icon, name) in skillIcons"
        :key="`skill-${name}`"
        :src="icon.src"
        :alt="name"
        :class="`absolute size-8 object-contain ${icon.position}`"
        ref="skillIconRefs"
      />

      <!-- Social Media Icons -->
      <img
        v-for="(icon, name) in socialIcons"
        :key="`social-${name}`"
        :src="icon.src"
        :alt="name"
        :class="`absolute size-10 object-contain ${icon.position}`"
        ref="socialIconRefs"
      />

      <!-- 向下滚动指示 -->
      <div
        ref="scrollIndicatorRef"
        class="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <img
          :src="icons.arrowDown"
          alt="Scroll Down"
          class="w-8 h-8 animate-bounce"
        />
        <span class="text-sm font-semibold">scroll down</span>
      </div>
    </div>

    <!-- 創建一個隱藏的內容塊，只用於生成滾動條 -->
    <div
      class="h-[200vh] opacity-0 pointer-events-none"
      aria-hidden="true"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { logos, socials } from "../constants/image";
import arrowDown from "../assets/images/icons/logos/arrow-down.svg";

const icons = {
  arrowDown,
};

// Skill Icons 位置資訊
const skillIcons = {
  html: {
    src: logos.html,
    position: "top-[50%] right-[10%]",
  },
  css: {
    src: logos.css,
    position: "top-[20%] right-[15%]",
  },
  javascript: {
    src: logos.javascript,
    position: "bottom-[60%] left-[20%]",
  },
  typescript: {
    src: logos.typescript,
    position: "top-[20%] left-[60%]",
  },
  react: {
    src: logos.react,
    position: "top-[20%] left-[40%]",
  },
  vue: {
    src: logos.vue,
    position: "bottom-[20%] right-[40%]",
  },
  nuxt: {
    src: logos.nuxt,
    position: "top-[15%] left-[15%]",
  },
  next: {
    src: logos.next,
    position: "bottom-[20%] right-[30%]",
  },
  tailwindcss: {
    src: logos.tailwindcss,
    position: "top-[30%] right-[25%]",
  },
  vite: {
    src: logos.vite,
    position: "bottom-[25%] left-[30%]",
  },
  docker: {
    src: logos.docker,
    position: "top-[50%] left-[10%]",
  },
  pinia: {
    src: logos.pinia,
    position: "bottom-[15%] left-[40%]",
  },
};

// Social Icons 位置資訊
const socialIcons = {
  github: {
    src: socials.github,
    position: "top-[25%] left-[30%]",
  },
  instagram: {
    src: socials.instgram,
    position: "bottom-[30%] left-[15%]",
  },
  figma: {
    src: socials.figma,
    position: "top-[40%] right-[20%]",
  },
  medium: {
    src: socials.medium,
    position: "top-[70%] right-[10%]",
  },
};

// 建立參考
const skillIconRefs = ref([]);
const socialIconRefs = ref([]);
const whiteBgRef = ref(null);
const yellowBgRef = ref(null);
const jamesTextRef = ref(null);
const devTextRef = ref(null);
const scrollContainer = ref(null);
const iAmTextRef = ref(null);
const scrollIndicatorRef = ref(null);

onMounted(() => {
  // 取得所有icon元素
  const allIcons = [...skillIconRefs.value, ...socialIconRefs.value];

  // 設定初始位置（在螢幕上方）
  gsap.set(allIcons, {
    y: -100,
    opacity: 0,
  });

  // 動畫時間線
  const tl = gsap.timeline({
    defaults: {
      duration: 1.5,
      ease: "bounce.out",
    },
  });

  // 添加圖標掉落動畫，隨機時間錯開
  allIcons.forEach((icon) => {
    tl.to(
      icon,
      {
        y: 0,
        opacity: 1,
        delay: Math.random() * 0.5, // 隨機延遲，創造錯落感
      },
      Math.random() * 0.5 // 在時間線上隨機位置開始
    );
  });

  // 使用窗口滾動事件來觸發動畫
  if (scrollContainer.value) {
    const container = scrollContainer.value as HTMLElement;
    const maxScroll = container.scrollHeight - container.clientHeight;

    container.addEventListener("scroll", () => {
      const scrollTop = container.scrollTop;
      const progress = Math.min(scrollTop / maxScroll, 1);

      // 背景轮播效果
      if (whiteBgRef.value && yellowBgRef.value) {
        gsap.to(whiteBgRef.value, {
          y: -100 * progress + "%",
          duration: 0.3,
          ease: "power1.out",
        });

        gsap.to(yellowBgRef.value, {
          y: (1 - progress) * 100 + "%",
          duration: 0.3,
          ease: "power1.out",
        });
      }

      // 文字切換 - 使用 GSAP 的 carousel 效果
      if (jamesTextRef.value && devTextRef.value) {
        gsap.to(jamesTextRef.value, {
          y: -100 * progress, // 向上移出
          opacity: 1 - progress,
          duration: 0.3,
          ease: "power1.out",
        });

        gsap.to(devTextRef.value, {
          y: 100 - 100 * progress, // 從下方移入
          opacity: progress,
          duration: 0.3,
          ease: "power1.out",
        });
      }

      // 文字顏色變化 - 從黑色到白色
      const textElements = [
        iAmTextRef.value,
        jamesTextRef.value,
        devTextRef.value,
        scrollIndicatorRef.value,
      ];
      textElements.forEach((element) => {
        if (element) {
          // 計算顏色過渡: 從rgb(0,0,0)到rgb(255,255,255)
          const colorValue = Math.min(Math.round(255 * progress), 255);
          (
            element as HTMLElement
          ).style.color = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        }
      });
    });
  }
});
</script>
