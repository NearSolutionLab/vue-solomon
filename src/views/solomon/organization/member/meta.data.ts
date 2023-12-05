import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: t('solomon.title.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('solomon.title.position'),
    dataIndex: 'position',
    width: 100,
  },
  {
    title: t('solomon.title.email'),
    dataIndex: 'email',
    width: 100,
  },
  {
    title: t('solomon.title.phone_number'),
    dataIndex: 'phoneNo',
    width: 100,
  },
  {
    title: t('solomon.title.created_at'),
    dataIndex: 'createdAt',
    width: 100,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'email',
    label: t('solomon.label.email'),
    required: false,
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'phoneNo',
    label: t('solomon.label.phone_number'),
    required: false,
    component: 'Input',
  },
  {
    field: 'name',
    label: t('solomon.label.name'),
    required: false,
    component: 'Input',
  },
  {
    field: 'position',
    label: t('solomon.label.position'),
    required: false,
    component: 'Input',
  },
];
