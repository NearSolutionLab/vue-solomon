<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">{{
        t('solomon.title.inventory_quantity_analysis_report')
      }}</h1>
      <span class="text-secondary">{{ t('solomon.text.document_name') }} {{ getTitle }} </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary">{{ t('solomon.text.highest_inventory_quantity') }}</span>
        <span class="text-2xl">{{ getHighestY }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary">{{ t('solomon.text.lowest_inventory_quantity') }}</span>
        <span class="text-2xl">{{ getLowestY }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary">{{ t('solomon.text.average_inventory_quantity') }}</span>
        <span class="text-2xl">{{ getAverageY }}</span>
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

  const getTitle = computed(() => {
    return props.headerData?.title || '';
  });

  const getHighestY = computed(() => {
    let num = 0;
    (props.headerData?.monthlyAnalysis || []).forEach((item) => {
      if (item.y > num) num = item.y;
    });
    return formatNumber({ num });
  });

  const getLowestY = computed(() => {
    let num = Infinity;
    (props.headerData?.monthlyAnalysis || []).forEach((item) => {
      if (item.y < num) num = item.y;
    });
    if (num === Infinity) num = 0;
    return formatNumber({ num });
  });

  const getAverageY = computed(() => {
    let summation = (props.headerData?.monthlyAnalysis || []).reduce(
      (acc, curr) => (acc += curr.y),
      0,
    );
    let dataLen = (props.headerData?.monthlyAnalysis || []).length || 0;
    const num = dataLen > 0 ? summation / dataLen : 0;
    return formatNumber({ num });
  });
</script>
