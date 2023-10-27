<template>
  <PageWrapper v-loading="loadingRef">
    <template #headerContent>
      <OutBoundAnalysisHeader :headerData="headerData" />
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getOutBoundAnalysisReport } from '/@/api/solomon/report';
  import OutBoundAnalysisHeader from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisHeader.vue';

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();

  onMounted(async () => {
    loadingRef.value = true;
    const {
      monthlyAnalysis,
      // , quarterAnalysis, ratioAnalysis, storageMethodList, weeklyAnalysis
    } = await getOutBoundAnalysisReport(props.id);
    headerData.value = monthlyAnalysis;
    loadingRef.value = false;
  });
</script>
