<template>
  <VueLenis
    :root="false"
    :options="{
      orientation: 'horizontal',
      gestureOrientation: 'horizontal',
      smoothWheel: true,
      lerp: 0.07,
      duration: 0.8,
    }"
    ref="lenis"
    @scroll="onScroll"
  >
    <section class="flex flex-col px-8 py-6 gap-6 bg-[#BE4938] rounded-lg">
      <header class="flex flex-row justify-between items-center">
        <h1 class="text-3xl font-bold text-black">Social Media</h1>
        <div class="flex gap-2">
          <button
            @click="scrollToPrevCard"
            :disabled="isAtLeftEdge"
            class="bg-black rounded-lg px-4 py-2 cursor-pointer"
            :class="{ 'opacity-50': isAtLeftEdge }"
          >
            <ArrowLeft color="white" :size="30" :stroke-width="2" />
          </button>
          <button
            @click="scrollToNextCard"
            :disabled="isAtRightEdge"
            class="bg-black rounded-lg px-4 py-2 cursor-pointer"
            :class="{ 'opacity-50': isAtRightEdge }"
          >
            <ArrowRight color="white" :size="30" :stroke-width="2" />
          </button>
        </div>
      </header>
      <main
        ref="cardContainer"
        class="flex flex-row gap-2 overflow-x-auto py-2 rounded-lg"
      >
        <!-- IG Card -->
        <div
          class="social-card flex flex-col gap-1 p-4 bg-[#C837AB] shadow-lg h-fit"
        >
          <h2 class="text-2xl font-bold text-[#FFDD55]">Instagram</h2>
          <hr class="border-[#FFDD55]" />
          <a
            href="https://www.instagram.com/jamespig3303/"
            target="_blank"
            class="text-xs text-[#FFDD55]"
          >
            https://www.instagram.com/jamespig3303/
          </a>
          <hr class="border-[#FFDD55]" />
          <p class="text-base font-bold text-[#FFDD55]">
            Record life moments and artwork
          </p>
        </div>
        <!-- CV Card -->
        <div
          class="social-card flex flex-col gap-1 p-4 bg-[#FAF03A] shadow-lg h-fit"
        >
          <h2 class="text-2xl font-bold text-black">CV</h2>
          <hr class="border-black" />
          <a
            href="https://www.cake.me/james-pig"
            target="_blank"
            class="text-xs text-black"
          >
            https://www.cake.me/james-pig
          </a>
          <a
            href="https://www.linkedin.com/in/jamespig/"
            target="_blank"
            class="text-xs text-black"
          >
            https://www.linkedin.com/in/jamespig/
          </a>
          <hr class="border-black" />
          <p class="text-base font-bold text-black">
            I put all my work experience there!
          </p>
        </div>
        <!-- Medium Card -->
        <div
          class="social-card flex flex-col gap-1 p-4 bg-black shadow-lg h-fit"
        >
          <h2 class="text-2xl font-bold text-white">Medium</h2>
          <hr class="border-white" />
          <a
            href="https://medium.com/@james-pig"
            target="_blank"
            class="text-xs text-white"
          >
            https://medium.com/@james-pig
          </a>
          <hr class="border-white" />
          <p class="text-base font-bold text-white">
            Self-improvement technical articles
          </p>
        </div>
        <!-- GitHub Card -->
        <div
          class="social-card flex flex-col gap-1 p-4 bg-black shadow-lg h-fit"
        >
          <h2 class="text-2xl font-bold text-white">GitHub</h2>
          <hr class="border-white" />
          <a
            href="https://github.com/jamespig"
            target="_blank"
            class="text-xs text-white"
          >
            https://github.com/jamespig
          </a>
          <hr class="border-white" />
          <p class="text-base font-bold text-white">
            Self-improvement technical articles
          </p>
        </div>
        <!-- Gmail Card -->
        <div
          class="social-card flex flex-col gap-1 p-4 bg-white shadow-lg h-fit"
        >
          <h2 class="text-2xl font-bold text-[#FB2C36]">Gmail</h2>
          <hr class="border-[#FB2C36]" />
          <a
            href="mailto:james7766646@gmail.com"
            target="_blank"
            class="text-xs text-[#FB2C36]"
          >
            james7766646@gmail.com
          </a>
          <hr class="border-[#FB2C36]" />
          <p class="text-base font-bold text-[#FB2C36]">Just Email.</p>
        </div>
        <!-- Figma Card -->
        <div
          class="social-card flex flex-col gap-1 p-4 bg-[#FF7262] shadow-lg h-fit"
        >
          <h2 class="text-2xl font-bold text-[#F24E1E]">Figma</h2>
          <hr class="border-[#F24E1E]" />
          <a
            href="https://www.figma.com/design/eb4MuRbaLRfsNVunJDuDYs/Personal?node-id=15-2&t=E4VtCJdUALMgYQKs-1"
            target="_blank"
            class="text-xs text-[#F24E1E]"
          >
            https://www.figma.com/design/personal-website
          </a>
          <hr class="border-[#F24E1E]" />
          <p class="text-base font-bold text-[#F24E1E]">
            Personal website design draft
          </p>
        </div>
      </main>
    </section>
  </VueLenis>
