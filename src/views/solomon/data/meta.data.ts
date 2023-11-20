import { BasicColumn, FormSchema } from '/@/components/Table';

export const inboundColumns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '날짜',
    dataIndex: 'date',
    width: 160,
  },
  {
    title: '고객',
    dataIndex: 'orderNo',
    ellipsis: false,
    width: 180,
  },
  {
    title: 'SKU번호',
    dataIndex: 'skuNo',
    ellipsis: false,
    width: 180,
  },
  {
    title: 'SKU이름',
    dataIndex: 'skuName',
    ellipsis: false,
    width: 250,
  },
  {
    title: '수량',
    dataIndex: 'eaCount',
    width: 100,
  },
  {
    title: '저장방식',
    dataIndex: 'storageMethod',
    width: 120,
  },
  {
    title: '카테고리1',
    dataIndex: 'category1',
    width: 120,
  },
  {
    title: '카테고리2',
    dataIndex: 'category2',
    width: 120,
  },
  {
    title: '카테고리3',
    dataIndex: 'category3',
    width: 120,
  },
  {
    title: '카테고리4',
    dataIndex: 'category4',
    width: 120,
  },
];

export const outboundColumns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '날짜',
    dataIndex: 'date',
    width: 160,
    ellipsis: false,
  },
  {
    title: '주문번호',
    dataIndex: 'orderNo',
    width: 160,
    ellipsis: false,
  },
  {
    title: 'SKU번호',
    dataIndex: 'skuNo',
    width: 160,
    ellipsis: false,
  },
  {
    title: 'SKU이름',
    dataIndex: 'skuName',
    width: 230,
    ellipsis: false,
  },
  {
    title: '수량',
    dataIndex: 'eaCount',
    width: 100,
  },
  {
    title: '저장방식',
    dataIndex: 'storageMethod',
    width: 120,
  },
  {
    title: '카테고리1',
    dataIndex: 'category1',
    width: 120,
  },
  {
    title: '카테고리2',
    dataIndex: 'category2',
    width: 120,
  },
  {
    title: '카테고리3',
    dataIndex: 'category3',
    width: 120,
  },
  {
    title: '카테고리4',
    dataIndex: 'category4',
    width: 120,
  },
];

export const inventoryColumns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '날짜',
    dataIndex: 'date',
    width: 160,
    ellipsis: false,
  },
  {
    title: '창고코드',
    dataIndex: 'whCode',
    width: 100,
  },
  {
    title: '로케이션코드',
    dataIndex: 'locCode',
    width: 120,
  },
  {
    title: 'SKU번호',
    dataIndex: 'skuNo',
    width: 160,
    ellipsis: false,
  },
  {
    title: 'SKU이름',
    dataIndex: 'skuName',
    width: 250,
    ellipsis: false,
  },
  {
    title: '수량',
    dataIndex: 'eaCount',
    width: 100,
  },
  {
    title: '로케이션타입',
    dataIndex: 'locType',
    width: 120,
  },
  {
    title: '재고타입',
    dataIndex: 'invType',
    width: 120,
  },
  {
    title: '카테고리',
    dataIndex: 'category',
    width: 120,
  },
  {
    title: '로트번호',
    dataIndex: 'lotNo',
    width: 120,
  },
  {
    title: '유통기한',
    dataIndex: 'expireDate',
    width: 120,
  },
  {
    title: '브랜드',
    dataIndex: 'brand',
    width: 120,
  },
];

const colProps = {
  span: 8,
};

export const outboundTestColumns: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    colProps,
  },
  {
    label: '날짜',
    field: 'date',

    component: 'Input',
    colProps,
  },
  {
    label: '고객',
    field: 'orderNo',

    component: 'Input',
    colProps,
  },
  {
    label: 'SKU번호',
    field: 'skuNo',

    component: 'Input',
    colProps,
  },
  {
    label: 'SKU이름',
    field: 'skuName',

    component: 'Input',
    colProps,
  },
  {
    label: '수량',
    field: 'eaCount',

    component: 'Input',
    colProps,
  },
  {
    label: '저장방식',
    field: 'storageMethod',

    component: 'Input',
    colProps,
  },
  {
    label: '카테고리1',
    field: 'category1',

    component: 'Input',
    colProps,
  },
  {
    label: '카테고리2',
    field: 'category2',

    component: 'Input',
    colProps,
  },
  {
    label: '카테고리3',
    field: 'category3',

    component: 'Input',
    colProps,
  },
  {
    label: '카테고리4',
    field: 'category4',

    component: 'Input',
    colProps,
  },
];
