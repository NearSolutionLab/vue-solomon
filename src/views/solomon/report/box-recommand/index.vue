<template>
  <PageWrapper v-loading="loadingRef" class="h-full" :contentStyle="{ height: '80%' }">
    <template #headerContent>
      <CapaAnalysisHeader :headerData="headerData" />
    </template>
    <div class="flex h-full flex-col">
      <Card
        style="width: 100%; height: 100%"
        :bodyStyle="{ height: '90%' }"
        :tab-list="tabList"
        :active-tab-key="key"
        @tab-change="(key) => onTabChange(key)"
      >
        <div v-if="key === 'result'" class="flex-none p-4 h-full">
          <VxeBasicTable ref="tableRef" v-bind="gridOptions" :span-method="mergeRowMethod" />
        </div>
        <CapaAnalysisChart v-else class="flex-none w-1/2 h-92" :chartData="chartData" />
      </Card>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { onMounted, ref, nextTick, reactive } from 'vue';
  import { getBoxRecommandReport } from '/@/api/solomon/report';
  import CapaAnalysisHeader from '/@/views/solomon/report/box-recommand/components/BoxRecommandHeader.vue';
  import CapaAnalysisChart from '/@/views/solomon/report/box-recommand/components/BoxRecommandChart.vue';
  import { boxRecomandColumns } from './meta.data';
  import { VxeTablePropTypes } from 'vxe-table';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '/@/components/VxeTable';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { formatNumber } from '/@/utils/numberUtil';

  // VxeTablePropTypes

  const { t } = useI18n();

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  const chartData = ref();
  // let requestId = null;

  const tableRef = ref<VxeGridInstance>();
  interface RowVO {
    job_dt: string;
    box_type: string;
    price: number;
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
  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    // editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: boxRecomandColumns,
    formConfig: {
      enabled: false,
    },
    columnConfig: {
      resizable: true,
    },
    showOverflow: true,
    showFooter: true,
    toolbarConfig: {
      import: false,
      export: false,
      print: false,
      zoom: true,
      custom: true,
    },
    height: 'auto',
    proxyConfig: {
      props: {
        result: 'result',
      },
      ajax: {
        query: async (args) => {
          console.log(args);
          const queryResult = await getBoxRecommandReport(props.id);
          return queryResult as RowVO[];
        },
      },
    },
    footerMethod({ columns, data }) {
      console.log(columns, data);
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return t('solomon.title.summary');
          }
          if (column.field.includes('ratio')) {
            return '';
          } else if (
            column.field.includes('qty') ||
            column.field.includes('amount') ||
            column.field.includes('vol')
          ) {
            return sumNum(data, column.field);
          } else if (column.cellType == 'number') {
            return meanNum(data, column.field);
          } else return '';
        }),
      ];
    },
  });
  const meanNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return formatNumber({ num: Math.round(count / list.length), decimals: 0 });
  };

  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return formatNumber({ num: count, decimals: 0 });
  };

  const mergeRowMethod: VxeTablePropTypes.SpanMethod<RowVO> = ({
    row,
    _rowIndex,
    column,
    visibleData,
  }) => {
    const fields = ['job_dt'];
    const cellValue = row[column.field];
    if (cellValue && fields.includes(column.field)) {
      const prevRow = visibleData[_rowIndex - 1];
      let nextRow = visibleData[_rowIndex + 1];
      if (prevRow && prevRow[column.field] === cellValue) {
        return { rowspan: 0, colspan: 0 };
      } else {
        let countRowspan = 1;
        while (nextRow && nextRow[column.field] === cellValue) {
          nextRow = visibleData[++countRowspan + _rowIndex];
        }
        if (countRowspan > 1) {
          return { rowspan: countRowspan, colspan: 1 };
        }
      }
    }
  };

  const tabList = [
    {
      key: 'result',
      tab: '박스 추천 결과 분석',
    },
    {
      key: 'chart',
      tab: '박스 추천 결과 차트',
    },
  ];

  const key = ref('result');
  const onTabChange = (value: string) => {
    key.value = value;
    nextTick(() => {
      setTabelData();
    });
  };

  // function handleSummary(tableData: Recordable[]) {
  //   const summary = {
  //     asis_amount: 0,
  //     asis_box_qty: 0,
  //     asis_empty_vol: 0,
  //     asis_empty_vol_ratio: 0,
  //     tobe_amount: 0,
  //     tobe_box_qty: 0,
  //     tobe_empty_vol: 0,
  //     tobe_empty_vol_ratio: 0,
  //   };
  //   tableData.forEach((item) => {
  //     summary.asis_amount += item.asis_amount;
  //     summary.asis_box_qty += item.asis_box_qty;
  //     summary.asis_empty_vol += item.asis_empty_vol;
  //     summary.asis_empty_vol_ratio += item.asis_empty_vol_ratio;
  //     summary.tobe_amount += item.tobe_amount;
  //     summary.tobe_box_qty += item.tobe_box_qty;
  //     summary.tobe_empty_vol_ratio += item.tobe_empty_vol_ratio;
  //   }, 0);

  //   summary.asis_empty_vol_ratio = tableData.length
  //     ? Math.round(summary.asis_empty_vol_ratio / tableData.length)
  //     : 0;
  //   summary.tobe_empty_vol_ratio = tableData.length
  //     ? Math.round(summary.tobe_empty_vol_ratio / tableData.length)
  //     : 0;
  //   return [
  //     {
  //       _row: '합계',
  //       _index: '합계',
  //       ...summary,
  //     },
  //   ];
  // }
  const reportResult = ref({} as any);
  onMounted(async () => {
    loadingRef.value = true;
    reportResult.value = await getBoxRecommandReport(props.id);
    setTabelData();
    loadingRef.value = false;
  });
  // const footerMethod: VxeTablePropTypes.FooterMethod<RowVO> = () => {
  //   // 返回一个二维数组的表尾合计
  //   return footerData.value;
  // };
  function setTabelData() {
    // console.log(reportResult.value);
    const resultList: Array<any> = reportResult.value;
    // const rId = reportResult.value.requestId;
    headerData.value = {
      title: '박스추천',
      resultList,
    };
    chartData.value = {
      resultList,
    };
    // requestId = rId;
    if (key.value === tabList[0].key) {
      // setTable1Data(resultList);
    }
  }
</script>
