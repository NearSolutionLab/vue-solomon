<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md"> 출고 물동량 분석 리포트 </h1>
      <!-- <span class="text-secondary"> </span> -->
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 최고 출고 주문 건수 </span>
        <span class="text-2xl">{{ getHighestOrders }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 최저 출고 주문 건수 </span>
        <span class="text-2xl">{{ getLowestOrders }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-16 mr-12">
        <span class="text-secondary"> 평균 출고 주문 건수 </span>
        <span class="text-2xl">{{ getAverageOrders }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-16 mr-12">
        <span class="text-secondary"> 최고 출고량 </span>
        <span class="text-2xl">{{ getHighestY }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-16 mr-12">
        <span class="text-secondary"> 최저 출고량 </span>
        <span class="text-2xl">{{ getLowestY }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 평균 출고량 </span>
        <span class="text-2xl">{{ getAverageY }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatNumber } from '/@/utils/numberUtil';
  import { computed } from 'vue';

  const props = defineProps({
    headerData: {
      type: Array as PropType<any[]>,
    },
  });

  const getHighestOrders = computed(() => {
    let num = 0;
    props.headerData?.forEach((item) => {
      if (item.order_count > num) num = item.order_count;
    });
    return formatNumber({ num });
  });

  const getLowestOrders = computed(() => {
    let num = Infinity;
    props.headerData?.forEach((item) => {
      if (item.order_count < num) num = item.order_count;
    });
    if (num === Infinity) num = 0;
    return formatNumber({ num });
  });

  const getAverageOrders = computed(() => {
    let summation = props.headerData?.reduce((acc, curr) => (acc += curr.order_count), 0);
    let orderLen = props.headerData?.length || 0;
    const num = orderLen > 0 ? summation / orderLen : 0;
    return formatNumber({ num });
  });

  const getHighestY = computed(() => {
    let num = 0;
    props.headerData?.forEach((item) => {
      if (item.y > num) num = item.y;
    });
    return formatNumber({ num });
  });

  const getLowestY = computed(() => {
    let num = Infinity;
    props.headerData?.forEach((item) => {
      if (item.y < num) num = item.y;
    });
    if (num === Infinity) num = 0;
    return formatNumber({ num });
  });

  const getAverageY = computed(() => {
    let summation = props.headerData?.reduce((acc, curr) => (acc += curr.y), 0);
    let orderLen = props.headerData?.length || 0;
    const num = orderLen > 0 ? summation / orderLen : 0;
    return formatNumber({ num });
  });
</script>
