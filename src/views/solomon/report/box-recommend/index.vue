<template>
  <PageWrapper v-loading="loadingRef" class="h-[calc(100%-1rem)]" :contentStyle="{ height: '98%' }">
    <div class="flex h-full flex-col">
      <!-- Card로 처리하면 Tab에 의해 선택될때 마다 grid 및 chart instance가 새로 Mount되어 여러가지 처리 절차가 생략 된다. -->
      <Card
        style="width: 100%; height: 100%"
        :bodyStyle="{ height: '90%', overflow: 'hidden', padding: '0' }"
        :tab-list="tabList"
        :active-tab-key="key"
        @tab-change="(key) => onTabChange(key)"
      >
        <div v-if="key === 'result'" class="flex h-full flex-col">
          <!-- <span class="text-right px-6 my-auto">2024-01-15 ~ 2024-01-31</span> -->
          <VxeBasicTable
            ref="gridRef"
            v-bind="gridOptions"
            v-on="gridEvents"
            :span-method="mergeRowMethod"
          >
            <template #expand_col="{ row }">
              <span>{{ row.job_dt }}</span>
            </template>
            <template #expand_content="{ row }">
              <VxeGrid ref="detailGridRef" v-bind="detailGridOptions" :data="row.list" />
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

  import { Card } from 'ant-design-vue';
  import { VxeTablePropTypes } from 'vxe-table';
  import { getBoxRecommendReport } from '/@/api/solomon/report';
  import { PageWrapper } from '/@/components/Page';
  import {
    BasicTableProps,
    VxeBasicTable,
    VxeGridInstance,
    VxeGridListeners,
  } from '/@/components/VxeTable';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { formatNumber } from '/@/utils/numberUtil';
  import BmsChart from '/@/views/solomon/report/box-recommend/components/BoxRecommendChart.vue';

  import { boxRecomendColumns, boxRecomendSummaryColumns } from './meta.data';

  const { t } = useI18n();

  //외부에서 입력하는 옵션은 ID로만 사용한다.
  const props = defineProps({
    id: { type: String },
  });

  /*********************************
   * Tab 처리 구역
   * ******************************* */

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

  const key = ref('result'); //default tab설정
  /**
   * 탭이 선택될때 키도 따라 변하여야 화면이 같이 변환 됨
   * @param value tabed key
   */
  const onTabChange = (value: string) => {
    key.value = value;
  };

  /*********************************
   * Grid 처리 구역
   * ******************************* */
  /**
   * 그리드  Reactive 변수 정의
   */
  const gridRef = ref<VxeGridInstance>();
  const detailGridRef = ref<VxeGridInstance>();

  /**
   * Column 모델 정의
   */
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

  /**
   * Detail grid 세부 옵션
   */
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

  /**
   * 화면 Loading전 데이터 조회 시 화면에 표현(Spinner)하는 부분의 변수
   * */
  const loadingRef = ref(false);
  /**
   * Grid Query결과를 전역으로 공유할 변수
   */
  const queryResult = ref();

  /**
   * Grid에서 데이터 수신 후 가공하여 ChartData에 데이터 공유하여 2번 연산 및 IO가 없게 처리
   */
  const chartData = ref();
  /**
   * Master grid 세부 옵션
   */
  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    tableStyle: { paddingTop: 0 },
    keepSource: true,
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
      tools: [
        { code: 'masterExport', name: t('solomon.button.download_result') },
        // { code: 'detailExport', name: '세부정보 다운로드' },
      ],
      enabled: true,
      import: false,
      export: false,
      print: false,
      zoom: false,
      refresh: false,
      custom: false,
    },
    height: 'auto',
    /**
     * 데이터를 서버에서 수신하도록 처리
     */
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
    footerCellStyle: { textAlign: 'right' },
    /**
     * Footer에 대한 Summary처리를 위한 함수 
     * @param param{
     *    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
          $grid: VxeGridConstructor<D> | null | undefined
          columns: VxeTableDefines.ColumnInfo<D>[]
          data: D[]
        }
     */
    footerMethod({ columns, data }) {
      const footer = columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return t('solomon.title.summary');
        }
        if (column.field.includes('asis_empty_vol_ratio')) {
          return (
            formatNumber({
              num: (sumNum(data, 'asis_empty_vol') / sumNum(data, 'asis_box_vol')) * 100,
              decimals: 0,
            }) + '%'
          );
        } else if (column.field.includes('tobe_empty_vol_ratio')) {
          return (
            formatNumber({
              num: (sumNum(data, 'tobe_empty_vol') / sumNum(data, 'tobe_box_vol')) * 100,
              decimals: 0,
            }) + '%'
          );
        } else if (column.field.includes('diff_empty_vol_ratio')) {
          return (
            formatNumber({
              num:
                (sumNum(data, 'tobe_empty_vol') / sumNum(data, 'tobe_box_vol')) * 100 -
                (sumNum(data, 'asis_empty_vol') / sumNum(data, 'asis_box_vol')) * 100,
              decimals: 0,
            }) + '%'
          );
        } else if (
          column.field.includes('qty') ||
          column.field.includes('amount') ||
          column.field.includes('vol')
        ) {
          return formatNumber({ num: sumNum(data, column.field), decimals: 0 });
        } else if (column.cellType == 'number') {
          return formatNumber({ num: meanNum(data, column.field), decimals: 0 });
        } else return '';
      });
      return [footer];
    },
  });

  /**
   * 평균치 계산
   * @param list 데이터 리스트
   * @param field 평균 계산 대상의 필드
   */
  const meanNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return Math.round(count / list.length);
  };

  /**
   * 합계 계산
   * @param list 데이터 리스트
   * @param field 합계 계산 대상의 필드
   */
  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return count;
  };

  /**
   * 그리드 이밴트 속성 정의
   * !주의 : VxeBasicTable의 Ref를 받아낼 경우 instance에 exportData가 없음
   */
  const gridEvents: VxeGridListeners<RowVO> = {
    toolbarToolClick(params) {
      const { $grid, code } = params;
      const $detailGrid = detailGridRef.value;
      if ($grid) {
        switch (code) {
          case 'masterExport': {
            $grid?.exportData({
              filename: 'BoxRecommand',
              sheetName: 'BoxRecommand',
              remote: false,
              type: 'xlsx',
              mode: 'all',
              message: false,
              isHeader: true,
              isFooter: true,
              isMerge: true,
              isColgroup: true,
            });
            $detailGrid?.exportData({
              filename: 'BoxRecommandDetail',
              sheetName: 'BoxRecommandDetail',
              remote: false,
              type: 'xlsx',
              mode: 'all',
              message: false,
              isHeader: true,
              isFooter: true,
              isMerge: true,
              isColgroup: true,
            });
            break;
          }
        }
      }
    },
  };

  /**
   * 병합처리 필요 대한에 대한 필드 병합 처리
   */
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
