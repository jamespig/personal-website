<template>
  <div class="flex flex-col bg-[#2330BA] w-full shadow-md">
    <header class="flex items-center bg-white p-2 gap-1">
      <h1 class="text-3xl font-bold text-[#1C2EA9]">{{ project.title }}</h1>
      <p class="text-sm font-normal text-[#1C2EA9]">
        {{ project.description }}
      </p>
    </header>
    <section class="flex flex-col px-2 py-1 text-white">
      <div
        class="flex items-center p-2 justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
        @click="toggleTechStack"
      >
        <h2 class="text-xl font-bold">Tech Stack</h2>
        <ChevronDown
          ref="techStackChevron"
          :class="{ 'transform transition-transform duration-300': true }"
        />
      </div>
      <article ref="techStackContent" class="px-2 py-1 overflow-hidden">
        <ul class="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
          <li v-for="(tech, index) in project.techStack" :key="index">
            {{ tech }}
          </li>
        </ul>
      </article>
    </section>
    <section class="flex flex-col px-2 py-1 text-white">
      <div
        class="flex items-center p-2 justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
        @click="toggleWhatIDid"
      >
        <h2 class="text-xl font-bold">What I Did</h2>
        <ChevronDown
          ref="whatIDidChevron"
          :class="{ 'transform transition-transform duration-300': true }"
        />
      </div>
      <article ref="whatIDidContent" class="px-2 py-1 overflow-hidden">
        <ul class="flex flex-col gap-2 p-2">
          <li v-for="(item, index) in project.whatIDid" :key="index">
            {{ item }}
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ChevronDown } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

// Define project interface
interface Project {
  title: string;
  description: string;
  techStack: string[];
  whatIDid: string[];
}

// Define component props
defineProps<{
  project: Project;
}>();

// State
const isTechStackOpen = ref(true);
const isWhatIDidOpen = ref(true);

// DOM references
const techStackChevron = ref<HTMLElement | null>(null);
const whatIDidChevron = ref<HTMLElement | null>(null);
const techStackContent = ref<HTMLElement | null>(null);
const whatIDidContent = ref<HTMLElement | null>(null);

// Animation duration
const animationDuration = 0.4;

// Initialization
onMounted(() => {
  if (
    techStackContent.value &&
    whatIDidContent.value &&
    techStackChevron.value &&
    whatIDidChevron.value
  ) {
    // set expanded by default
    gsap.set(techStackContent.value, { height: "auto", autoAlpha: 1 });
    gsap.set(whatIDidContent.value, { height: "auto", autoAlpha: 1 });
    // set chevrons to rotated state
    gsap.set(techStackChevron.value, { rotation: 180 });
    gsap.set(whatIDidChevron.value, { rotation: 180 });
  }
});

// toggle Tech Stack section
const toggleTechStack = () => {
  isTechStackOpen.value = !isTechStackOpen.value;
  animateSection(
    techStackContent.value,
    techStackChevron.value,
    isTechStackOpen.value
  );
};

// toggle What I Did section
const toggleWhatIDid = () => {
  isWhatIDidOpen.value = !isWhatIDidOpen.value;
  animateSection(
    whatIDidContent.value,
    whatIDidChevron.value,
    isWhatIDidOpen.value
  );
};

// animation logic
const animateSection = (
  content: HTMLElement | null,
  chevron: HTMLElement | null,
  isOpen: boolean
) => {
  if (!content || !chevron) return;

  if (isOpen) {
    // expand content
    gsap.to(chevron, {
      rotation: 180,
      duration: animationDuration * 0.8,
      ease: "power2.out",
    });

    // first, auto calculate content height
    gsap.set(content, { height: "auto", autoAlpha: 1 });
    const height = content.offsetHeight;
    gsap.set(content, { height: 0, autoAlpha: 0 });

    // then, animate to calculated height
    gsap.to(content, {
      height: height,
      autoAlpha: 1,
      duration: animationDuration,
      ease: "power3.out",
    });
  } else {
    // collapse content
    gsap.to(chevron, {
      rotation: 0,
      duration: animationDuration * 0.8,
      ease: "power2.out",
    });

    gsap.to(content, {
      height: 0,
      autoAlpha: 0,
      duration: animationDuration,
      ease: "power3.in",
    });
  }
};
</script>
