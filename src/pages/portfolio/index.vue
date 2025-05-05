<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-[#6E163C] px-6 py-4"
  >
    <img
      :src="portfolio"
      loading="lazy"
      alt="portfolio"
      class="w-auto h-45 mb-6"
    />
    <div class="flex flex-col gap-2">
      <ProjectCard :project="chiaProject" />
      <ProjectCard :project="relistProject" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import portfolio from "../../assets/images/imagery/Portfolio.svg";
import ProjectCard from "../../components/portfolio/ProjectCard.vue";

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
