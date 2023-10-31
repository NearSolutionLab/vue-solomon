import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';

export const columns: BasicColumn[] = [
  {
    title: '일자',
    dataIndex: 'date',
    width: 90,
  },
  {
    title: '총 주문 수(주문)',
    dataIndex: 'orderCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '총 SKU 수(종류)',
    dataIndex: 'skuCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '수량(PCS)',
    dataIndex: 'pcs',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
];
