<template>
  <div class="grid grid-rows-2 gap-2">
    <div class="flex-none flex flex-row gap-2 pb-4">
      <BarChart
        :chartTitle="t('solomon.title.box_qty')"
        :xTitle="t('solomon.title.box_type')"
        :yTitle="t('solomon.title.box_qty')"
        :unit="t('solomon.title.unit_box')"
        class="flex-none w-1/2 pr-4"
        :chartData="chartDataBoxCount"
      />
      <BarChart
        :chartTitle="t('solomon.title.box_amount')"
        :xTitle="t('solomon.title.box_type')"
        :yTitle="t('solomon.title.box_amount')"
        :unit="t('solomon.title.unit_kwon')"
        class="flex-none w-1/2"
        :chartData="chartDataAmount"
      />
    </div>
    <div class="flex-none flex flex-row gap-2">
      <BarChart
        :chartTitle="t('solomon.title.empty_volume')"
        :xTitle="t('solomon.title.box_type')"
        :yTitle="t('solomon.title.empty_volume')"
        :unit="t('solomon.title.unit_kcbm')"
        class="flex-none w-1/2"
        :chartData="chartDataEmptyVol"
      />
      <BarChart
        :chartTitle="t('solomon.title.empty_volume_ratio')"
        :xTitle="t('solomon.title.box_type')"
        :yTitle="t('solomon.title.empty_volume_ratio')"
        :unit="t('solomon.title.unit_percent')"
        class="flex-none w-1/2"
        :chartData="chattDataMeanVolRatio"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { formatNumber } from '/@/utils/numberUtil';
  import BarChart from '/@/views/solomon/report/box-recommend/components/BarChart.vue';
  import { SeriesOption } from 'echarts';
  import * as XEUtils from 'xe-utils';

  const { t } = useI18n();

  export interface BarChartModel {
    xList: Array<String>;
    series: Array<Partial<SeriesOption>>;
  }
  const props = defineProps({
    chartData: { type: Object },
  });
  export interface BoxData {
    job_dt: string;
    box_type?: string;
    price?: number;
    asis_box_qty: number;
    asis_amount: number;
    asis_empty_vol: number;
    asis_empty_vol_ratio: number;
    tobe_box_qty: number;
    tobe_amount: number;
    tobe_empty_vol: number;
    tobe_empty_vol_ratio: number;
    diff_qty: number;
    diff_amount: number;
    diff_empty_vol: number;
    diff_empty_vol_ratio: number;
  }
  export interface BoxSeries {
    name: 'AS-IS' | 'TO-BE';
    type: 'bar';
    data: number[];
    itemStyle: {
      color: string;
    };
    label?: {};
  }
  export interface BoxSummary {
    xList: string[];
    series: BoxSeries[];
  }
  const chartDataBoxCount = ref<BoxSummary>({} as BoxSummary);
  const chartDataAmount = ref<BoxSummary>({} as BoxSummary);
  const chartDataEmptyVol = ref<BoxSummary>({} as BoxSummary);
  const chattDataMeanVolRatio = ref<BoxSummary>({} as BoxSummary);
  onMounted(() => {
    const detail: [BoxData] = props.chartData?.result?.detail;
    let groupedData;
    if (detail && detail.length > 0) {
      groupedData = XEUtils.groupBy(detail, 'box_type');
      groupedData['합계'] = detail;
    }
    chartDataBoxCount.value = calcSummary(groupedData, 'sum', 1, 'asis_box_qty', 'tobe_box_qty');
    chartDataAmount.value = calcSummary(groupedData, 'sum', 1000, 'asis_amount', 'tobe_amount');
    chartDataEmptyVol.value = calcSummary(
      groupedData,
      'sum',
      1000,
      'asis_empty_vol',
      'tobe_empty_vol',
    );
    chattDataMeanVolRatio.value = calcSummary(
      groupedData,
      'ratio',
      1,
      'asis_empty_vol_ratio',
      'tobe_empty_vol_ratio',
    );
  });

  const calcSummary = (groupedData, method, unit, asisField: string, tobeField: string) => {
    const xList = Object.keys(groupedData);
    let chartDataSummary = {} as BoxSummary;
    chartDataSummary.xList = xList;
    chartDataSummary.series = [
      {
        name: 'AS-IS',
        type: 'bar',
        data: xList.map((boxType) => {
          return method === 'ratio'
            ? XEUtils.mean(groupedData[boxType], asisField)
            : Math.round(XEUtils.sum(groupedData[boxType], asisField) / unit);
        }),
        itemStyle: {
          color: 'lightgray',
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: (series) => {
            return formatNumber({ num: series.value, decimals: 0 });
          },
        },
      },
      {
        name: 'TO-BE',
        type: 'bar',
        data: xList.map((boxType) => {
          console.log(method === 'ratio' ? XEUtils.mean(groupedData[boxType], tobeField) : 0);
          return method === 'ratio'
            ? XEUtils.mean(groupedData[boxType], tobeField)
            : Math.round(XEUtils.sum(groupedData[boxType], tobeField) / unit);
        }),
        itemStyle: {
          color: '#FF7C00',
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: (series) => {
            return formatNumber({ num: series.value, decimals: 0 });
          },
        },
      },
    ];
    return chartDataSummary;
  };
</script>
