<template>
  <PageWrapper v-loading="loadingRef" class="h-[calc(100%-1rem)]" :contentStyle="{ height: '98%' }">
    <div class="flex h-full flex-col">
      <Card
        style="width: 100%; height: 100%"
        :bodyStyle="{ height: '90%', overflow: 'hidden', padding: '0' }"
        :tab-list="tabList"
        :active-tab-key="key"
        @tab-change="(key) => onTabChange(key)"
      >
        <div v-if="key === 'result'" class="flex h-full flex-col">
          <span class="text-right px-6 my-auto">2024-01-15 ~ 2024-01-31</span>
          <VxeBasicTable ref="tableRef" v-bind="gridOptions" :span-method="mergeRowMethod">
            <template #expand_col="{ row }">
              <span>{{ row.job_dt }}</span>
            </template>
            <template #expand_content="{ row }">
              <VxeGrid ref="detailTableRef" v-bind="detailGridOptions" :data="row.list" />
            </template>
            <template #loading> </template>
          </VxeBasicTable>
        </div>
        <BmsChart v-else class="flex-none h-full px-6" :chartData="chartData" />
      </Card>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  import { getBoxRecommendReport } from '/@/api/solomon/report';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '/@/components/VxeTable';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { formatNumber } from '/@/utils/numberUtil';
  import BmsChart from '/@/views/solomon/report/box-recommend/components/BoxRecommendChart.vue';
  import { Card } from 'ant-design-vue';
  import { VxeTablePropTypes } from 'vxe-table';

  import { boxRecomendColumns, boxRecomendSummaryColumns } from './meta.data';

  const { t } = useI18n();

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const queryResult = ref();
  const chartData = ref();

  const tableRef = ref<VxeGridInstance>();
  const detailTableRef = ref<VxeGridInstance>();

  interface RowVO {
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
    list?: [];
  }

  const detailGridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    columns: boxRecomendColumns,
    formConfig: {
      enabled: false,
    },
    columnConfig: {
      resizable: true,
      useKey: true,
    },
    headerRowStyle: { backgroundColor: '#002099', color: '#fff', textAlign: 'center' },
    showOverflow: true,
    showFooter: true,
    toolbarConfig: {
      import: false,
      export: false,
      print: false,
      zoom: false,
      refresh: false,
      custom: false,
    },
    height: 300,
  });

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    tableStyle: { paddingTop: 0 },
    keepSource: true,
    // editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: boxRecomendSummaryColumns,
    formConfig: {
      enabled: false,
    },
    columnConfig: {
      resizable: true,
      useKey: true,
    },
    showOverflow: true,
    showFooter: true,
    toolbarConfig: {
      enabled: false,
      import: false,
      export: false,
      print: false,
      zoom: false,
      refresh: false,
      custom: false,
    },
    height: 'auto',
    proxyConfig: {
      props: {
        result: 'result',
      },
      ajax: {
        query: async () => {
          loadingRef.value = true;
          chartData.value = queryResult.value = await getBoxRecommendReport(props.id);
          let masterList = queryResult.value.result.master || [];
          let detailList = queryResult.value.result.detail || [];
          masterList.forEach((master) => {
            master.list = detailList.filter((detail) => {
              return detail.job_dt === master.job_dt;
            });
          });
          loadingRef.value = false;
          return { result: masterList };
        },
      },
    },
    headerRowStyle: { backgroundColor: '#002060', color: '#fff' },
    headerCellStyle: { textAlign: 'center' },
    footerRowStyle: { backgroundColor: '#0095d0', color: '#fff' },
    footerMethod({ columns, data }) {
      const footer = columns.map((column, columnIndex) => {
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
      });
      return [footer];
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
  };
</script>

<style lang="less">
  .up {
    width: 0;
    height: 0;
    margin-top: 0;
    border-top: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid blue;
    border-left: 0.5rem solid transparent;
  }

  .down {
    width: 0;
    height: 0;
    margin-top: auto;
    border-top: 0.5rem solid red;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
  }

  .normal {
    width: 0;
    height: 0;
    margin-top: auto;
    border-top: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
  }
</style>
