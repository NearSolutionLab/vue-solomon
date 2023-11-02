import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { subscribeService, unsubscribeService } from '/@/api/solomon/subscription';

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '서비스명',
    dataIndex: 'serviceName',
    width: 100,
  },
  {
    title: '설명',
    dataIndex: 'description',
    width: 300,
  },
  {
    title: '구독',
    dataIndex: 'subscribed',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: !!record.subscribed,
        checkedChildren: '활성',
        unCheckedChildren: '비활성',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newSubscribed = checked ? true : false;
          const { createMessage } = useMessage();
          console.log(record);
          if (checked) {
            subscribeService({
              serviceId: record.id,
              priceType: 'measured',
              subscriptionMonths: 0,
              endedAtTime: 0,
            })
              .then((resolve) => {
                const { result } = resolve;
                record.subscriptionId = result.id;
                record.subscribed = newSubscribed;
                createMessage.success(`성공`);
              })
              .catch(() => {
                createMessage.error(`에러`);
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          } else {
            unsubscribeService(record.subscriptionId)
              .then((resolve) => {
                console.log(resolve);
                record.subscribed = newSubscribed;
                createMessage.success(`성공`);
              })
              .catch(() => {
                createMessage.error(`에러`);
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          }
        },
      });
    },
  },
];

// 주문 패턴 분석 서비스
export const OutboundCapaAnalysisFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '제목',
    component: 'Input',
    helpMessage: ['제목을 입력하세요'],
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
  {
    field: '[startDate, endDate]',
    label: '날짜',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['시작날짜', '종료날짜'],
    },
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
  {
    field: 'orders',
    label: '기준 주문 수',
    component: 'InputNumber',
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
];

export const OutboundAnalysisFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '제목',
    component: 'Input',
    helpMessage: ['제목을 입력하세요'],
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
  {
    field: '[startDate, endDate]',
    label: '날짜',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['시작날짜', '종료날짜'],
    },
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
];

export const OutboundShippingBatchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '제목',
    component: 'Input',
    helpMessage: ['제목을 입력하세요'],
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
  {
    field: 'orders',
    label: '기준 주문 수',
    component: 'InputNumber',
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
  {
    field: 'count',
    label: '추출 횟수',
    component: 'InputNumber',
    rules: [
      {
        required: true,
        message: '필수항목 입니다',
      },
    ],
  },
];
