import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatNumber } from '/@/utils/numberUtil';
import { Progress } from 'ant-design-vue';
import { h } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

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
    customRender: ({ text }) => {
      return formatNumber({ num: text });
    },
  },
  {
    title: '상태',
    dataIndex: 'status',
    width: 50,
    customRender: ({ text }) => {
      return text ? t(`solomon.optimizeResultStatus.${text}`) : '';
    },
  },
  {
    title: '진행률',
    dataIndex: 'progress',
    width: 100,
    customRender: ({ text, record }) => {
      const status =
        record.status === 'END' ? 'success' : record.status === 'ERROR' ? 'exception' : 'active';
      return h(Progress, { percent: Number(text), status });
    },
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
