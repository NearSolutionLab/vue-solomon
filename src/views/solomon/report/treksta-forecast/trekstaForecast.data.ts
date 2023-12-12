import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatNumberRound } from '/@/utils/numberUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('solomon.title.style_code'),
    dataIndex: 'item_id',
    width: 80,
    sorter: true,
  },
  {
    title: t('solomon.title.l_class_cd'),
    dataIndex: 'l_class_cd',
    width: 30,
    sorter: true,
  },
  {
    title: t('solomon.title.m_class_cd'),
    dataIndex: 'm_class_cd',
    width: 30,
    sorter: true,
  },
  {
    title: t('solomon.title.s_class_cd'),
    dataIndex: 's_class_cd',
    width: 30,
    sorter: true,
  },
  {
    title: t('solomon.title.goods_nm'),
    dataIndex: 'goods_nm',
    width: 100,
    sorter: true,
  },
  {
    title: t('solomon.title.season_cd'),
    dataIndex: 'season_cd',
    width: 30,
    sorter: true,
    customRender: ({ text }) => {
      let season = '';
      switch (text) {
        case '1':
          season = '봄';
          break;
        case '2':
          season = '여름';
          break;
        case '3':
          season = '가을';
          break;
        case '4':
          season = '겨울';
          break;
        default:
          season = '';
      }
      return season;
    },
  },
  {
    title: t('solomon.title.gender'),
    dataIndex: 'gender',
    width: 30,
    sorter: true,
    customRender: ({ text }) => {
      let gender = '';
      switch (text) {
        case '1':
          gender = '남성용';
          break;
        case '2':
          gender = '여성용';
          break;
        case '3':
          gender = '공용';
          break;
        default:
          gender = '';
      }
      return gender;
    },
  },
  {
    title: t('solomon.title.date'),
    dataIndex: 'date',
    width: 80,
    sorter: true,
    customRender: ({ text }) => {
      const formattedValue = formatToDate(text);
      return formattedValue.toString();
    },
  },
  {
    title: t('solomon.title.demand_forecast'),
    dataIndex: 'p90',
    width: 50,
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
    field: 'item_id',
    label: t('solomon.title.style_code'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'l_class_cd',
    label: t('solomon.title.l_class_cd'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'm_class_cd',
    label: t('solomon.title.m_class_cd'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 's_class_cd',
    label: t('solomon.title.s_class_cd'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'goods_nm',
    label: t('solomon.title.goods_nm'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'season_cd',
    label: t('solomon.title.season_cd'),
    component: 'Select',
    componentProps: {
      options: [
        { label: '봄', value: '1' },
        { label: '여름', value: '2' },
        { label: '가을', value: '3' },
        { label: '겨울', value: '4' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'gender',
    label: t('solomon.title.gender'),
    component: 'Select',
    componentProps: {
      options: [
        { label: '남성용', value: '1' },
        { label: '여성용', value: '2' },
        { label: '공용', value: '3' },
      ],
    },
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
