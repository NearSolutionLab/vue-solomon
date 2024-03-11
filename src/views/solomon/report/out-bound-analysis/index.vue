<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <OutBoundAnalysisHeader :headerData="headerData" />
    </template>
    <BasicForm @register="formRegister" />
    <div class="flex flex-col">
      <div class="flex-none h-96 flex flex-row pb-4">
        <OutBoundAnalysisChart1 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData1" />
        <OutBoundAnalysisChart2 class="flex-none w-1/2 h-92" :chartData="chartData2" />
      </div>
      <div class="flex-none h-96 flex flex-row pb-4">
        <OutBoundAnalysisChart3 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData3" />
        <OutBoundAnalysisChart4 class="flex-none w-1/2 h-92" :chartData="chartData4" />
      </div>
    </div>
    <div class="flex-none h-96">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button @click="downloadReport">{{ t('solomon.button.download_result') }}</a-button>
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getOutBoundAnalysisReport } from '/@/api/solomon/report';
  import OutBoundAnalysisHeader from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisHeader.vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useDesign } from '/@/hooks/web/useDesign';
  import OutBoundAnalysisChart1 from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisChart1.vue';
  import OutBoundAnalysisChart2 from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisChart2.vue';
  import OutBoundAnalysisChart3 from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisChart3.vue';
  import OutBoundAnalysisChart4 from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisChart4.vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './meta.data';
  import { jsonToSheetXlsx } from '/@/components/Excel/src/Export2Excel';
  import { getOptimizeRequest } from '/@/api/solomon/service';
  import { initPpt, createMasterSlides } from '/@/utils/ppt-util';
  import { COMMON_CHART_OPTIONS } from '/@/utils/ppt-enums';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  const chartData1 = ref();
  const chartData2 = ref();
  const chartData3 = ref();
  const chartData4 = ref();

  const { prefixCls } = useDesign('out-bound-analysis');
  const [formRegister, { validate, resetSchema }] = useForm({
    labelWidth: 120,
    submitButtonOptions: {
      text: t('solomon.text.retrieval'),
    },
    showAdvancedButton: true,
    compact: true,
    submitFunc: handleSubmit,
  });

  const [registerTable, { setTableData, getDataSource }] = useTable({
    title: t('solomon.title.monthly_outbound_statistics'),
    columns,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
    pagination: false,
    showSummary: true,
    maxHeight: 180,
    summaryFunc: handleSummary,
    actionColumn: {
      width: 30,
      title: '',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  const downloadReport = () => {
    jsonToPptx();
    jsonToExcel();
  };

  const jsonToPptx = () => {
    const pptx = initPpt();
    createMasterSlides(pptx);
    pptx.addSection({
      title: `${headerData.value.title || t('solomon.title.monthly_outbound_statistics')}`,
    });
    const slide = pptx.addSlide({
      sectionTitle: `${headerData.value.title || t('solomon.title.monthly_outbound_statistics')}`,
      masterName: 'MASTER_4CHART',
    });
    slide.addText(`${headerData.value.title || t('solomon.title.monthly_outbound_statistics')}`, {
      placeholder: 'header',
    });
    assignChart1ToSlide(slide, pptx);
    assignChart2ToSlide(slide, pptx);
    assignChart3ToSlide(slide, pptx);
    assignChart4ToSlide(slide, pptx);

    pptx.writeFile({
      fileName: `${headerData.value.title || t('solomon.title.monthly_outbound_statistics')}.pptx`,
    });
  };

  const assignChart1ToSlide = (slide, pptx) => {
    const monthlyChartData = [
      {
        name: 'Monthly Analysis',
        labels: (chartData1.value.monthlyAnalysis || []).map((item) => item.x),
        values: (chartData1.value.monthlyAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addChart(pptx.charts.LINE, monthlyChartData, {
      ...COMMON_CHART_OPTIONS,
      placeholder: 'chart1',
    });
  };

  const assignChart2ToSlide = (slide, pptx) => {
    const monthlyChartData = [
      {
        name: 'Weekly Analysis',
        labels: (chartData2.value.weeklyAnalysis || []).map((item) => item.x),
        values: (chartData2.value.weeklyAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addChart(pptx.charts.BAR, monthlyChartData, {
      ...COMMON_CHART_OPTIONS,
      valAxisMinVal:
        Math.floor(Math.min(...chartData2.value.weeklyAnalysis.map((item) => item.y)) / 100) * 100,
      title: t('solomon.title.daily_average_outbound'),
      chartColors: ['418AB3'],
      valAxisTitle: t('solomon.title.unit_pcs'),
      placeholder: 'chart2',
    });
  };

  const assignChart3ToSlide = (slide, pptx) => {
    const monthlyChartData = [
      {
        name: 'Ratio Analysis',
        labels: (chartData3.value.ratioAnalysis || []).map((item) => item.x),
        values: (chartData3.value.ratioAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addText(`총 ${chartData3.value.ratioAnalysis[0]?.category_num || 0}개 \n품목`, {
      h: 0.44,
      w: 0.9,
      x: 3.2,
      y: 5.3,
      fontSize: 12,
      align: 'center',
      valign: 'middle',
      wrap: true,
    });
    slide.addChart(pptx.charts.DOUGHNUT, monthlyChartData, {
      ...COMMON_CHART_OPTIONS,
      showLabel: true,
      showLegend: true,
      showPercent: true,
      holeSize: 40,
      title: t('solomon.title.major_item_outbound_status'),
      layout: { x: 0.1, y: 0.5, w: 0.8, h: 0.8 },
      dataBorder: { color: 'FFFFFF' },
      chartColors: ['20455A', '326886', '8ABAD4', 'B1D1E3', 'D8E8F1'],
      valAxisTitle: t('solomon.title.unit_pcs'),
      placeholder: 'chart3',
    });
  };

  const assignChart4ToSlide = (slide, pptx) => {
    const series = (chartData4.value.quarterAnalysis || []).reduce((acc, curr) => {
      const exists = acc.find((i) => i.name === curr.category);
      if (exists) {
        exists.labels.push(curr.x);
        exists.values.push(curr.y);
        return acc;
      }
      return [
        ...acc,
        {
          name: curr.category,
          labels: [curr.x],
          values: [curr.y],
        },
      ];
    }, []);

    slide.addChart(pptx.charts.LINE, series, {
      ...COMMON_CHART_OPTIONS,
      title: t('solomon.title.major_item_outbound_trend'),
      chartColors: ['20455A', '326886', '8ABAD4', 'B1D1E3', 'D8E8F1'],
      showLegend: true,
      valAxisTitle: t('solomon.title.unit_pcs'),
      placeholder: 'chart4',
    });
  };

  const jsonToExcel = () => {
    const header = columns.reduce((acc, column: any) => {
      return {
        ...acc,
        [column.dataIndex]: column.title,
      };
    }, {});
    const data = getDataSource().map((d) => {
      const obj = {};
      Object.keys(header).forEach((key) => {
        obj[key] = d[key] ?? '';
      });
      return obj;
    });
    jsonToSheetXlsx({
      data,
      header,
      filename: `${headerData.value.title || t('solomon.title.monthly_outbound_statistics')}.xlsx`,
    });
  };

  function handleSummary(tableData: any[]) {
    let summation = tableData.reduce((acc, curr) => {
      Object.keys(curr).forEach((key) => {
        if (key === 'orderCount' || key === 'skuCount' || key === 'pcs')
          acc[key] = !acc[key] ? curr[key] : (acc[key] += curr[key]);
      });
      return acc;
    }, {});
    return [
      {
        date: t('solomon.text.total'),
        orderCount: summation.orderCount,
        skuCount: summation.skuCount,
        pcs: summation.pcs,
      },
    ];
  }

  onMounted(async () => {
    loadingRef.value = true;
    const { storageMethodList, monthlyAnalysis, quarterAnalysis, ratioAnalysis, weeklyAnalysis } =
      await getOutBoundAnalysisReport(props.id);

    const { items } = await getOptimizeRequest({
      query: JSON.stringify([
        {
          name: 'id',
          operator: 'eq',
          value: props.id,
          relation: false,
        },
      ]),
    });
    const title = items[0]?.name || '';

    const formSchema = storageMethodList.reduce(
      (acc, curr) => {
        if (curr.storage_method === 'all' || curr.storage_method === '') {
          return acc;
        }
        return [
          ...acc,
          {
            value: curr.storage_method,
            label: curr.storage_method,
          },
        ];
      },
      [{ value: 'all', label: t('solomon.label.total') }],
    );
    resetSchema([
      {
        field: 'storageMethod',
        defaultValue: 'all',
        component: 'Select',
        label: t('solomon.label.storage_method'),
        colProps: { span: 8 },
        componentProps: {
          options: formSchema,
        },
      },
    ]);
    updateReportData({
      title,
      monthlyAnalysis,
      quarterAnalysis,
      ratioAnalysis,
      weeklyAnalysis,
    });
    setTableData(
      (monthlyAnalysis || []).map((item) => {
        return {
          date: item.x,
          orderCount: item.order_count,
          skuCount: item.sku_count,
          pcs: item.y,
        };
      }),
    );
    loadingRef.value = false;
  });

  async function handleSubmit() {
    loadingRef.value = true;
    const { storageMethod } = await validate();
    const { monthlyAnalysis, quarterAnalysis, ratioAnalysis, weeklyAnalysis } =
      await getOutBoundAnalysisReport(props.id, storageMethod);

    const { items } = await getOptimizeRequest({
      query: JSON.stringify([
        {
          name: 'id',
          operator: 'eq',
          value: props.id,
          relation: false,
        },
      ]),
    });
    const title = items[0]?.name || '';

    updateReportData({
      title,
      monthlyAnalysis,
      quarterAnalysis,
      ratioAnalysis,
      weeklyAnalysis,
    });
    loadingRef.value = false;
  }

  function updateReportData({
    title,
    monthlyAnalysis,
    quarterAnalysis,
    ratioAnalysis,
    weeklyAnalysis,
  }) {
    headerData.value = {
      title,
      monthlyAnalysis,
    };
    chartData1.value = {
      monthlyAnalysis,
    };
    chartData2.value = {
      weeklyAnalysis,
    };
    chartData3.value = {
      ratioAnalysis,
    };
    chartData4.value = {
      quarterAnalysis,
    };
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-out-bound-analysis';

  .@{prefix-cls} {
    max-width: 100%;
    height: 100%;

    .ant-form {
      width: 100%;
      margin-bottom: 16px;
      padding: 12px 10px 6px;
      border-radius: 2px;
      background-color: @component-background;
    }
  }
</style>
