import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('solomon.title.day'),
    dataIndex: 'date',
    width: 90,
  },
  {
    title: t('solomon.title.total_order_count_order'),
    dataIndex: 'orderCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.total_sku_count'),
    dataIndex: 'skuCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.pcs'),
    dataIndex: 'pcs',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
];
