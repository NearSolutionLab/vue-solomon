import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '명칭',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '서비스명',
    dataIndex: 'serviceName',
    width: 100,
  },
  {
    title: '데이터크기',
    dataIndex: 'dataSize',
    width: 100,
  },
  {
    title: '생성일시',
    dataIndex: 'createdAt',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchKey',
    label: '명칭/서비스명/날짜',
    component: 'Input',
    colProps: { span: 8 },
  },
];
