<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md"> {{ title }} </h1>
      <span class="text-secondary"> 요청번호: {{ dataSetName }} </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 추천 배치 주문수 </span>
        <span class="text-2xl">{{ recommended?.orderCount }}</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> SKU당 처리 가능 주문 수량 </span>
        <span class="text-2xl">{{ recommended?.orderCountPerSku }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 기준 대비 효율 향상 </span>
        <span class="text-2xl">{{ recommended?.performanceRatio }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps({
    title: {
      type: String as PropType<string>,
    },
    dataSetName: {
      type: String as PropType<string>,
    },
    recommended: {
      type: Object,
    },
  });
</script>