</template>

<script lang="ts" setup>
import { ArrowRight, ArrowLeft } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
// @ts-ignore
import { VueLenis } from "lenis/vue";

const lenis = ref(null);
const cardContainer = ref<HTMLElement | null>(null);
const currentCardIndex = ref(0);
const totalCards = ref(0);
const isAtLeftEdge = ref(true);
const isAtRightEdge = ref(false);

// 初始化時計算卡片總數並更新按鈕狀態
onMounted(() => {
  if (cardContainer.value) {
    totalCards.value =
      cardContainer.value.querySelectorAll(".social-card").length;
    updateButtonStates();
  }
});

// 更新按鈕禁用狀態
const updateButtonStates = () => {
  if (!cardContainer.value) return;

  // 檢查是否在左邊界
  isAtLeftEdge.value = cardContainer.value.scrollLeft <= 10;

  // 檢查是否在右邊界
  const maxScrollLeft =
    cardContainer.value.scrollWidth - cardContainer.value.clientWidth;
  isAtRightEdge.value = cardContainer.value.scrollLeft >= maxScrollLeft - 10;
};

// 滾動到下一個卡片
const scrollToNextCard = () => {
  if (!cardContainer.value || isAtRightEdge.value) return;

  currentCardIndex.value++;
  scrollToCard(currentCardIndex.value);
};

// 滾動到上一個卡片
const scrollToPrevCard = () => {
  if (!cardContainer.value || isAtLeftEdge.value) return;

  currentCardIndex.value--;
  scrollToCard(currentCardIndex.value);
};

// 滾動到指定卡片
const scrollToCard = (index: number) => {
  if (!cardContainer.value) return;

  const cards = cardContainer.value.querySelectorAll(".social-card");
  if (index < 0 || index >= cards.length) return;

  const targetCard = cards[index] as HTMLElement;

  // 使用GSAP實現更流暢的滾動
  gsap.to(cardContainer.value, {
    duration: 0.5, // 降低持續時間
    scrollLeft: targetCard.offsetLeft,
    ease: "power1.out", // 使用更平滑的緩動函數
    onComplete: updateButtonStates, // 滾動完成後更新按鈕狀態
  });
};

// Lenis滾動事件處理
const onScroll = () => {
  if (cardContainer.value) {
    updateButtonStates();

    // 更新當前卡片索引（可選，用於保持索引同步）
    const cards = cardContainer.value.querySelectorAll(".social-card");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      if (card.offsetLeft >= cardContainer.value.scrollLeft) {
        currentCardIndex.value = i;
        break;
      }
    }
  }
};
</script>

<style lang="css" scoped>
main {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;
  position: relative;
  overflow-x: scroll;
  scroll-snap-type: x mandatory; /* 添加滾動捕捉 */
}

.social-card {
  scroll-snap-align: start; /* 卡片捕捉對齊 */
}
</style>
