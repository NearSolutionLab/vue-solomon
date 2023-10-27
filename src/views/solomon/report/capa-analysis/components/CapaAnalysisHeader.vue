<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md"> 주문 패턴 분석 리포트 </h1>
      <span class="text-secondary"> 요청번호: {{ getHeaderData.dataSetName }} </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 추천 배치 주문수 </span>
        <span class="text-2xl">{{ getHeaderData.orderCount }}</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> SKU당 처리 가능 주문 수량 </span>
        <span class="text-2xl">{{ getHeaderData.orderCountPerSku }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 기준 대비 효율 향상 </span>
        <span class="text-2xl">{{ getHeaderData.performanceRatio }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatNumber } from '/@/utils/numberUtil';
  import { computed } from 'vue';

  const props = defineProps({
    headerData: {
      type: Object,
    },
  });

  const getHeaderData = computed(() => {
    const [highestPerformance] = (props.headerData?.capaAnalysisList || []).sort(
      (a, b) => b.performanceRatio - a.performanceRatio,
    );
    return {
      dataSetName: props.headerData?.dataSetName,
      orderCount: formatNumber({ num: highestPerformance?.orderCount || 0 }),
      orderCountPerSku: formatNumber({
        num: highestPerformance?.orderCountPerSku || 0,
        decimals: 2,
      }),
      performanceRatio: formatNumber({
        num: highestPerformance?.performanceRatio || 0,
        decimals: 2,
      }),
    };
  });
</script>
