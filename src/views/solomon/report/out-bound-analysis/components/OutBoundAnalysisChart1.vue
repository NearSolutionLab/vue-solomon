<template>
  <div ref="chartRef"></div>
</template>
<script setup lang="ts">
  import { ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    chartData: {
      type: Object as PropType<any>,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.chartData,
    () => {
      if (!props.chartData) return;
      const { monthlyAnalysis } = props.chartData;
      const data = monthlyAnalysis.map((item) => {
        return [item.x, item.y];
      });
      const dateList = data.map((item) => item[0]);
      const valueList = data.map((item) => item[1]);
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
          // data: ['line'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          name: '월',
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: true,
          data: dateList,
        },
        yAxis: {
          name: '출고량(PCS)',
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
            name: '출고량(PCS)',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: valueList,
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
