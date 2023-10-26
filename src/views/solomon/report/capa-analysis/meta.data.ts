import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';

export const performancePerOrdersColumns: BasicColumn[] = [
  {
    title: '주문 수(배치당)',
    dataIndex: 'orderCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '1SKU당 처리 주문 수',
    dataIndex: 'orderCountPerSku',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: '효율 증가율(%)',
    dataIndex: 'performanceRatio',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];

export const orderResultColumns: BasicColumn[] = [
  {
    title: '일자',
    dataIndex: 'date',
    width: 90,
  },
  {
    title: '그룹 배치 수',
    dataIndex: 'groupCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '기준 주문 수',
    dataIndex: 'batchSize',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '총 주문 수',
    dataIndex: 'orderCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '배치당 SKU 수 합',
    dataIndex: 'skuCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '배치당 random SKU 수 합',
    dataIndex: 'randomSkuCount',
    width: 120,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '조합 수',
    dataIndex: 'combinationCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: 'EA',
    dataIndex: 'eaSum',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: 'SKU 효율 증가',
    dataIndex: 'performanceRatio',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];
