import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const inboundColumns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: t('solomon.title.date'),
    dataIndex: 'date',
    width: 160,
  },
  {
    title: t('solomon.title.customer'),
    dataIndex: 'client',
    ellipsis: false,
    width: 180,
  },
  {
    title: t('solomon.title.sku_no'),
    dataIndex: 'skuNo',
    ellipsis: false,
    width: 180,
  },
  {
    title: t('solomon.title.sku_name'),
    dataIndex: 'skuName',
    ellipsis: false,
    width: 250,
  },
  {
    title: t('solomon.title.quantity'),
    dataIndex: 'eaCount',
    width: 100,
  },
  {
    title: t('solomon.title.storage_method'),
    dataIndex: 'storageMethod',
    width: 120,
  },
  {
    title: t('solomon.title.category1'),
    dataIndex: 'category1',
    width: 120,
  },
  {
    title: t('solomon.title.category2'),
    dataIndex: 'category2',
    width: 120,
  },
  {
    title: t('solomon.title.category3'),
    dataIndex: 'category3',
    width: 120,
  },
  {
    title: t('solomon.title.category4'),
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
    title: t('solomon.title.date'),
    dataIndex: 'date',
    width: 160,
    ellipsis: false,
  },
  {
    title: t('solomon.title.order_no'),
    dataIndex: 'orderNo',
    width: 160,
    ellipsis: false,
  },
  {
    title: t('solomon.title.sku_no'),
    dataIndex: 'skuNo',
    width: 160,
    ellipsis: false,
  },
  {
    title: t('solomon.title.sku_name'),
    dataIndex: 'skuName',
    width: 230,
    ellipsis: false,
  },
  {
    title: t('solomon.title.quantity'),
    dataIndex: 'eaCount',
    width: 100,
  },
  {
    title: t('solomon.title.storage_method'),
    dataIndex: 'storageMethod',
    width: 120,
  },
  {
    title: t('solomon.title.category1'),
    dataIndex: 'category1',
    width: 120,
  },
  {
    title: t('solomon.title.category2'),
    dataIndex: 'category2',
    width: 120,
  },
  {
    title: t('solomon.title.category3'),
    dataIndex: 'category3',
    width: 120,
  },
  {
    title: t('solomon.title.category4'),
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
    title: t('solomon.title.date'),
    dataIndex: 'date',
    width: 160,
    ellipsis: false,
  },
  {
    title: t('solomon.title.storage_code'),
    dataIndex: 'whCode',
    width: 100,
  },
  {
    title: t('solomon.title.location_code'),
    dataIndex: 'locCode',
    width: 120,
  },
  {
    title: t('solomon.title.sku_no'),
    dataIndex: 'skuNo',
    width: 160,
    ellipsis: false,
  },
  {
    title: t('solomon.title.sku_name'),
    dataIndex: 'skuName',
    width: 250,
    ellipsis: false,
  },
  {
    title: t('solomon.title.quantity'),
    dataIndex: 'eaCount',
    width: 100,
  },
  {
    title: t('solomon.title.location_type'),
    dataIndex: 'locType',
    width: 120,
  },
  {
    title: t('solomon.title.inventory_type'),
    dataIndex: 'invType',
    width: 120,
  },
  {
    title: t('solomon.title.category'),
    dataIndex: 'category',
    width: 120,
  },
  {
    title: t('solomon.title.lot_no'),
    dataIndex: 'lotNo',
    width: 120,
  },
  {
    title: t('solomon.title.expire_date'),
    dataIndex: 'expireDate',
    width: 120,
  },
  {
    title: t('solomon.title.brand'),
    dataIndex: 'brand',
    width: 120,
  },
];

export const orderColumns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: t('solomon.title.date'),
    dataIndex: 'jobDt',
    width: 160,
    ellipsis: false,
  },
  {
    title: '주문번호',
    dataIndex: 'orderNo',
    width: 160,
  },
  {
    title: '주문수량',
    dataIndex: 'orderQty',
    width: 100,
  },
  {
    title: '상품번호',
    dataIndex: 'skuCd',
    width: 160,
    ellipsis: false,
  },
  {
    title: '가로(mm)',
    dataIndex: 'width',
    width: 100,
  },
  {
    title: '세로(mm)',
    dataIndex: 'depth',
    width: 100,
  },
  {
    title: '높이(mm)',
    dataIndex: 'height',
    width: 100,
  },
  {
    title: '박스번호',
    dataIndex: 'boxId',
    width: 150,
  },
  {
    title: '박스타입',
    dataIndex: 'boxType',
    width: 100,
  },
];

export const inboundForm: FormSchema[] = [
  {
    label: t('solomon.title.date'),
    field: 'date',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.customer'),
    field: 'client',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.sku_no'),
    field: 'skuNo',

    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.sku_name'),
    field: 'skuName',

    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.quantity'),
    field: 'eaCount',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.storage_method'),
    field: 'storageMethod',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category1'),
    field: 'category1',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category2'),
    field: 'category2',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category3'),
    field: 'category3',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category4'),
    field: 'category4',
    component: 'Select',
    componentProps: { options: [] },
  },
];

export const outboundForm: FormSchema[] = [
  {
    label: t('solomon.title.date'),
    field: 'date',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.order_no'),
    field: 'orderNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.sku_no'),
    field: 'skuNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.sku_name'),
    field: 'skuName',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.quantity'),
    field: 'eaCount',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.storage_method'),
    field: 'storageMethod',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category1'),
    field: 'category1',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category2'),
    field: 'category2',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category3'),
    field: 'category3',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category4'),
    field: 'category4',
    component: 'Select',
    componentProps: { options: [] },
  },
];

export const inventoryForm: FormSchema[] = [
  {
    label: t('solomon.title.date'),
    field: 'date',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.storage_code'),
    field: 'whCode',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.location_code'),
    field: 'locCode',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.sku_no'),
    field: 'skuNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.sku_name'),
    field: 'skuName',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.quantity'),
    field: 'eaCount',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.location_type'),
    field: 'locType',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.inventory_type'),
    field: 'invType',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.category'),
    field: 'category',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.lot_no'),
    field: 'lotNo',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.expire_date'),
    field: 'expireDate',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: t('solomon.title.brand'),
    field: 'brand',
    component: 'Select',
    componentProps: { options: [] },
  },
];

export const orderForm: FormSchema[] = [
  {
    label: t('solomon.title.date'),
    field: 'jobDt',
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
    label: '주문수량',
    field: 'orderQty',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '상품번호',
    field: 'skuCd',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '가로(mm)',
    field: 'width',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '세로(mm)',
    field: 'depth',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '높이(mm)',
    field: 'height',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '박스번호',
    field: 'boxId',
    component: 'Select',
    componentProps: { options: [] },
  },
  {
    label: '박스타입',
    field: 'boxType',
    component: 'Select',
    componentProps: { options: [] },
  },
];
