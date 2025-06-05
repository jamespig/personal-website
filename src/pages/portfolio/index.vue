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
    "1. Built front-end from scratch using Nuxt 3 with SSR and CSR hybrid rendering.",
    "2. Implemented route-based authentication via Nuxt Middleware.",
    "3. Defined UI/UX design system and component library, modularized code to reduce coupling.",
    "4. Provided modern UI/UX suggestions focused on pain-point solutions.",
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
    "1. Developed features using React and ecosystem tools.",
    "2. Led Code Reviews and organized Study Groups to foster team growth.",
    "3. Spearheaded the implementation of the Explore page, collaborating with PMs and designers to decompose tasks.",
    "4. Designed caching and refresh strategies with TanStack Query; implemented lazy loading for images and content to optimize performance.",
    "5. Customized scroll restoration logic to enhance user experience when data updates occur.",
  ],
};
</script>
