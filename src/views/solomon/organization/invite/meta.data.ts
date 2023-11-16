import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '이름',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '이메일',
    dataIndex: 'emailId',
    width: 100,
  },
  {
    title: '초대 만료일시',
    dataIndex: 'expirationDate',
    width: 100,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'emailId',
    label: '이메일',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '이름',
    required: true,
    component: 'Input',
  },
];
