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
    title: t('solomon.title.email'),
    dataIndex: 'emailId',
    width: 100,
  },
  {
    title: t('solomon.title.invitation_expiration_date_time'),
    dataIndex: 'expirationDate',
    width: 100,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'emailId',
    label: t('solomon.label.email'),
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: t('solomon.label.name'),
    required: true,
    component: 'Input',
  },
];
