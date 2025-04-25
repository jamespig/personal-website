<template>
  <section class="flex flex-row px-8 py-6 gap-8 bg-transparent overflow-hidden">
    <h1 class="text-3xl font-bold text-rose-500">About Me</h1>
    <article class="flex flex-col gap-2 text-white" ref="articleRef">
      <h2 class="text-2xl font-bold animation-item opacity-0 translate-y-10">
        Hello! I'm <span class="text-rose-500">James</span>
      </h2>
      <p class="animation-item opacity-0 translate-y-10">
        I enjoy using
        <span class="text-2xl font-bold text-rose-500">code</span> and
        <span class="text-2xl font-bold text-rose-500">design</span> to bring
        imagination to life.
      </p>
      <p class="animation-item opacity-0 translate-y-10">
        On weekends, I often
        <span class="text-2xl font-bold text-rose-500">listen to music</span>
        while <span class="text-2xl font-bold text-rose-500">drawing</span>,
        soothing the fatigue accumulated during the workweek.
      </p>
      <p class="animation-item opacity-0 translate-y-10">
        The <span class="text-2xl font-bold text-rose-500">gym</span> is my
        second office; lifting weights and running help me maintain my mental
        and physical balance outside of work.
      </p>
      <p class="animation-item opacity-0 translate-y-10">
        In the evenings, I enjoy curling up on the sofa
        <span class="text-2xl font-bold text-rose-500">reading books</span> or
        <span class="text-2xl font-bold text-rose-500">watching shows</span>,
        from tech insights to psychology; each read sparks new ideas.
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const articleRef = ref<HTMLElement | null>(null);
let scrollTrigger: any = null;
let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  if (!articleRef.value) return;

  // 创建一个timeline实例
  tl = gsap.timeline({ paused: true });

  // 获取所有animation-item元素
  const animationElements = Array.from(
    articleRef.value.querySelectorAll(".animation-item")
  ) as HTMLElement[];

  // 将所有动画添加到timeline中
  animationElements.forEach((el) => {
    tl!.to(
      el,
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      "<+=0.15"
    ); // 每个动画比前一个晚0.15秒开始
  });

  // 创建ScrollTrigger控制timeline的播放
  scrollTrigger = ScrollTrigger.create({
    trigger: articleRef.value,
    start: "top 80%",
    onEnter: () => tl!.play(),
    onLeaveBack: () => tl!.reverse(),
  });
});

onUnmounted(() => {
  // 清理ScrollTrigger和timeline实例
  if (scrollTrigger) {
    scrollTrigger.kill();
  }
  if (tl) {
    tl.kill();
  }
});
</script>

<style lang="css" scoped>
.animation-item {
  will-change: transform, opacity; /* 优化性能 */
}
</style>
