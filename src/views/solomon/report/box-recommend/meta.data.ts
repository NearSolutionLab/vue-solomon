import { VxeGridPropTypes } from '/@/components/VxeTable';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

/**
 * expand table
 */
export const boxRecomendSummaryColumns: VxeGridPropTypes.Columns = [
  {
    type: 'expand',
    slots: { content: 'expand_content', default: 'expand_col' },
    align: 'center',
    title: t('solomon.title.outbound_date'),
    field: 'job_dt',
    fixed: 'left',
    width: 130,
  },
  {
    title: 'AS-IS',
    align: 'center',
    sortable: false,
    children: [
      {
        title: t('solomon.title.box_qty'),
        align: 'right',
        field: 'asis_box_qty',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        align: 'right',
        field: 'asis_amount',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        align: 'right',
        field: 'asis_empty_vol',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        align: 'right',
        field: 'asis_empty_vol_ratio',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 }) + '%';
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
        align: 'right',
        field: 'tobe_box_qty',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        align: 'right',
        field: 'tobe_amount',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        align: 'right',
        field: 'tobe_empty_vol',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        align: 'right',
        field: 'tobe_empty_vol_ratio',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 }) + '%';
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
        align: 'right',
        field: 'diff_qty',
        minWidth: '6%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.box_amount'),
        align: 'right',
        field: 'diff_amount',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume'),
        align: 'right',
        field: 'diff_empty_vol',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          return formatNumber({ num: cellValue, decimals: 0 });
        },
      },
      {
        title: t('solomon.title.empty_volume_ratio'),
        type: 'html',
        align: 'right',
        field: 'diff_empty_vol_ratio',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          const value = formatNumber({ num: Math.abs(cellValue), decimals: 0 });
          if (cellValue > 0) {
            return `<span style="display:flex; justify-content:end; ">${value}%<div class="up"></div></span>`;
          } else if (cellValue < 0) {
            return `<span style="display:flex; justify-content:end; ">${value}%<div class="down"></div></span>`;
          } else {
            return `<span style="display:flex; justify-content:end; ">${value}%<div class="normal"></div></span>`;
          }
        },
      },
    ],
  },
];

/**
 * inner table
 */
export const boxRecomendColumns: VxeGridPropTypes.Columns = [
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
          return formatNumber({ num: cellValue, decimals: 0 }) + '%';
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
          return formatNumber({ num: cellValue, decimals: 0 }) + '%';
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
        type: 'html',
        field: 'diff_empty_vol_ratio',
        minWidth: '7%',
        cellType: 'number',
        formatter: ({ cellValue }) => {
          const value = formatNumber({ num: Math.abs(cellValue), decimals: 0 });
          if (cellValue > 0) {
            return `<span style="display:flex; justify-content:end; ">${value}<div class="up"></div></span>`;
          } else if (cellValue < 0) {
            return `<span style="display:flex; justify-content:end; ">${value}<div class="down"></div></span>`;
          } else {
            return `<span style="display:flex; justify-content:end; ">${value}<div class="normal"></div></span>`;
          }
        },
      },
    ],
  },
];
