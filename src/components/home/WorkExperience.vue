<template>
  <div class="h-screen w-full bg-amber-500">
    <div
      class="h-full grid grid-cols-1 md:grid-cols-12 grid-rows-1 md:grid-rows-6"
    >
      <!-- 標題 -->
      <div
        class="md:col-start-1 md:col-span-6 md:row-start-1 md:row-span-3 bg-black text-white p-4 shadow-2xl"
      >
        <h1
          class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold"
        >
          Work Experience
        </h1>
      </div>

      <!-- 高雄工作經歷 -->
      <div
        class="md:col-start-7 md:col-span-6 md:row-start-1 md:row-span-3 bg-amber-500 p-6 hover:bg-black hover:text-amber-500 transition-all duration-300"
      >
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          Cloudysys(高雄)
        </h2>
        <p class="mb-1 text-yellow-700 text-sm sm:text-base md:text-lg">
          2022/09~2024/04
        </p>
        <p
          class="mb-2 font-semibold text-yellow-700 text-sm sm:text-base md:text-lg"
        >
          助理系統工程師
        </p>
      </div>

      <!-- 台北工作經歷 -->
      <div
        class="md:col-start-7 md:col-span-6 md:row-start-4 md:row-span-3 bg-amber-500 p-6 hover:bg-black hover:text-amber-500 transition-all duration-300"
      >
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          Cloudysys(台北)
        </h2>
        <p class="mb-1 text-yellow-700 text-sm sm:text-base md:text-lg">
          2024/12~now
        </p>
        <p
          class="mb-2 font-semibold text-yellow-700 text-sm sm:text-base md:text-lg"
        >
          系統工程師
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 暴露引用給父組件
defineExpose({
  experienceRef: null,
});
</script>
