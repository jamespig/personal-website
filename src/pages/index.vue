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
      class="fixed top-0 left-0 w-full h-screen grid grid-cols-[minmax(300px,800px)_1fr] md:grid-cols-[0.5fr_minmax(300px,600px)_2fr] grid-rows-[1fr_auto_1fr]"
    >
      <!-- 中心人物和文字 - 在移动端使用垂直布局，在桌面端使用水平布局 -->
      <div
        class="z-10 flex flex-col items-center md:grid md:grid-cols-3 gap-8 md:gap-4 justify-center col-start-1 col-end-2 md:col-start-2 md:col-end-3 row-start-2 row-end-3 py-10 md:pl-0"
      >
        <!-- I AM 文字 -->
        <div class="flex items-center justify-center md:justify-self-end">
          <h1 ref="iAmTextRef" class="text-3xl font-bold">I AM</h1>
        </div>

        <!-- 头像容器 -->
        <div
          class="max-w-40 md:max-w-full w-full aspect-square bg-white relative self-center"
        >
          <img
            ref="imageRef"
            src="../assets/images/head-shot/notion-face-cap-transparent.png"
            alt="James"
            class="w-full h-full object-contain absolute top-0 left-0"
          />
          <img
            ref="image404Ref"
            src="../assets/images/head-shot/notion-face-cap-404-transparent.png"
            alt="Developer"
            class="w-full h-full object-contain absolute top-0 left-0 opacity-0"
          />
        </div>

        <!-- JAMES/DEVELOPER 文字容器 -->
        <div
          class="flex items-center justify-center md:justify-self-start relative w-full"
        >
          <!-- 添加一个空白占位元素，让绝对定位元素有足够的高度 -->
          <div class="invisible h-12 md:h-auto">JAMES</div>
          <h1
            ref="jamesTextRef"
            class="text-3xl md:text-9xl font-bold absolute text-center w-full left-0"
          >
            JAMES
          </h1>
          <h1
            ref="devTextRef"
            class="text-3xl md:text-9xl font-bold absolute text-center w-full opacity-0 left-0"
          >
            DEVELOPER
          </h1>
        </div>
      </div>

      <!-- 创建一个包含所有图标的网格容器 -->
      <div class="absolute w-full h-full grid grid-cols-12 grid-rows-12">
        <!-- Skill Icons  -->
        <img
          v-for="(icon, name) in skillIcons"
          :key="`skill-${name}`"
          :src="icon.src"
          :alt="name"
          :class="`w-10 h-10 md:size-16 object-contain ${icon.position} opacity-30 md:opacity-100`"
          ref="skillIconRefs"
        />

        <!-- Social Media Icons -->
        <img
          v-for="(icon, name) in socialIcons"
          :key="`social-${name}`"
          :src="icon.src"
          :alt="name"
          :class="`w-full h-full object-contain ${icon.position} opacity-30 md:opacity-100`"
          ref="socialIconRefs"
        />
      </div>

      <!-- 向下滚动指示 -->
      <div
        ref="scrollIndicatorRef"
        class="grid justify-items-center gap-2 col-span-full row-start-3 row-end-4 self-end pb-8"
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
    position: "col-start-10 col-end-11 row-start-6 row-end-7", // 右侧中间
  },
  css: {
    src: logos.css,
    position: "col-start-9 col-end-10 row-start-2 row-end-3", // 右上
  },
  javascript: {
    src: logos.javascript,
    position: "col-start-3 col-end-4 row-start-5 row-end-6", // 左侧中间
  },
  typescript: {
    src: logos.typescript,
    position: "col-start-7 col-end-8 row-start-2 row-end-3", // 上方中间偏右
  },
  react: {
    src: logos.react,
    position: "col-start-4 col-end-5 row-start-3 row-end-4", // 左上方
  },
  vue: {
    src: logos.vue,
    position: "col-start-8 col-end-9 row-start-9 row-end-10", // 右下方
  },
  nuxt: {
    src: logos.nuxt,
    position: "col-start-3 col-end-4 row-start-2 row-end-3", // 左上
  },
  next: {
    src: logos.next,
    position: "col-start-9 col-end-10 row-start-9 row-end-10", // 右下
  },
  tailwindcss: {
    src: logos.tailwindcss,
    position: "col-start-9 col-end-10 row-start-3 row-end-4", // 右上方
  },
  vite: {
    src: logos.vite,
    position: "col-start-4 col-end-5 row-start-9 row-end-10", // 左下方
  },
  docker: {
    src: logos.docker,
    position: "col-start-2 col-end-3 row-start-6 row-end-7", // 左侧中间
  },
  pinia: {
    src: logos.pinia,
    position: "col-start-5 col-end-6 row-start-10 row-end-11", // 左下
  },
};

// Social Icons 位置資訊
const socialIcons = {
  github: {
    src: socials.github,
    position: "col-start-4 col-end-6 row-start-3 row-end-5", // 左上方中间
  },
  instagram: {
    src: socials.instgram,
    position: "col-start-2 col-end-4 row-start-7 row-end-10", // 左下方
  },
  figma: {
    src: socials.figma,
    position: "col-start-9 col-end-10 row-start-5 row-end-6", // 右上方
  },
  medium: {
    src: socials.medium,
    position: "col-start-10 col-end-12 row-start-9 row-end-11", // 右下方
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
  const allSocialIcons = [...socialIconRefs.value];
  const allSkillIcons = [...skillIconRefs.value];

  // 設定初始位置 - 社交图标从上方掉落
  gsap.set(allSocialIcons, {
    y: -100,
    opacity: 0,
  });

  // 技能图标初始隐藏
  gsap.set(allSkillIcons, {
    opacity: 0,
    scale: 0.5,
  });

  // 動畫時間線 - 只有社交图标有初始动画
  const tl = gsap.timeline({
    defaults: {
      duration: 1.5,
      ease: "bounce.out",
    },
  });

  // 添加社交圖標掉落動畫，隨機時間錯開
  allSocialIcons.forEach((icon) => {
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

        // 技能图标显示效果 - 随着滚动逐渐显示
        allSkillIcons.forEach((icon) => {
          if (icon) {
            const el = icon as HTMLElement;
            // 只有当progress超过0.1后才开始显示
            const iconOpacity = progress < 0.1 ? 0 : Math.min(progress * 2, 1);
            const iconScale = 0.5 + progress * 0.5;
            el.style.opacity = `${iconOpacity}`;
            el.style.transform = `scale(${iconScale})`;
          }
        });

        // 社交图标隐藏效果 - 随着滚动逐渐隐藏
        allSocialIcons.forEach((icon) => {
          if (icon) {
            const el = icon as HTMLElement;
            // 随着滚动进度增加，社交图标逐渐隐藏
            const iconOpacity = Math.max(1 - progress * 2, 0);
            el.style.opacity = `${iconOpacity}`;
          }
        });

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
