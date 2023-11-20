import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';

export const columns: BasicColumn[] = [
  {
    title: '월',
    dataIndex: 'month',
    width: 100,
  },
  {
    title: '정산기준',
    dataIndex: 'basicCalc',
    width: 100,
  },
  {
    title: '월 과금액',
    dataIndex: 'amount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
];
