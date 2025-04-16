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
  skillIconsLeftWrapperRef: HTMLElement;
  skillIconsRightWrapperRef: HTMLElement;
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
  const skillIconsLeftWrapper = iconsRef.value.skillIconsLeftWrapperRef;
  const skillIconsRightWrapper = iconsRef.value.skillIconsRightWrapperRef;

  // 設定初始位置 - 社交圖標從上方掉落
  gsap.set(allSocialIcons, {
    y: -100,
    opacity: 0,
  });

  // 技能圖標初始隱藏但不影响位置
  gsap.set([skillIconsLeftWrapper, skillIconsRightWrapper], {
    opacity: 0,
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

  // 創建左側技能圖標向下滾動動畫
  // 獲取左側圖標組的父元素
  const leftIconGroups =
    skillIconsLeftWrapper.querySelectorAll(".flex.flex-col");
  const leftFirstGroup = leftIconGroups[0] as HTMLElement;
  const leftGroupHeight = leftFirstGroup.offsetHeight;

  // 對於左側向下滾動，設置初始位置為負值，讓第一組在視口外，第二組在視口內
  gsap.set(skillIconsLeftWrapper, { y: -leftGroupHeight });

  // 建立左側無限循環動畫
  gsap.to(skillIconsLeftWrapper, {
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
  const rightIconGroups =
    skillIconsRightWrapper.querySelectorAll(".flex.flex-col");
  const rightFirstGroup = rightIconGroups[0] as HTMLElement;
  const rightGroupHeight = rightFirstGroup.offsetHeight;

  // 對於右側向上滾動，設置初始位置為0
  gsap.set(skillIconsRightWrapper, { y: 0 });

  // 建立右側無限循環動畫
  gsap.to(skillIconsRightWrapper, {
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

        // 背景顏色過渡 - 從白色到藍色 blue-500
        // 背景顏色過渡在 0-20% 的滾動範圍內完成
        const colorProgress = Math.min(progress * 5, 1);
        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          let redValue = 255;
          let greenValue = 255;
          let blueValue = 255;

          // 白色到藍色 blue-500 (rgb(59, 130, 246))
          redValue = 255 - Math.round((255 - 59) * colorProgress);
          greenValue = 255 - Math.round((255 - 130) * colorProgress);
          blueValue = 255 - Math.round((255 - 246) * colorProgress);

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

        // 技能图标显示控制 - 只控制透明度，不影响滑动
        if (skillIconsLeftWrapper && skillIconsRightWrapper) {
          let opacity = 0;

          // 入场淡入效果 (0.15 - 0.25)
          if (progress > 0.15 && progress <= 0.25) {
            // 计算0.15到0.25范围内的不透明度 (0-1)
            opacity = (progress - 0.15) * 10;
          }
          // 完全显示状态 (0.25 - 0.6)
          else if (progress > 0.25 && progress <= 0.6) {
            opacity = 1;
          }
          // 退场淡出效果 (0.6 - 0.7)
          else if (progress > 0.6 && progress < 0.7) {
            // 计算0.6到0.7范围内的不透明度 (1-0)
            opacity = 1 - (progress - 0.6) * 10;
          }

          // 只更新透明度，不影响y位置
          gsap.to([skillIconsLeftWrapper, skillIconsRightWrapper], {
            opacity: opacity,
            duration: 0.2,
            overwrite: "auto",
          });
        }

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
    // 背景顏色過渡 - 從藍色 blue-500 到琥珀色 amber-500
    ScrollTrigger.create({
      trigger: workSectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          // 藍色 blue-500 (rgb(59, 130, 246)) 到琥珀色 amber-500 (rgb(245, 158, 11))
          const redValue = 59 + Math.round((245 - 59) * progress);
          const greenValue = 130 + Math.round((158 - 130) * progress);
          const blueValue = 246 - Math.round((246 - 11) * progress);

          element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }
      },
    });
  }
});
</script>
