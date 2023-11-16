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
    title: '직급',
    dataIndex: 'position',
    width: 100,
  },
  {
    title: '이메일',
    dataIndex: 'email',
    width: 100,
  },
  {
    title: '연락처',
    dataIndex: 'phoneNo',
    width: 100,
  },
  {
    title: '생성일시',
    dataIndex: 'createdAt',
    width: 100,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'email',
    label: '이메일',
    required: false,
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'phoneNo',
    label: '연락처',
    required: false,
    component: 'Input',
  },
  {
    field: 'name',
    label: '이름',
    required: false,
    component: 'Input',
  },
  {
    field: 'position',
    label: '직급',
    required: false,
    component: 'Input',
  },
];
