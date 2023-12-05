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
      const { weeklyAnalysis } = props.chartData;
      const data = weeklyAnalysis.map((item) => {
        return [item.x, Math.round(item.y * 100) / 100];
      });
      const dateList = data.map((item) => item[0]);
      const valueList = data.map((item) => item[1]);
      setOptions({
        backgroundColor: '#0f375f',
        title: {
          text: t('solomon.text.average_daily_outbound_order_quantity_by_day_of_the_week'),
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
          name: t('solomon.text.day_of_the_week'),
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          scale: true,
          data: dateList,
        },
        yAxis: {
          name: t('solomon.text.average_outbound_quantity'),
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
            name: t('solomon.text.average_outbound_quantity'),
            type: 'bar',
            data: valueList,
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
