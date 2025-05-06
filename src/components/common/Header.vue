<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white rounded-b-lg shadow-2xl"
  >
    <img :src="jamespig" alt="big logo" class="w-auto h-10" />

    <!-- 桌面端导航 -->
    <nav class="hidden md:block">
      <ul class="flex items-center gap-4">
        <li v-for="route in routes" :key="route.path">
          <router-link
            class="text-base font-bold hover:shadow-inner transition-all duration-300 px-2 py-1 rounded-md"
            :to="route.path"
            >{{ route.name }}</router-link
          >
        </li>
      </ul>
    </nav>

    <!-- mobile menu button -->
    <div class="relative md:hidden w-8 h-8 flex items-center justify-center">
      <!-- menu icon container -->
      <button
        @click="toggleMenu"
        class="relative w-8 h-8 flex items-center justify-center overflow-hidden"
        aria-label="Toggle menu"
      >
        <div
          class="icon-container hover:shadow-inner transition-all duration-300"
          ref="menuIconContainer"
        >
          <AlignRight ref="menuIcon" :size="24" />
        </div>
        <div
          class="icon-container hover:shadow-inner transition-all duration-300"
          ref="closeIconContainer"
        >
          <X ref="closeIcon" :size="24" />
        </div>
      </button>
    </div>

    <!-- mobile menu -->
    <div
      ref="mobileMenu"
      class="fixed left-0 right-0 top-[68px] bg-white shadow-xl rounded-b-lg p-4 md:hidden z-40 origin-top"
    >
      <ul ref="menuItems" class="flex flex-col items-center gap-4">
        <li
          v-for="route in routes"
          :key="route.path"
          ref="menuItemRefs"
          class="opacity-0"
        >
          <router-link
            class="text-base font-bold w-fit text-center px-2 py-1 rounded-md hover:shadow-inner transition-all duration-300"
            :to="route.path"
            @click="closeMenu"
            >{{ route.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
import jamespig from "../../assets/images/imagery/Jamespig.svg";
import { AlignRight, X } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Portfolio",
    path: "/portfolio",
  },
];

// menu state
const isMenuOpen = ref(false);
const mobileMenu = ref<HTMLElement | null>(null);
const menuItems = ref<HTMLElement | null>(null);
const menuItemRefs = ref<HTMLElement[]>([]);
const menuIcon = ref<HTMLElement | null>(null);
const closeIcon = ref<HTMLElement | null>(null);
const menuIconContainer = ref<HTMLElement | null>(null);
const closeIconContainer = ref<HTMLElement | null>(null);

// Animation duration and timing
const iconDuration = 0.3;
const iconDelay = iconDuration * 0.5;
const menuItemStagger = 0.08;

// initialize
onMounted(() => {
  if (closeIconContainer.value && menuIconContainer.value) {
    // initial icons state
    gsap.set(closeIconContainer.value, { autoAlpha: 0, rotate: -90 });
    gsap.set(menuIconContainer.value, { autoAlpha: 1 });
  }

  if (mobileMenu.value) {
    // initial mobile menu state
    gsap.set(mobileMenu.value, {
      scaleY: 0,
      autoAlpha: 0,
      transformOrigin: "top",
    });
  }

  if (menuItemRefs.value) {
    // initial menu items state
    gsap.set(menuItemRefs.value, { y: 20, autoAlpha: 0 });
  }
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  animateIcons();
  animateDrawer();
};

const animateIcons = () => {
  if (!menuIconContainer.value || !closeIconContainer.value) return;

  // use same animation duration variable
  const duration = iconDuration;

  if (isMenuOpen.value) {
    // menu icon -> x icon
    gsap.to(menuIconContainer.value, {
      x: "100%",
      autoAlpha: 0,
      duration: duration,
      ease: "power2.in",
    });
    // x icon -> menu icon
    gsap.fromTo(
      closeIconContainer.value,
      { rotate: -90, autoAlpha: 0 }, // initial state(rotate and hide)
      {
        rotate: 0, // rotate to original position
        autoAlpha: 1, // show icon
        duration: duration,
        delay: iconDelay, // delay to show icon after menu icon animation
        ease: "power2.out", // smooth animation
      }
    );
  } else {
    // x icon -> menu icon
    gsap.to(closeIconContainer.value, {
      rotate: 90,
      autoAlpha: 0,
      duration: duration,
      ease: "power2.in",
    });

    gsap.fromTo(
      menuIconContainer.value,
      { x: "-100%", autoAlpha: 0 }, // initial state(left side hidden)
      {
        x: "0%", // move to original position
        autoAlpha: 1, // show icon
        duration: duration,
        delay: iconDelay, // delay to show icon after close icon animation
        ease: "power2.out", // smooth animation
      }
    );
  }
};

// use GSAP to control drawer animation
const animateDrawer = () => {
  if (
    !mobileMenu.value ||
    !menuItemRefs.value ||
    menuItemRefs.value.length === 0
  )
    return;

  const drawerDuration = 0.4;

  if (isMenuOpen.value) {
    // drawer open: from top to bottom
    const timeline = gsap.timeline();

    // 1. first expand drawer
    timeline.to(mobileMenu.value, {
      scaleY: 1,
      autoAlpha: 1,
      duration: drawerDuration,
      ease: "power3.out",
    });

    // 2. then show menu items
    timeline.to(
      menuItemRefs.value,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: menuItemStagger,
        ease: "back.out(1.2)",
      },
      "-=0.1"
    ); // menu items animation starts 0.1 second before drawer animation is fully completed
  } else {
    // drawer close: from bottom to top
    const timeline = gsap.timeline();

    // 1. first hide menu items
    timeline.to(menuItemRefs.value, {
      y: -15,
      autoAlpha: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
    });

    // 2. then close drawer
    timeline.to(
      mobileMenu.value,
      {
        scaleY: 0,
        autoAlpha: 0,
        duration: drawerDuration * 0.8,
        ease: "power3.in",
      },
      "-=0.1"
    ); // drawer close animation starts 0.1 second before menu items are fully hidden
  }
};

const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
    animateIcons();
    animateDrawer();
  }
};
</script>

<style lang="css" scoped>
.icon-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
}
</style>
