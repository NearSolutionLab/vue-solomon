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
      const { errorAnalysis } = props.chartData;
      const data = errorAnalysis
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
        backgroundColor: '#0f375f',
        title: {
          text: '제품 브랜드 별 불량 재고 현황',
          left: 'left',
          textStyle: {
            color: '#ccc',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          top: '10%',
          left: '5%',
          textStyle: {
            color: '#ccc',
          },
        },
        series: [
          {
            name: '종류',
            type: 'pie',
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
              position: 'outside',
              formatter(param) {
                return param.name + ' (' + (param.percent || 0) + '%)';
              },
            },
            labelLine: {
              show: true,
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
