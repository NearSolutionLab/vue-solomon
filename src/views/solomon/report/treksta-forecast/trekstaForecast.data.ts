import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatNumberRound } from '/@/utils/numberUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('solomon.title.style_code'),
    dataIndex: 'item_id',
    width: 100,
    sorter: true,
  },
  {
    title: t('solomon.title.date'),
    dataIndex: 'date',
    width: 100,
    sorter: true,
    customRender: ({ text }) => {
      const formattedValue = formatToDate(text);
      return formattedValue.toString();
    },
  },
  {
    title: t('solomon.title.demand_forecast'),
    dataIndex: 'p90',
    width: 100,
    sorter: true,
    customRender: ({ text }) => {
      const formattedValue = formatNumberRound(text);
      return formattedValue.toString();
    },
    helpMessage: t(
      'solomon.text.the_probability_that_the_demand_will_occur_within_the_forecast_on_a_given_date_is_90_percent',
    ),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchKey',
    label: t('solomon.title.style_code'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: '[startDate, endDate]',
    label: t('solomon.label.date'),
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: [t('solomon.text.start_date'), t('solomon.text.end_date')],
    },
    colProps: { span: 8 },
  },
];
