<template>
  <section
    class="flex flex-col items-center justify-center bg-white min-h-screen rounded-b-lg"
  >
    <div ref="headShotContainer" class="relative">
      <img ref="headShot" :src="capHeadShot" alt="head shot" class="size-80" />
      <p
        v-if="!isOutside && !isDragging"
        class="absolute bg-[#C7FA48] text-black text-sm font-bold px-2 py-1 rounded-lg pointer-events-none"
        :style="{
          left: `${elementX}px`,
          top: `${elementY}px`,
          transform: 'translate(10%, -50%)',
        }"
      >
        I'm Frontend Developer
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import capHeadShot from "../../assets/images/head-shot/notion-face-cap-transparent.png";
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useMouseInElement } from "@vueuse/core";

// Register the Draggable plugin
gsap.registerPlugin(Draggable);

const headShot = ref<HTMLImageElement | null>(null);
const headShotContainer = ref<HTMLDivElement | null>(null);
let draggableInstance: any = null;
const isDragging = ref(false);

// Use VueUse's useMouseInElement to track mouse position
const { elementX, elementY, isOutside } = useMouseInElement(headShotContainer);

onMounted(() => {
  if (headShot.value && headShotContainer.value) {
    // Create Draggable instance
    draggableInstance = Draggable.create(headShot.value, {
      type: "x,y", // Allow horizontal and vertical dragging
      bounds: headShotContainer.value.parentElement, // Limit within parent container
      inertia: true, // Add inertia effect
      onDragStart: function () {
        isDragging.value = true;
      },
      onDragEnd: function () {
        isDragging.value = false;
        // When dragging ends, use animation to return to the original point
        gsap.to(this.target, {
          duration: 0.8,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)", // Elastic animation effect
        });
      },
    })[0]; // Get the created instance
  }
});

onUnmounted(() => {
  // Clean up the Draggable instance
  if (draggableInstance) {
    draggableInstance.kill();
  }
});
</script>

<style lang="scss" scoped></style>
