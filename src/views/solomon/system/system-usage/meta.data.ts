import { BasicColumn } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('solomon.title.month'),
    dataIndex: 'month',
    width: 100,
  },
  {
    title: t('solomon.title.settlement_criteria'),
    dataIndex: 'basicCalc',
    width: 100,
  },
  {
    title: t('solomon.title.monthly_billing_amount'),
    dataIndex: 'amount',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
];
