import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const usageTableColumns: BasicColumn[] = [
  {
    title: t('solomon.title.service_name'),
    width: 160,
    dataIndex: 'serviceName',
  },
  {
    title: t('solomon.title.number_of_data_storage'),
    width: 130,
    dataIndex: 'dataSaved',
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.number_of_data_usage'),
    width: 130,
    dataIndex: 'dataUsage',
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.amount'),
    width: 100,
    dataIndex: 'amount',
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: t('solomon.title.charge_price'),
    width: 140,
    dataIndex: 'price',
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];
