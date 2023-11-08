import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';

export const columns: BasicColumn[] = [
  {
    title: 'SKU 번호',
    dataIndex: 'skuNo',
    width: 90,
  },
  {
    title: '출고일수',
    dataIndex: 'dayCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '주문 건수',
    dataIndex: 'orderCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '출고수량',
    dataIndex: 'eaCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '비율',
    dataIndex: 'prop',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 4 });
    },
  },
  {
    title: '누적 비율',
    dataIndex: 'propSum',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: 'ABC',
    dataIndex: 'averageGrade',
    width: 100,
  },
  {
    title: '일평균 출고수량',
    dataIndex: 'avgCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];
