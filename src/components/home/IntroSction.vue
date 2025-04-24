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
let animationElements: HTMLElement[] = [];
let scrollTrigger: any = null;

onMounted(() => {
  if (!articleRef.value) return;

  // Collect all elements with the animation-item class
  animationElements = Array.from(
    articleRef.value.querySelectorAll(".animation-item")
  ) as HTMLElement[];

  // Create a main ScrollTrigger
  scrollTrigger = ScrollTrigger.create({
    trigger: articleRef.value,
    start: "top 80%",
    onEnter: () => animateElements(true),
    onLeaveBack: () => animateElements(false),
  });
});

// Animation function
const animateElements = (show: boolean) => {
  animationElements.forEach((el, index) => {
    gsap.to(el, {
      y: show ? 0 : 30,
      opacity: show ? 1 : 0,
      duration: show ? 0.7 : 0.5,
      delay: show ? index * 0.15 : 0,
      ease: show ? "power2.out" : "power2.in",
    });
  });
};

onUnmounted(() => {
  // 清理ScrollTrigger实例
  if (scrollTrigger) {
    scrollTrigger.kill();
  }
});
</script>

<style lang="css" scoped>
.animation-item {
  will-change: transform, opacity; /* 优化性能 */
}
</style>
