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
      const { ratioAnalysis } = props.chartData;
      const [{ category_num }] = ratioAnalysis;
      const data = ratioAnalysis
        .reduce((acc, curr) => {
          if (curr.x) {
            return [
              ...acc,
              {
                name: curr.x,
                value: curr.y || 0,
              },
            ];
          }
          return acc;
        }, [])
        .sort((a, b) => {
          return a.value - b.value;
        });
      setOptions({
        title: {
          text: '출고현황',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '10%',
          left: 'center',
        },
        series: [
          {
            name: '종류',
            type: 'pie',
            radius: ['40%', '70%'],
            top: '10%',
            data,
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: true,
              position: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              formatter: () => `총 ${category_num}개 품목`,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
