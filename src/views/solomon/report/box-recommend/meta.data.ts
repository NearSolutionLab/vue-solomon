import { VxeGridPropTypes } from '/@/components/VxeTable';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

/**
 * inner table
 */
export const boxRecomandColumns: VxeGridPropTypes.Columns = [
  {
    title: t('solomon.title.outbound_date'),
    align: 'center',
    field: 'job_dt',
    fixed: 'left',
    cellType: 'number',
    width: 120,
  },
  {
    title: t('solomon.title.box_type'),
    align: 'center',
    field: 'box_type',
    fixed: 'left',
    cellType: 'number',
    width: 130,
  },
  {
    title: t('solomon.title.box_price'),
    align: 'center',
    field: 'price',
    width: 100,
    fixed: 'left',
    cellType: 'number',
    formatter: ({ cellValue }) => {
      return formatNumber({ num: cellValue, decimals: 0 });
    },
  },
  {
    title: 'AS-IS',
    align: 'center',
    sortable: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        align: 'center',
        field: 'asis_box_qty',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        align: 'center',
        field: 'asis_amount',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        align: 'center',
        field: 'asis_empty_vol',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        align: 'center',
        field: 'asis_empty_vol_ratio',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 2 });
        },
      },
    ],
  },
  {
    title: 'TO-BE',
    align: 'center',
    sortable: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        align: 'center',
        field: 'tobe_box_qty',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        align: 'center',
        field: 'tobe_amount',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        align: 'center',
        field: 'tobe_empty_vol',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        align: 'center',
        field: 'tobe_empty_vol_ratio',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 2 });
        },
      },
    ],
  },
  {
    title: t('solomon.title.differential'),
    align: 'center',
    sortable: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        align: 'center',
        field: 'diff_qty',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        align: 'center',
        field: 'diff_amount',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        align: 'center',
        field: 'diff_empty_vol',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        align: 'center',
        field: 'diff_empty_vol_ratio',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 2 });
        },
      },
    ],
  },
];
