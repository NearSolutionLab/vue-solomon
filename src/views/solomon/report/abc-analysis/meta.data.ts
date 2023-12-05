import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('solomon.title.sku_no'),
    dataIndex: 'skuNo',
    width: 90,
  },
  {
    title: t('solomon.title.outbound_days'),
    dataIndex: 'dayCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.order_count'),
    dataIndex: 'orderCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.outbound_quantity'),
    dataIndex: 'eaCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.ratio'),
    dataIndex: 'prop',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 4 });
    },
  },
  {
    title: t('solomon.title.cumulative_ratio'),
    dataIndex: 'propSum',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: t('solomon.title.abc'),
    dataIndex: 'averageGrade',
    width: 100,
  },
  {
    title: t('solomon.title.average_daily_outbound_quantity'),
    dataIndex: 'avgCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];
