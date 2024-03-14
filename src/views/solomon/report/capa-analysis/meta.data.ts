import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const performancePerOrdersColumns: BasicColumn[] = [
  {
    title: t('solomon.title.orders_per_batch'),
    dataIndex: 'orderCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.orders_per_one_sku'),
    dataIndex: 'orderCountPerSku',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: t('solomon.title.diffculty_decrease'),
    dataIndex: 'performanceRatio',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];

export const orderResultColumns: BasicColumn[] = [
  {
    title: t('solomon.title.day'),
    dataIndex: 'date',
    width: 90,
  },
  {
    title: t('solomon.title.group_batch_count'),
    dataIndex: 'groupCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.standard_order_count'),
    dataIndex: 'batchSize',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.total_order_count'),
    dataIndex: 'orderCount',
    width: 90,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.sku_per_batch_total'),
    dataIndex: 'skuCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.random_sku_count_per_batch_total'),
    dataIndex: 'randomSkuCount',
    width: 120,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.combination_count'),
    dataIndex: 'combinationCount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.ea'),
    dataIndex: 'eaSum',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.sku_diffculty_decrease'),
    dataIndex: 'performanceRatio',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
];
