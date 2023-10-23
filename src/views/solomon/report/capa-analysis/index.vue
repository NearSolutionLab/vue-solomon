<template>
  <PageWrapper title="주문 패턴 분석 리포트" />
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted } from 'vue';
  import { GetCapaAnalysisReport } from '/@/api/solomon/report';

  const props = defineProps({
    id: { type: String },
  });
  onMounted(async () => {
    const result = await GetCapaAnalysisReport(props.id);
    console.log(result);
  });
</script>
