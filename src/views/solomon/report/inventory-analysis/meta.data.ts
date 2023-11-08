import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';

export const columns: BasicColumn[] = [
  {
    title: '일자',
    dataIndex: 'date',
    width: 90,
  },
  {
    title: '로케이션 수',
    dataIndex: 'locCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: 'SKU 수',
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
