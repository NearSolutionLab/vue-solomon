<template>
  <div ref="chartRef"></div>
</template>
<script setup lang="ts">
  import { ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

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
          text: t('solomon.text.defective_inventory_status_by_product_brand'),
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
            name: t('solomon.text.category'),
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
