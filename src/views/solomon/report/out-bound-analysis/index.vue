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
          <a-button @click="aoaToExcel"> 결과 다운로드 </a-button>
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
      text: '조회',
    },
    showAdvancedButton: true,
    compact: true,
    submitFunc: handleSubmit,
  });

  const [registerTable, { setTableData, getDataSource }] = useTable({
    title: '월별 출고량 통계',
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
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  const aoaToExcel = () => {
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
      filename: '월별 출고량 통계.xlsx',
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
        date: '계',
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
      [{ value: 'all', label: '전체' }],
    );
    resetSchema([
      {
        field: 'storageMethod',
        defaultValue: 'all',
        component: 'Select',
        label: '저장 방식',
        colProps: { span: 8 },
        componentProps: {
          options: formSchema,
        },
      },
    ]);
    updateReportData({
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

    updateReportData({
      monthlyAnalysis,
      quarterAnalysis,
      ratioAnalysis,
      weeklyAnalysis,
    });
    loadingRef.value = false;
  }

  function updateReportData({ monthlyAnalysis, quarterAnalysis, ratioAnalysis, weeklyAnalysis }) {
    headerData.value = monthlyAnalysis;
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
