<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from '/@/views/dashboard/analysis/components/GrowCard.vue';
  import SiteAnalysis from '/@/views/dashboard/analysis/components/SiteAnalysis.vue';
  import VisitSource from '/@/views/dashboard/analysis/components/VisitSource.vue';
  import VisitRadar from '/@/views/dashboard/analysis/components/VisitRadar.vue';
  import SalesProductPie from '/@/views/dashboard/analysis/components/SalesProductPie.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
