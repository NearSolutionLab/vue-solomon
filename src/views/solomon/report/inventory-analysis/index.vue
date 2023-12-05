<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <InventoryAnalysisHeader :headerData="headerData" />
    </template>
    <BasicForm @register="formRegister" />
    <div class="flex flex-col">
      <div class="flex-none h-96 flex flex-row pb-4">
        <InventoryAnalysisChart1 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData1" />
        <InventoryAnalysisChart2 class="flex-none w-1/2 h-92" :chartData="chartData2" />
      </div>
      <div class="flex-none h-96 flex flex-row pb-4">
        <InventoryAnalysisChart3 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData3" />
        <InventoryAnalysisChart4 class="flex-none w-1/2 h-92" :chartData="chartData4" />
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
  import { getInventoryAnalysisReport } from '/@/api/solomon/report';
  import InventoryAnalysisHeader from '/@/views/solomon/report/inventory-analysis/components/InventoryAnalysisHeader.vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useDesign } from '/@/hooks/web/useDesign';
  import InventoryAnalysisChart1 from '/@/views/solomon/report/inventory-analysis/components/InventoryAnalysisChart1.vue';
  import InventoryAnalysisChart2 from '/@/views/solomon/report/inventory-analysis/components/InventoryAnalysisChart2.vue';
  import InventoryAnalysisChart3 from '/@/views/solomon/report/inventory-analysis/components/InventoryAnalysisChart3.vue';
  import InventoryAnalysisChart4 from '/@/views/solomon/report/inventory-analysis/components/InventoryAnalysisChart4.vue';
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

  const { prefixCls } = useDesign('inventory-analysis');
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
    title: t('solomon.title.monthly_inventory_statistics'),
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
      title: `${headerData.value.title || t('solomon.title.inventory_quantity_analysis_report')}`,
    });
    const slide = pptx.addSlide({
      sectionTitle: `${
        headerData.value.title || t('solomon.title.inventory_quantity_analysis_report')
      }`,
      masterName: 'MASTER_5CHART',
    });
    slide.addText(
      `${headerData.value.title || t('solomon.title.inventory_quantity_analysis_report')}`,
      {
        placeholder: 'header',
      },
    );
    assignChart1ToSlide(slide, pptx);
    assignChart2ToSlide(slide, pptx);
    assignChart3ToSlide(slide, pptx);
    assignChart4ToSlide(slide, pptx);
    assignChart5ToSlide(slide, pptx);

    pptx.writeFile({
      fileName: `${
        headerData.value.title || t('solomon.title.inventory_quantity_analysis_report')
      }.pptx`,
    });
  };

  const assignChart1ToSlide = (slide, pptx) => {
    const chartData = [
      {
        labels: (chartData1.value.monthlyAnalysis || []).map((item) => item.x),
        values: (chartData1.value.monthlyAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addChart(pptx.charts.BAR, chartData, {
      ...COMMON_CHART_OPTIONS,
      valAxisMinVal:
        Math.floor(Math.min(...chartData1.value.monthlyAnalysis.map((item) => item.y)) / 100) * 100,
      title: t('solomon.title.annual_inventory_trend'),
      chartColors: ['418AB3'],
      titleFontSize: 11,
      valAxisTitle: t('solomon.title.unit_pcs'),
      placeholder: 'chart1',
    });
  };

  const assignChart2ToSlide = (slide, pptx) => {
    const chartData = [
      {
        labels: (chartData2.value.categoryAnalysis || []).map((item) => item.x),
        values: (chartData2.value.categoryAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addChart(pptx.charts.PIE, chartData, {
      ...COMMON_CHART_OPTIONS,
      showLabel: true,
      showLegend: false,
      showPercent: true,
      holeSize: 40,
      title: t('solomon.title.storage_quantity_ratio'),
      layout: { x: 0.1, y: 0.5, w: 0.8, h: 0.8 },
      dataBorder: { color: 'FFFFFF' },
      chartColors: ['20455A', '326886', '8ABAD4', 'B1D1E3', 'D8E8F1'],
      titleFontSize: 11,
      dataLabelFontSize: 9,
      dataLabelColor: 'FFFFFF',
      dataLabelPosition: 'bestFit', // 'bestFit' | 'outEnd' | 'inEnd' | 'ctr'
      placeholder: 'chart2',
    });
  };

  const assignChart3ToSlide = (slide, pptx) => {
    const chartData = [
      {
        labels: (chartData2.value.categoryAnalysis || []).map((item) => item.x),
        values: (chartData2.value.categoryAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addChart(pptx.charts.BAR, chartData, {
      ...COMMON_CHART_OPTIONS,
      title: t('solomon.title.storage_loading_ratio'),
      chartColors: ['418AB3'],
      titleFontSize: 11,
      dataLabelFontSize: 9,
      valAxisTitle: t('solomon.title.unit_percent'),
      placeholder: 'chart3',
    });
  };

  const assignChart4ToSlide = (slide, pptx) => {
    const chartData = [
      {
        labels: (chartData3.value.brandAnalysis || []).map((item) => item.x),
        values: (chartData3.value.brandAnalysis || []).map((item) => item.y),
      },
    ];
    slide.addChart(pptx.charts.BAR, chartData, {
      ...COMMON_CHART_OPTIONS,
      valAxisMinVal:
        Math.floor(Math.min(...chartData3.value.brandAnalysis.map((item) => item.y)) / 100) * 100,
      title: t('solomon.title.inventory_ownership_status_by_product_brand'),
      chartColors: ['418AB3'],
      barDir: 'bar',
      dataLabelFontSize: 9,
      titleFontSize: 11,
      valAxisTitle: t('solomon.title.unit_pcs'),
      placeholder: 'chart4',
    });
  };

  const assignChart5ToSlide = (slide, pptx) => {
    const series = (chartData4.value.errorAnalysis || []).reduce((acc, curr) => {
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

    slide.addChart(pptx.charts.BAR, series, {
      ...COMMON_CHART_OPTIONS,
      title: t('solomon.title.defective_inventory_status'),
      titleFontSize: 11,
      chartColors: ['418AB3'],
      showLegend: false,
      barDir: 'bar',
      dataLabelFontSize: 9,
      valAxisTitle: t('solomon.title.unit_sku_category'),
      placeholder: 'chart5',
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
      filename: `${
        headerData.value.title || t('solomon.title.inventory_quantity_analysis_report')
      }.xlsx`,
    });
  };

  function handleSummary(tableData: any[]) {
    let summation = tableData.reduce((acc, curr) => {
      Object.keys(curr).forEach((key) => {
        if (key === 'locCount' || key === 'skuCount' || key === 'pcs')
          acc[key] = !acc[key] ? curr[key] : (acc[key] += curr[key]);
      });
      return acc;
    }, {});
    return [
      {
        date: t('solomon.text.total'),
        locCount: summation.locCount,
        skuCount: summation.skuCount,
        pcs: summation.pcs,
      },
    ];
  }

  onMounted(async () => {
    loadingRef.value = true;
    const {
      storageMethodList = [],
      monthlyAnalysis,
      categoryAnalysis = [],
      brandAnalysis = [],
      errorAnalysis = [],
    } = await getInventoryAnalysisReport(props.id);

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
      categoryAnalysis,
      brandAnalysis,
      errorAnalysis,
    });
    setTableData(
      (monthlyAnalysis || []).map((item) => {
        return {
          date: item.x,
          locCount: item.loc_count,
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
    const { monthlyAnalysis, categoryAnalysis, brandAnalysis, errorAnalysis } =
      await getInventoryAnalysisReport(props.id, storageMethod);

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
      categoryAnalysis,
      brandAnalysis,
      errorAnalysis,
    });
    loadingRef.value = false;
  }

  function updateReportData({
    title,
    monthlyAnalysis,
    categoryAnalysis,
    brandAnalysis,
    errorAnalysis,
  }) {
    headerData.value = {
      title,
      monthlyAnalysis,
    };
    chartData1.value = {
      monthlyAnalysis,
    };
    chartData2.value = {
      categoryAnalysis,
    };
    chartData3.value = {
      brandAnalysis,
    };
    chartData4.value = {
      errorAnalysis,
    };
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-inventory-analysis';

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
