import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';

export const usageTableColumns: BasicColumn[] = [
  {
    title: '서비스명',
    width: 160,
    dataIndex: 'serviceName',
  },
  {
    title: '데이터 저장 건수',
    width: 130,
    dataIndex: 'dataSaved',
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '데이터 사용 건수',
    width: 130,
    dataIndex: 'dataUsage',
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '단가(원)',
    width: 100,
    dataIndex: 'amount',
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: '과금액(원)',
    width: 140,
    dataIndex: 'price',
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];
