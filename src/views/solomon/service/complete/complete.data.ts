import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: t('solomon.title.title'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('solomon.title.service_name'),
    dataIndex: 'serviceName',
    width: 100,
  },
  {
    title: t('solomon.title.data_size'),
    dataIndex: 'dataSize',
    width: 100,
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: t('solomon.title.created_at'),
    dataIndex: 'createdAt',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchKey',
    label: t('solomon.label.service_name_description_date'),
    component: 'Input',
    colProps: { span: 8 },
  },
];
