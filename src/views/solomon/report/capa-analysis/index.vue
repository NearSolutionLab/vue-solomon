<template>
  <PageWrapper v-loading="loadingRef">
    <template #headerContent>
      <CapaAnalysisHeader :headerData="headerData" />
    </template>
    <div class="flex flex-col">
      <div class="flex-none h-96 flex flex-row pb-4">
        <div class="flex-none w-1/2 pr-4 h-90">
          <BasicTable @register="registerTable1" @row-click="rowClick" />
        </div>
        <CapaAnalysisChart class="flex-none w-1/2 h-92" :chartData="chartData" />
      </div>
      <div class="flex-none h-96">
        <BasicTable @register="registerTable2">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    icon: 'vscode-icons:file-type-excel',
                    onClick: downloadReport.bind(null, record),
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getCapaAnalysisReport, getDasCapaDetails } from '/@/api/solomon/report';
  import { getOptimizeRequest } from '/@/api/solomon/service';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import CapaAnalysisHeader from '/@/views/solomon/report/capa-analysis/components/CapaAnalysisHeader.vue';
  import CapaAnalysisChart from './components/CapaAnalysisChart.vue';
  import { performancePerOrdersColumns, orderResultColumns } from './meta.data';
  import { jsonToMultipleSheetXlsx } from '/@/components/Excel/src/Export2Excel';

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  const chartData = ref();
  let requestId = null;

  const [registerTable1, { setTableData: setTable1Data }] = useTable({
    title: '배치당 주문 수에 따른 주문처리 효율',
    columns: performancePerOrdersColumns,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    // scroll: { y: 100 },
    rowSelection: {
      type: 'radio',
    },
    isCanResizeParent: true,
  });

  const [registerTable2, { setTableData: setTable2Data }] = useTable({
    title: '일자 별 주문 분석 결과',
    columns: orderResultColumns,
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

  function handleSummary(tableData: any[]) {
    let performanceRatio = tableData.reduce((acc, curr) => (acc += curr.performanceRatio), 0);
    let avg = performanceRatio / tableData.length;
    return [
      {
        date: '평균',
        performanceRatio: avg,
      },
    ];
  }

  const rowClick = (e) => {
    const data = e.details.map((detail) => {
      return {
        date: detail.date.slice(0, 10),
        groupCount: detail.groupCount,
        batchSize: detail.batchSize,
        orderCount: detail.orderCount,
        skuCount: detail.skuCount,
        randomSkuCount: detail.randomSkuCount,
        combinationCount: detail.combinationCount,
        eaSum: detail.eaSum,
        performanceRatio: detail.performanceRatio,
      };
    });
    setTable2Data(data);
  };

  onMounted(async () => {
    loadingRef.value = true;
    const { capaAnalysisList, requestId: rId } = await getCapaAnalysisReport(props.id);
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
    headerData.value = {
      title,
      capaAnalysisList,
    };
    chartData.value = {
      capaAnalysisList,
    };
    requestId = rId;
    setTable1Data(
      (capaAnalysisList || []).map((item) => {
        return {
          orderCount: item.orderCount,
          orderCountPerSku: item.orderCountPerSku,
          performanceRatio: item.performanceRatio,
          details: item.details,
        };
      }),
    );
    loadingRef.value = false;
  });

  async function downloadReport(record: Recordable) {
    if (requestId) {
      loadingRef.value = true;
      const { batchResult, combination, details } = await getDasCapaDetails(
        requestId,
        record.batchSize,
        record.date,
      );
      const batchResultHeader = {
        date: '날짜',
        customerGroupNo: '배치 번호',
        orderCount: '주문 수',
        skuCount: '상품 수',
        eaCountSum: '수량',
      };
      const combinationHeader = {
        date: '날짜',
        customerGroupNo: '배치 번호',
        combination: '주문 조합',
        orderCount: '주문 수',
        eaCountSum: '수량',
      };
      const detailsHeader = {
        date: '날짜',
        customerGroupNo: '배치 번호',
        orderNo: '주문 번호',
        skuNo: '상품 번호',
        skuName: '상품 이름',
        eaCount: '수량',
      };

      jsonToMultipleSheetXlsx({
        sheetList: [
          {
            data: batchResult as any,
            header: batchResultHeader as any,
            json2sheetOpts: {
              // 순서
              header: ['date', 'customerGroupNo', 'orderCount', 'skuCount', 'eaCountSum'],
            },
            sheetName: '배치결과 통계',
          },
          {
            data: combination as any,
            header: combinationHeader as any,
            json2sheetOpts: {
              // 순서
              header: ['date', 'customerGroupNo', 'combination', 'orderCount', 'eaCountSum'],
            },
            sheetName: '배치별 조합 통계',
          },
          {
            data: details as any,
            header: detailsHeader as any,
            json2sheetOpts: {
              // 순서
              header: ['date', 'customerGroupNo', 'orderNo', 'skuNo', 'skuName', 'eaCount'],
            },
            sheetName: '세부내역',
          },
        ],
        filename: `주문패턴분석리포트_${record.date}.xlsx`,
      });
      loadingRef.value = false;
    }
  }
</script>
