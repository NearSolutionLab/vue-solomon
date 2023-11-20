<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md"> 고객사 명 </h1>
      <span class="text-secondary"> {{ getHeaderData.customerName }} </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> 요금제 </span>
        <span class="text-2xl"> 종량제 </span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> 총 데이터 저장 건수 </span>
        <span class="text-2xl">{{ getHeaderData.saveData }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 총 데이터 사용 건수 </span>
        <span class="text-2xl">{{ getHeaderData.useData }}</span>
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
    let saveData = 0;
    for (let i = 0; i < props.headerData?.currentUsage?.length || 0; i++) {
      if (props.headerData?.currentUsage[i].serviceNameKey === 'data-saving') {
        saveData = props.headerData.currentUsage[i].dataUsage || 0;
        break;
      }
    }
    return {
      customerName: props.headerData?.customer?.name || '',
      saveData: formatNumber({ num: saveData }),
      useData: formatNumber({ num: props.headerData?.customerUsage?.data_usage || 0 }),
    };
  });
</script>
