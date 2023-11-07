<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <InBoundAnalysisHeader :headerData="headerData" />
    </template>
    <BasicForm @register="formRegister" />
    <div class="flex flex-col">
      <div class="flex-none h-96 flex flex-row pb-4">
        <InBoundAnalysisChart1 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData1" />
        <InBoundAnalysisChart2 class="flex-none w-1/2 h-92" :chartData="chartData2" />
      </div>
      <div class="flex-none h-96 flex flex-row pb-4">
        <InBoundAnalysisChart3 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData3" />
        <InBoundAnalysisChart4 class="flex-none w-1/2 h-92" :chartData="chartData4" />
      </div>
    </div>
    <div class="flex-none h-96">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button @click="jsonToExcel"> 결과 다운로드 </a-button>
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getInBoundAnalysisReport } from '/@/api/solomon/report';
  import InBoundAnalysisHeader from '/@/views/solomon/report/in-bound-analysis/components/InBoundAnalysisHeader.vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useDesign } from '/@/hooks/web/useDesign';
  import InBoundAnalysisChart1 from '/@/views/solomon/report/in-bound-analysis/components/InBoundAnalysisChart1.vue';
  import InBoundAnalysisChart2 from '/@/views/solomon/report/in-bound-analysis/components/InBoundAnalysisChart2.vue';
  import InBoundAnalysisChart3 from '/@/views/solomon/report/in-bound-analysis/components/InBoundAnalysisChart3.vue';
  import InBoundAnalysisChart4 from '/@/views/solomon/report/in-bound-analysis/components/InBoundAnalysisChart4.vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './meta.data';
  import { jsonToSheetXlsx } from '/@/components/Excel/src/Export2Excel';
  import { getOptimizeRequest } from '/@/api/solomon/service';

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  const chartData1 = ref();
  const chartData2 = ref();
  const chartData3 = ref();
  const chartData4 = ref();

  const { prefixCls } = useDesign('in-bound-analysis');
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
    title: '월별 입고량 통계',
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
      filename: `${headerData.value.title || '월별 입고량 통계'}.xlsx`,
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
      await getInBoundAnalysisReport(props.id);

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
      await getInBoundAnalysisReport(props.id, storageMethod);

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
  @prefix-cls: ~'@{namespace}-in-bound-analysis';

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
