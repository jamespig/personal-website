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
      <div ref="workSectionRef" class="h-screen bg-amber-500 flex items-center">
        <div class="container mx-auto flex items-center px-4">
          <!-- 頭像區域 -->
          <div class="relative flex flex-col items-center w-1/3">
            <!-- 頭像 -->
            <div
              ref="workAvatarContainerRef"
              class="size-50 rounded-full bg-white overflow-hidden mb-5"
            >
              <img
                src="../assets/images/head-shot/notion-face-cap-404-transparent.png"
                alt="Developer"
                class="size-50 object-contain"
              />
            </div>

            <!-- 對話框 -->
            <div
              ref="dialogRef"
              class="relative max-w-xs bg-white p-4 rounded-lg shadow-lg"
            >
              <div
                class="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-16 border-r-white border-b-8 border-b-transparent"
              ></div>
              <p class="text-black font-medium">
                這是我的工作經歷，記錄了我專業成長的歷程和技能積累。
              </p>
            </div>
          </div>

          <!-- 工作經歷 -->
          <div ref="workExperienceRef" class="max-w-2xl ml-auto w-2/3">
            <h2 class="text-3xl font-bold mb-6 text-white">工作經歷</h2>
            <div class="space-y-8">
              <div
                v-for="(job, index) in workExperiences"
                :key="index"
                class="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
              >
                <div class="flex justify-between mb-2">
                  <h3 class="text-xl font-bold text-white">
                    {{ job.company }}
                  </h3>
                  <span class="text-white/80">{{ job.period }}</span>
                </div>
                <h4 class="text-lg text-white/90 mb-2">{{ job.title }}</h4>
                <p class="text-white/70">{{ job.description }}</p>
              </div>
            </div>
          </div>
        </div>
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

// 工作經歷數據
const workExperiences = [
  {
    company: "ABC公司",
    title: "前端開發工程師",
    period: "2022 - 現在",
    description:
      "負責公司產品的前端開發和維護，使用Vue和Tailwind CSS開發現代化UI界面。",
  },
  {
    company: "XYZ科技",
    title: "全棧開發者",
    period: "2020 - 2022",
    description: "使用React和Node.js開發企業級應用，優化網站性能和用戶體驗。",
  },
  {
    company: "創新工作室",
    title: "UI/UX設計師",
    period: "2018 - 2020",
    description: "設計網站和移動應用界面，創建用戶流程和交互原型。",
  },
];

// 建立參考
const scrollContainer = ref<HTMLElement | null>(null);
const scrollContent = ref<HTMLElement | null>(null);
const firstSectionRef = ref<HTMLElement | null>(null);
const workSectionRef = ref<HTMLElement | null>(null);
const backgroundRef = ref<BackgroundComponent | null>(null);
const centerContentRef = ref<CenterContentComponent | null>(null);
const iconsRef = ref<IconsComponent | null>(null);
const scrollIndicatorRef = ref<ScrollIndicatorComponent | null>(null);
const workAvatarContainerRef = ref<HTMLElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);
const workExperienceRef = ref<HTMLElement | null>(null);

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
      end: "bottom top",
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // 使用較短的距離來加速顏色過渡，將過渡距離縮短到50%
        const colorProgress = Math.min(progress * 2, 1);

        // 背景顏色過渡 - 從白色到藍色 blue-500
        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          let redValue = 255;
          let greenValue = 255;
          let blueValue = 255;

          // 白色到藍色 blue-500 (rgb(59, 130, 246))
          redValue = 255 - Math.round(196 * colorProgress);
          greenValue = 255 - Math.round(125 * colorProgress);
          blueValue = 255 - Math.round(9 * colorProgress);

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
            // 只有當progress超過0.3後才開始顯示
            const iconOpacity =
              progress < 0.3 ? 0 : Math.min((progress - 0.3) * 1.4, 1);
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

  // 工作經歷部分的動畫 - 只保留背景顏色過渡
  if (workSectionRef.value) {
    // 背景顏色過渡 - 從藍色 blue-500 到琥珀色
    ScrollTrigger.create({
      trigger: workSectionRef.value,
      start: "top bottom",
      end: "top center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (backgroundRef.value) {
          const element = backgroundRef.value.bgRef;
          // 藍色 blue-500 (rgb(59, 130, 246)) 到琥珀色 (rgb(245, 158, 11))
          const redValue = 59 + Math.round(186 * progress);
          const greenValue = 130 + Math.round(28 * progress);
          const blueValue = 246 - Math.round(235 * progress);

          element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        }
      },
    });
  }
});
</script>
