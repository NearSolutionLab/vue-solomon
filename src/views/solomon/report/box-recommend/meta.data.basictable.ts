import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

/**
 * expand table
 */
export const boxRecomandSummaryColumns: BasicColumn[] = [
  {
    title: t('solomon.title.outbound_date'),
    dataIndex: 'job_dt',
    fixed: 'left',
    width: 100,
  },
  {
    title: 'AS-IS',
    sorter: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        dataIndex: 'asis_box_qty',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        dataIndex: 'asis_amount',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        dataIndex: 'asis_empty_vol',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        dataIndex: 'asis_empty_vol_ratio',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
    ],
  },
  {
    title: 'TO-BE',
    sorter: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        dataIndex: 'tobe_box_qty',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        dataIndex: 'tobe_amount',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        dataIndex: 'tobe_empty_vol',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        dataIndex: 'tobe_empty_vol_ratio',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
    ],
  },
  {
    title: t('solomon.title.differential'),
    sorter: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        dataIndex: 'diff_qty',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        dataIndex: 'diff_amount',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        dataIndex: 'diff_empty_vol',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        dataIndex: 'diff_empty_vol_ratio',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
    ],
  },
];

/**
 * inner table
 */
export const boxRecomandColumns: BasicColumn[] = [
  {
    title: '',
    fixed: 'left',
  },
  {
    title: t('solomon.title.outbound_date'),
    dataIndex: 'job_dt',
    fixed: 'left',
    flag: 'INDEX',
    width: 100,
  },
  {
    title: t('solomon.title.box_type'),
    dataIndex: 'box_type',
    fixed: 'left',
    width: 100,
  },
  {
    title: t('solomon.title.box_price'),
    dataIndex: 'price',
    width: 100,
    fixed: 'left',
    customRender: ({ text }) => {
      return formatNumber({ num: text, decimals: 2 });
    },
  },
  {
    title: 'AS-IS',
    sorter: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        dataIndex: 'asis_box_qty',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        dataIndex: 'asis_amount',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        dataIndex: 'asis_empty_vol',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        dataIndex: 'asis_empty_vol_ratio',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
    ],
  },
  {
    title: 'TO-BE',
    sorter: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        dataIndex: 'tobe_box_qty',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        dataIndex: 'tobe_amount',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        dataIndex: 'tobe_empty_vol',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        dataIndex: 'tobe_empty_vol_ratio',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
    ],
  },
  {
    title: t('solomon.title.differential'),
    sorter: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        dataIndex: 'diff_qty',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        dataIndex: 'diff_amount',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        dataIndex: 'diff_empty_vol',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        dataIndex: 'diff_empty_vol_ratio',
        width: 100,
        customRender: ({ text }) => {
          return formatNumber({ num: text, decimals: 0 });
        },
      },
    ],
  },
];
