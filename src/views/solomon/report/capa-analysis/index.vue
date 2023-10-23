<template>
  <PageWrapper v-loading="loadingRef" title="주문 패턴 분석 리포트">
    <div ref="chartRef" :style="{ height, width }"></div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref, Ref } from 'vue';
  import { GetCapaAnalysisReport } from '/@/api/solomon/report';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    id: { type: String },
    width: {
      type: String as PropType<string>,
      default: '50%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(50vh - 78px)',
    },
  });
  const loadingRef = ref(false);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(async () => {
    loadingRef.value = true;
    const result = await GetCapaAnalysisReport(props.id);
    const data = result.capaAnalysisList.map((item) => {
      return [item.orderCount, item.performanceRatio];
    });
    loadingRef.value = false;

    setOptions({
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333',
          },
        },
      },
      legend: {
        data: ['line'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        name: '주문수',
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        scale: true,
      },
      yAxis: {
        name: '효율',
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        scale: true,
      },
      series: [
        {
          name: '효율',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data,
        },
      ],
    });
  });
</script>
