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
      const { quarterAnalysis } = props.chartData;
      let _cat = '';
      const quarterList = quarterAnalysis.reduce((acc, curr) => {
        if (acc.length === 0) {
          _cat = curr.category;
          return [...acc, curr.x];
        } else if (_cat === curr.category) {
          return [...acc, curr.x];
        } else {
          return acc;
        }
      }, []);

      const series = quarterAnalysis.reduce((acc, curr) => {
        const exists = acc.find((i) => i.name === curr.category);
        if (exists) {
          exists.data.push(curr.y);
          return acc;
        }
        return [
          ...acc,
          {
            name: curr.category,
            type: 'line',
            data: [curr.y],
          },
        ];
      }, []);

      setOptions({
        backgroundColor: '#0f375f',
        title: {
          text: t('solomon.text.quarterly_outbound_order_count'),
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
          name: t('solomon.text.quarter'),
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: true,
          data: quarterList,
        },
        yAxis: {
          name: t('solomon.text.outbound_quantity_pcs'),
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
        series,
      });
    },
    { immediate: true },
  );
</script>
