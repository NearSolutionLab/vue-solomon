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
      const { monthlyAnalysis } = props.chartData;
      const data = monthlyAnalysis.map((item) => {
        return [item.x, item.y];
      });
      const dateList = data.map((item) => item[0]);
      const valueList = data.map((item) => item[1]);
      setOptions({
        backgroundColor: '#0f375f',
        title: {
          text: t('solomon.text.annual_inventory_trend'),
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
          // data: ['line'],
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
        },
        xAxis: {
          name: t('solomon.text.month'),
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: true,
          data: dateList,
        },
        yAxis: {
          name: t('solomon.text.outbound_quantity_pcs'),
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: false,
        },
        grid: {
          bottom: 40,
        },
        series: [
          {
            name: t('solomon.text.inventory_quantity_pcs'),
            type: 'bar',
            data: valueList,
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
