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
          <a-button @click="jsonToExcel"> 결과 다운로드 </a-button>
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
      text: '조회',
    },
    showAdvancedButton: true,
    compact: true,
    submitFunc: handleSubmit,
  });

  const [registerTable, { setTableData, getDataSource }] = useTable({
    title: '월별 재고 통계',
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
      filename: `${headerData.value.title || '재고 물동량 분석 리포트'}.xlsx`,
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
        date: '계',
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
