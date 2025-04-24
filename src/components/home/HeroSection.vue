<template>
  <section
    class="flex flex-col items-center justify-center bg-white min-h-screen rounded-b-lg"
  >
    <div ref="headShotContainer" class="relative">
      <img ref="headShot" :src="capHeadShot" alt="head shot" class="size-80" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import capHeadShot from "../../assets/images/head-shot/notion-face-cap-transparent.png";
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

// 注册Draggable插件
gsap.registerPlugin(Draggable);

const headShot = ref<HTMLImageElement | null>(null);
const headShotContainer = ref<HTMLDivElement | null>(null);
let draggableInstance: any = null;

onMounted(() => {
  if (headShot.value && headShotContainer.value) {
    // Create Draggable instance
    draggableInstance = Draggable.create(headShot.value, {
      type: "x,y", // Allow horizontal and vertical dragging
      bounds: headShotContainer.value.parentElement, // Limit within parent container
      inertia: true, // Add inertia effect
      onDragEnd: function () {
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
