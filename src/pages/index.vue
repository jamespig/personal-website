<template>
  <div class="h-screen w-full" ref="scrollContainer">
    <!-- 固定背景區域，會隨滾動變色 -->
    <div class="fixed top-0 left-0 w-full h-screen overflow-hidden">
      <!-- 使用单个div，通过GSAP直接改变背景色 -->
      <div
        ref="bgRef"
        class="absolute top-0 left-0 w-full h-screen bg-white"
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
        <!-- 头像容器，将两张图片放在一起进行切换 -->
        <div
          class="relative size-50 mb-5 rounded-full bg-white overflow-hidden"
        >
          <img
            ref="imageRef"
            src="../assets/images/head-shot/notion-face-cap-transparent.png"
            alt="James"
            class="size-50 object-contain absolute top-0 left-0"
          />
          <img
            ref="image404Ref"
            src="../assets/images/head-shot/notion-face-cap-404-transparent.png"
            alt="Developer"
            class="size-50 object-contain absolute top-0 left-0 opacity-0"
          />
        </div>
        <!-- 文字容器，這裡將放置兩個重疊的文本 -->
        <div class="relative flex items-center h-8 w-32 overflow-hidden">
          <h1
            ref="jamesTextRef"
            class="text-3xl font-bold absolute text-center w-full"
          >
            JAMES
          </h1>
          <h1
            ref="devTextRef"
            class="text-3xl font-bold absolute text-center w-full opacity-0"
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
        :class="`absolute size-16 object-contain ${icon.position}`"
        ref="skillIconRefs"
      />

      <!-- Social Media Icons -->
      <img
        v-for="(icon, name) in socialIcons"
        :key="`social-${name}`"
        :src="icon.src"
        :alt="name"
        :class="`absolute size-24 object-contain ${icon.position}`"
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

    <!-- 創建一個內容塊，用於生成滾動條和触发效果 -->
    <div class="h-[200vh]" ref="scrollContent">
      <!-- 第一屏空白區域 -->
      <div class="h-screen"></div>
      <!-- 第二屏空白區域 -->
      <div class="h-screen"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logos, socials } from "../constants/image";
import arrowDown from "../assets/images/icons/logos/arrow-down.svg";

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const icons = {
  arrowDown,
};

// Skill Icons 位置資訊
const skillIcons = {
  html: {
    src: logos.html,
    position: "md:top-[50%] md:right-[10%] top-[20%] right-[5%]",
  },
  css: {
    src: logos.css,
    position: "md:top-[20%] md:right-[15%] top-[10%] right-[10%]",
  },
  javascript: {
    src: logos.javascript,
    position: "md:bottom-[60%] md:left-[20%] bottom-[40%] left-[5%]",
  },
  typescript: {
    src: logos.typescript,
    position: "md:top-[20%] md:left-[55%] top-[10%] left-[50%]",
  },
  react: {
    src: logos.react,
    position: "md:top-[20%] md:left-[40%] top-[20%] left-[10%]",
  },
  vue: {
    src: logos.vue,
    position: "md:bottom-[20%] md:right-[40%] bottom-[15%] right-[32%]",
  },
  nuxt: {
    src: logos.nuxt,
    position: "md:top-[15%] md:left-[15%] top-[5%] left-[10%]",
  },
  next: {
    src: logos.next,
    position: "md:bottom-[20%] md:right-[30%] bottom-[20%] right-[15%]",
  },
  tailwindcss: {
    src: logos.tailwindcss,
    position: "md:top-[10%] md:right-[25%] top-[25%] right-[20%]",
  },
  vite: {
    src: logos.vite,
    position: "md:bottom-[25%] md:left-[30%] bottom-[15%] left-[25%]",
  },
  docker: {
    src: logos.docker,
    position: "md:top-[50%] md:left-[10%] top-[40%] left-[5%]",
  },
  pinia: {
    src: logos.pinia,
    position: "md:bottom-[15%] md:left-[40%] bottom-[10%] left-[35%]",
  },
};

// Social Icons 位置資訊
const socialIcons = {
  github: {
    src: socials.github,
    position: "md:top-[25%] md:left-[30%] top-[20%] left-[25%]",
  },
  instagram: {
    src: socials.instgram,
    position: "md:bottom-[30%] md:left-[15%] bottom-[20%] left-[10%]",
  },
  figma: {
    src: socials.figma,
    position: "md:top-[30%] md:right-[30%] top-[35%] right-[5%]",
  },
  medium: {
    src: socials.medium,
    position: "md:top-[70%] md:right-[10%] top-[60%] right-[5%]",
  },
};

// 建立參考
const skillIconRefs = ref([]);
const socialIconRefs = ref([]);
const bgRef = ref(null);
const jamesTextRef = ref(null);
const devTextRef = ref(null);
const scrollContainer = ref(null);
const scrollContent = ref(null);
const iAmTextRef = ref(null);
const scrollIndicatorRef = ref(null);
const imageRef = ref(null);
const image404Ref = ref(null);

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

  // 设置滚动触发动画
  if (scrollContainer.value && scrollContent.value) {
    // 直接使用window作为滚动容器以确保可以正常滚动
    ScrollTrigger.create({
      trigger: scrollContent.value,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // 确保滚动效果平滑
      onUpdate: (self) => {
        const progress = self.progress;

        // 背景颜色过渡 - 从白色到橙色
        if (bgRef.value) {
          const element = bgRef.value as HTMLElement;
          const redValue = 255;
          const greenValue = Math.max(255 - Math.round(progress * 100), 130);
          const blueValue = Math.max(255 - Math.round(progress * 220), 0);

          element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }

        // 图像过渡效果
        if (imageRef.value && image404Ref.value) {
          const normalImage = imageRef.value as HTMLElement;
          const image404 = image404Ref.value as HTMLElement;

          normalImage.style.opacity = `${1 - progress}`;
          image404.style.opacity = `${progress}`;
        }

        // 文字切換效果
        if (jamesTextRef.value && devTextRef.value) {
          const jamesText = jamesTextRef.value as HTMLElement;
          const devText = devTextRef.value as HTMLElement;

          jamesText.style.opacity = `${1 - progress}`;
          jamesText.style.transform = `translateY(${-50 * progress}px)`;

          devText.style.opacity = `${progress}`;
          devText.style.transform = `translateY(${50 - 50 * progress}px)`;
        }

        // 文字顏色變化 - 从黑色到白色
        const textElements = [
          iAmTextRef.value,
          jamesTextRef.value,
          devTextRef.value,
          scrollIndicatorRef.value,
        ];

        textElements.forEach((element) => {
          if (element) {
            const el = element as HTMLElement;
            const colorValue = Math.min(Math.round(255 * progress), 255);
            el.style.color = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
          }
        });
      },
    });
  }
});
</script>
