<template>
  <div
    class="z-10 flex flex-col items-center md:grid md:grid-cols-3 gap-8 md:gap-4 justify-center col-start-1 col-end-2 md:col-start-2 md:col-end-3 row-start-2 row-end-3 py-10 md:pl-0"
  >
    <!-- I AM 文字 -->
    <div class="flex items-center justify-center md:justify-self-end">
      <h1 ref="iAmTextRef" class="text-3xl font-bold">I AM</h1>
    </div>

    <!-- 頭像容器 -->
    <div
      class="max-w-40 md:max-w-full w-full aspect-square bg-white relative self-center"
    >
      <img
        ref="imageRef"
        :src="CapHeadShot"
        alt="James"
        class="w-full h-full object-contain absolute top-0 left-0"
      />
      <img
        ref="image404Ref"
        :src="CapHeadShot404"
        alt="Developer"
        class="w-full h-full object-contain absolute top-0 left-0 opacity-0"
      />
    </div>

    <!-- JAMES/DEVELOPER 文字容器 -->
    <div
      class="flex items-center justify-center md:justify-self-start relative w-full"
    >
      <!-- 添加一個空白佔位元素，讓絕對定位元素有足夠的高度 -->
      <div class="invisible h-12 md:h-auto">JAMES</div>
      <h1
        ref="jamesTextRef"
        class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold absolute text-center w-full left-0"
      >
        JAMES
      </h1>
      <h1
        ref="devTextRef"
        class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold absolute text-center w-full opacity-0 left-0"
      >
        DEVELOPER
      </h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CapHeadShot from "../../../assets/images/head-shot/notion-face-cap-transparent.png";
import CapHeadShot404 from "../../../assets/images/head-shot/notion-face-cap-404-transparent.png";

const iAmTextRef = ref(null);
const jamesTextRef = ref(null);
const devTextRef = ref(null);
const imageRef = ref(null);
const image404Ref = ref(null);

// 暴露所有引用给父组件
defineExpose({
  iAmTextRef,
  jamesTextRef,
  devTextRef,
  imageRef,
  image404Ref,
});
</script>
