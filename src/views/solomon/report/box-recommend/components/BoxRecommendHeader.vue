<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">박스추천</h1>
      <span class="text-secondary"
        >{{ t('solomon.text.document_name') }} {{ getHeaderData.title }}
      </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary">주문수 </span>
        <span class="text-2xl">{{ getHeaderData.orderCount }}</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary">박스수</span>
        <span class="text-2xl">{{ getHeaderData.orderCountPerSku }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary">기존 대비 금액 절감</span>
        <span class="text-2xl">{{ getHeaderData.performanceRatio }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatNumber } from '/@/utils/numberUtil';
  import { computed } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

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
      title: props.headerData?.title,
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
