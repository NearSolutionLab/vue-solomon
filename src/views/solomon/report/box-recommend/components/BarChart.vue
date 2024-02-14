<template>
  <div class="flex flex-col pt-4">
    <div class="flex flex-row">
      <div class="bar-chart-title rounded-4">
        <p class="text-middle">{{ chartTitle }}</p>
      </div>
      <div class="flex flex-1 justify-end pr-6 align-text-bottom mt-4"> [{{ unit }}]</div>
    </div>
    <div class="flex-1 pr-4 pt-4 h-full" ref="chartRef"></div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref, Ref, watch } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    chartData: {
      type: Object as PropType<any>,
    },
    unit: {
      type: String,
      default: 'box',
    },
    chartTitle: {
      type: String,
    },
    xTitle: {
      type: String,
    },
    yTitle: {
      type: String,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
    watch(
      () => props.chartData,
      () => {
        if (!props.chartData) return;
        const { xList, series } = props.chartData;
        if (series) {
          setOptions({
            backgroundColor: '#0f375f',
            title: {
              text: '',
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
              show: true,
            },
            legend: {
              top: 20,
              textStyle: {
                color: '#ccc',
              },
            },
            xAxis: {
              name: props.xTitle,
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                },
              },
              scale: true,
              data: xList,
            },
            yAxis: {
              name: props.yTitle,
              type: 'value',
              min: 0,
              splitLine: { show: true },
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                },
              },
              scale: true,
            },
            series: [...series],
          });
        }
      },
      { immediate: true },
    );
  });
</script>

<style lang="less" scoped>
  .bar-chart-title {
    width: 30%;
    height: auto;
    padding-left: 1rem;
    background-image: linear-gradient(to right, #01b0f0, #0070c0);
    color: aliceblue;
    font-size: 1.5rem;
    text-align: center;
  }

  p {
    margin: auto !important;
  }
</style>
