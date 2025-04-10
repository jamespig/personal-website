<template>
  <div class="h-screen w-full" ref="scrollContainer">
    <!-- 固定背景區域，會隨滾動變色 -->
    <Background ref="backgroundRef" />

    <!-- 創建一個內容塊，用於生成滾動條和触发效果 -->
    <div class="relative" ref="scrollContent">
      <!-- 第一屏 - 個人介紹區域 -->
      <div ref="firstSectionRef" class="h-screen">
        <div
          class="fixed top-0 left-0 w-full h-screen grid grid-cols-[minmax(300px,800px)_1fr] md:grid-cols-[0.5fr_minmax(300px,600px)_2fr] grid-rows-[1fr_auto_1fr]"
        >
          <CenterContent ref="centerContentRef" />
          <Icons ref="iconsRef" />
          <ScrollIndicator ref="scrollIndicatorRef" />
        </div>
      </div>

      <!-- 第二屏 - 工作經歷區域 -->
      <div ref="workSectionRef">
        <WorkExperience ref="workExperienceRef" />
      </div>
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
import WorkExperience from "../components/home/WorkExperience.vue";

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

interface WorkExperienceComponent {
  avatarContainerRef: HTMLElement;
  dialogRef: HTMLElement;
  experienceRef: HTMLElement;
}

// 註冊ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 建立參考
const scrollContainer = ref<HTMLElement | null>(null);
const scrollContent = ref<HTMLElement | null>(null);
const firstSectionRef = ref<HTMLElement | null>(null);
const workSectionRef = ref<HTMLElement | null>(null);
const backgroundRef = ref<BackgroundComponent | null>(null);
const centerContentRef = ref<CenterContentComponent | null>(null);
const iconsRef = ref<IconsComponent | null>(null);
const scrollIndicatorRef = ref<ScrollIndicatorComponent | null>(null);
const workExperienceRef = ref<WorkExperienceComponent | null>(null);

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

  // 設置初始狀態 - DEVELOPER 文字和 404 Cap 初始隱藏
  if (centerContentRef.value) {
    gsap.set(centerContentRef.value.devTextRef, {
      opacity: 0,
      y: 50,
    });

    gsap.set(centerContentRef.value.image404Ref, {
      opacity: 0,
    });
  }

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
        delay: Math.random() * 0.5,
      },
      Math.random() * 0.5
    );
  });

  // 设置第一屏固定效果
  if (firstSectionRef.value) {
    ScrollTrigger.create({
      trigger: firstSectionRef.value,
      start: "top top",
      end: "bottom+=50% top", // 增加固定效果的持續時間
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // 背景顏色過渡 - 從白色到天藍色 sky-500
        // 背景顏色過渡在 0-20% 的滾動範圍內完成
        const colorProgress = Math.min(progress * 5, 1);
        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          let redValue = 255;
          let greenValue = 255;
          let blueValue = 255;

          // 白色到天藍色 sky-500 (rgb(14, 165, 233))
          redValue = 255 - Math.round(241 * colorProgress);
          greenValue = 255 - Math.round(90 * colorProgress);
          blueValue = 255 - Math.round(22 * colorProgress);

          element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }

        // 圖像過渡效果 - 在 0-15% 的滾動範圍內完成
        if (centerContentRef.value) {
          const normalImage = centerContentRef.value.imageRef;
          const image404 = centerContentRef.value.image404Ref;

          const imageProgress = Math.min(progress * 6, 1);
          normalImage.style.opacity = `${1 - imageProgress}`;
          image404.style.opacity = `${imageProgress}`;
        }

        // 文字切換效果 - 在 0-15% 的滾動範圍內完成
        if (centerContentRef.value) {
          const jamesText = centerContentRef.value.jamesTextRef;
          const devText = centerContentRef.value.devTextRef;

          const textProgress = Math.min(progress * 6, 1);
          jamesText.style.opacity = `${1 - textProgress}`;
          jamesText.style.transform = `translateY(${-50 * textProgress}px)`;

          devText.style.opacity = `${textProgress}`;
          devText.style.transform = `translateY(${50 - 50 * textProgress}px)`;
        }

        // 技能圖標顯示效果 - 在 5-25% 的滾動範圍內完成
        allSkillIcons.forEach((icon) => {
          if (icon) {
            const el = icon as HTMLElement;
            // 技能圖標在稍後開始出現
            const iconProgress = Math.max(0, progress - 0.05) * 5;
            const iconOpacity = Math.min(iconProgress, 1);
            const iconScale = 0.5 + 0.5 * Math.min(iconProgress, 1);

            el.style.opacity = `${iconOpacity}`;
            el.style.transform = `scale(${iconScale})`;
          }
        });

        // 社交圖標隱藏效果 - 在 0-25% 的滾動範圍內完成
        allSocialIcons.forEach((icon) => {
          if (icon) {
            const el = icon as HTMLElement;
            const iconOpacity = Math.max(1 - progress * 4, 0);
            el.style.opacity = `${iconOpacity}`;
          }
        });

        // 文字顏色變化 - 從黑色到白色 - 在 0-20% 的滾動範圍內完成
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
              const colorValue = Math.min(Math.round(255 * colorProgress), 255);
              el.style.color = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            }
          });
        }
      },
    });
  }

  // 工作經歷部分的動畫 - 只保留背景顏色過渡
  if (workSectionRef.value) {
    // 背景顏色過渡 - 從天藍色 sky-500 到琥珀色
    ScrollTrigger.create({
      trigger: workSectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          // 天藍色 sky-500 (rgb(14, 165, 233)) 到琥珀色 (rgb(245, 158, 11))
          const redValue = 14 + Math.round(231 * progress);
          const greenValue = 165 - Math.round(7 * progress);
          const blueValue = 233 - Math.round(222 * progress);

          element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }
      },
    });
  }
});
</script>
