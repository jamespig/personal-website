<template>
  <div
    class="flex flex-col min-h-screen px-6 py-24 relative overflow-hidden bg-[#6E163C]"
  >
    <div
      ref="bgImageContainer"
      class="absolute inset-0 w-full h-full z-0 flex justify-center items-center overflow-hidden"
    >
      <img
        :src="portfolio"
        ref="portfolioImage"
        loading="lazy"
        alt="portfolio"
        class="w-full h-auto object-cover opacity-60"
      />
    </div>
    <div class="relative z-10 flex flex-col items-center">
      <div class="flex flex-col gap-2">
        <ProjectCard :project="chiaProject" />
        <ProjectCard :project="relistProject" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import portfolio from "../../assets/images/imagery/Portfolio.svg";
import ProjectCard from "../../components/portfolio/ProjectCard.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const portfolioImage = ref<HTMLImageElement | null>(null);
const bgImageContainer = ref<HTMLDivElement | null>(null);
let lenis: Lenis | null = null;

// initialize smooth scrolling and parallax effect
onMounted(() => {
  // use Lenis to implement smooth scrolling
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });

  // update function
  function raf(time: number) {
    lenis && lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // GSAP parallax effect
  gsap.to(portfolioImage.value, {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: bgImageContainer.value,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});

// resource cleanup
onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
});

// Project data
const chiaProject = {
  title: "Chia",
  description:
    "is an order management platform that supports group-buying organizers and vendors in handling orders, tracking finances, and managing loyal customers.",
  techStack: [
    "Nuxt3",
    "TailwindCSS",
    "Pinia",
    "VueUse",
    "VeeValidate",
    "VueDatePicker",
    "zxing",
    "Chart.js",
    "AWS Amplify",
    "Docker",
    "Liff",
  ],
  whatIDid: [
    "1. Built the frontend of Chia's two core systems from scratch.",
    "2. Established design and UI/UX guidelines to ensure consistency across products.",
    "3. Introduced modular development, separating logic and presentation to reduce code coupling and improve maintainability.",
    "4. Actively provided feedback on product UI and features to modernize the user experience and help the product better address user pain points.",
  ],
};

const relistProject = {
  title: "RELIST",
  description:
    "A content community focused on list curation, where you can easily explore, collect, and share great ideas through a seamless list-based interface.",
  techStack: [
    "React",
    "TanStack Query",
    "Shadcn UI",
    "axios",
    "Zustand",
    "TailwindCSS",
    "Lingui",
  ],
  whatIDid: [
    "1. Developed the Landing Page.",
    "2. Standardized the frontend team's codebase to reduce redundancy and avoid reinventing the wheel.",
    "3. Conducted code reviews to ensure code quality and consistency.",
    "4. Organized and participated in study groups for technical knowledge sharing.",
    "5. Lead the development of the Discover Page, collaborating closely with PMs and designers to evaluate implementation feasibility.",
  ],
};
</script>
