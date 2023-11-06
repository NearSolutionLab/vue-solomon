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
      const { weeklyAnalysis } = props.chartData;
      const data = weeklyAnalysis.map((item) => {
        return [item.x, Math.round(item.y * 100) / 100];
      });
      const dateList = data.map((item) => item[0]);
      const valueList = data.map((item) => item[1]);
      setOptions({
        backgroundColor: '#0f375f',
        title: {
          text: '요일 별 평균 출고주문 건수',
          textStyle: {
            color: '#ccc',
          },
        },
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
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          name: '요일',
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: true,
          data: dateList,
        },
        yAxis: {
          name: '평균 출고량(PCS)',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: true,
        },
        grid: {
          bottom: 40,
        },
        series: [
          {
            name: '평균 출고량(PCS)',
            type: 'bar',
            data: valueList,
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
