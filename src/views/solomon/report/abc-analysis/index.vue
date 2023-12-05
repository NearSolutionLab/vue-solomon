<template>
  <PageWrapper v-loading="loadingRef">
    <template #headerContent>
      <ABCAnalysisHeader :headerData="headerData" />
    </template>
    <div class="flex flex-col">
      <div class="flex-none h-112 flex flex-row pb-4">
        <div class="flex-none w-1/4 pr-4 h-90"> </div>
        <ABCAnalysisChart class="flex-none w-1/2 h-108" :chartData="chartData" />
        <div class="flex-none w-1/4 pl-4 h-90"> </div>
      </div>
      <div class="flex-none h-144">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <a-button @click="jsonToExcel">{{ t('solomon.button.download_result') }}</a-button>
          </template>
        </BasicTable>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getABCAnalysisReport } from '/@/api/solomon/report';
  import { getOptimizeRequest } from '/@/api/solomon/service';
  import { BasicTable, useTable } from '/@/components/Table';
  import ABCAnalysisHeader from '/@/views/solomon/report/abc-analysis/components/ABCAnalysisHeader.vue';
  import ABCAnalysisChart from './components/ABCAnalysisChart.vue';
  import { columns } from './meta.data';
  import { jsonToSheetXlsx } from '/@/components/Excel/src/Export2Excel';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  const chartData = ref();

  const [registerTable, { setTableData, getDataSource }] = useTable({
    title: t('solomon.title.abc_analysis_report'),
    columns,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
    // pagination: false,
    showSummary: true,
    maxHeight: 400,
  });

  onMounted(async () => {
    loadingRef.value = true;
    const { abcHighlight, abcAnalysis, abcGrade } = await getABCAnalysisReport(props.id);
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
      abcHighlight,
      abcAnalysis,
      abcGrade,
    });

    loadingRef.value = false;
  });

  function updateReportData({ title, abcHighlight, abcAnalysis, abcGrade }) {
    headerData.value = {
      title,
      abcHighlight,
    };
    chartData.value = {
      abcGrade,
    };
    setTableData(
      (abcAnalysis || []).map((item) => {
        return {
          skuNo: item.sku_no,
          dayCount: item.day_count || 0,
          orderCount: item.order_count || 0,
          eaCount: item.ea_count || 0,
          prop: item.prop || 0,
          propSum: item.propSum || 0,
          averageGrade: item.average_grade,
          avgCount: item.day_count !== 0 ? item.ea_count / item.day_count : 0,
        };
      }),
    );
  }

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
      filename: `${headerData.value.title || t('solomon.title.abc_analysis_report')}.xlsx`,
    });
  };
</script>
