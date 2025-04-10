<template>
  <div class="h-screen w-full" ref="scrollContainer">
    <Background ref="backgroundRef" />

    <div
      class="fixed top-0 left-0 w-full h-screen grid grid-cols-[minmax(300px,800px)_1fr] md:grid-cols-[0.5fr_minmax(300px,600px)_2fr] grid-rows-[1fr_auto_1fr]"
    >
      <CenterContent ref="centerContentRef" />
      <Icons ref="iconsRef" />
      <ScrollIndicator ref="scrollIndicatorRef" />
    </div>

    <div class="h-[200vh]" ref="scrollContent">
      <div class="h-screen"></div>
      <div class="h-screen"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "../components/home/Background.vue";
import CenterContent from "../components/home/CenterContent.vue";
import Icons from "../components/home/Icons.vue";
import ScrollIndicator from "../components/home/ScrollIndicator.vue";

// 定義組件類型
interface BackgroundComponent {
  bgRef: HTMLElement;
}

interface CenterContentComponent {
  iAmTextRef: HTMLElement;
  jamesTextRef: HTMLElement;
  devTextRef: HTMLElement;
  imageRef: HTMLElement;
  image404Ref: HTMLElement;
}

interface IconsComponent {
  socialIconRefs: HTMLElement[];
  skillIconRefs: HTMLElement[];
}

interface ScrollIndicatorComponent {
  scrollIndicatorRef: HTMLElement;
}

// 註冊ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 建立參考
const scrollContainer = ref<HTMLElement | null>(null);
const scrollContent = ref<HTMLElement | null>(null);
const backgroundRef = ref<BackgroundComponent | null>(null);
const centerContentRef = ref<CenterContentComponent | null>(null);
const iconsRef = ref<IconsComponent | null>(null);
const scrollIndicatorRef = ref<ScrollIndicatorComponent | null>(null);

onMounted(() => {
  if (!iconsRef.value) return;

  // 取得所有icon元素
  const allSocialIcons = [...iconsRef.value.socialIconRefs];
  const allSkillIcons = [...iconsRef.value.skillIconRefs];

  // 設定初始位置 - 社交圖標從上方掉落
  gsap.set(allSocialIcons, {
    y: -100,
    opacity: 0,
  });

  // 技能圖標初始隱藏
  gsap.set(allSkillIcons, {
    opacity: 0,
    scale: 0.5,
  });

  // 動畫時間線 - 只有社交圖標有初始動畫
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

  // 設置滾動觸發動畫
  if (scrollContainer.value && scrollContent.value) {
    // 直接使用window作為滾動容器以確保可以正常滾動
    ScrollTrigger.create({
      trigger: scrollContent.value,
      start: "top top",
      end: "bottom bottom",
      scrub: true, // 確保滾動效果平滑
      onUpdate: (self) => {
        const progress = self.progress;

        // 背景顏色過渡 - 從白色到橙色
        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          const redValue = 255;
          const greenValue = Math.max(255 - Math.round(progress * 100), 130);
          const blueValue = Math.max(255 - Math.round(progress * 220), 0);

          element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }

        // 圖像過渡效果
        if (centerContentRef.value) {
          const normalImage = centerContentRef.value.imageRef;
          const image404 = centerContentRef.value.image404Ref;

          normalImage.style.opacity = `${1 - progress}`;
          image404.style.opacity = `${progress}`;
        }

        // 文字切換效果
        if (centerContentRef.value) {
          const jamesText = centerContentRef.value.jamesTextRef;
          const devText = centerContentRef.value.devTextRef;

          jamesText.style.opacity = `${1 - progress}`;
          jamesText.style.transform = `translateY(${-50 * progress}px)`;

          devText.style.opacity = `${progress}`;
          devText.style.transform = `translateY(${50 - 50 * progress}px)`;
        }

        // 技能圖標顯示效果 - 隨著滾動逐漸顯示
        allSkillIcons.forEach((icon) => {
          if (icon) {
            const el = icon as HTMLElement;
            // 只有當progress超過0.1後才開始顯示
            const iconOpacity = progress < 0.1 ? 0 : Math.min(progress * 2, 1);
            const iconScale = 0.5 + progress * 0.5;
            el.style.opacity = `${iconOpacity}`;
            el.style.transform = `scale(${iconScale})`;
          }
        });

        // 社交圖標隱藏效果 - 隨著滾動逐漸隱藏
        allSocialIcons.forEach((icon) => {
          if (icon) {
            const el = icon as HTMLElement;
            // 隨著滾動進度增加，社交圖標逐漸隱藏
            const iconOpacity = Math.max(1 - progress * 2, 0);
            el.style.opacity = `${iconOpacity}`;
          }
        });

        // 文字顏色變化 - 從黑色到白色
        if (centerContentRef.value && scrollIndicatorRef.value) {
          const textElements = [
            centerContentRef.value.iAmTextRef,
            centerContentRef.value.jamesTextRef,
            centerContentRef.value.devTextRef,
            scrollIndicatorRef.value.scrollIndicatorRef,
          ];

          textElements.forEach((element) => {
            if (element) {
              const el = element as HTMLElement;
              const colorValue = Math.min(Math.round(255 * progress), 255);
              el.style.color = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            }
          });
        }
      },
    });
  }
});
</script>
