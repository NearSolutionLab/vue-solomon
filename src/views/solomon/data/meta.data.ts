import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';

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

export const inboundForm: FormSchema[] = [
  {
    label: '날짜',
    field: 'date',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '고객',
    field: 'orderNo',

    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: 'SKU번호',
    field: 'skuNo',

    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: 'SKU이름',
    field: 'skuName',

    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '수량',
    field: 'eaCount',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '저장방식',
    field: 'storageMethod',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리1',
    field: 'category1',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리2',
    field: 'category2',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리3',
    field: 'category3',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리4',
    field: 'category4',
    component: 'Select',
    componentProps: { options: [] },
  },
];

export const outboundForm: FormSchema[] = [
  {
    label: '날짜',
    field: 'date',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '주문번호',
    field: 'orderNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: 'SKU번호',
    field: 'skuNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: 'SKU이름',
    field: 'skuName',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '수량',
    field: 'eaCount',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '저장방식',
    field: 'storageMethod',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리1',
    field: 'category1',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리2',
    field: 'category2',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리3',
    field: 'category3',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리4',
    field: 'category4',
    component: 'Select',
    componentProps: { options: [] },
  },
];

export const inventoryForm: FormSchema[] = [
  {
    label: '날짜',
    field: 'date',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '창고코드',
    field: 'whCode',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '로케이션코드',
    field: 'locCode',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: 'SKU번호',
    field: 'skuNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: 'SKU이름',
    field: 'skuName',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '수량',
    field: 'eaCount',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '로케이션타입',
    field: 'locType',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '재고타입',
    field: 'invType',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '카테고리',
    field: 'category',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '로트번호',
    field: 'lotNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '유통기한',
    field: 'expireDate',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '브랜드',
    field: 'brand',
    component: 'Select',
    componentProps: { options: [] },
  },
];
