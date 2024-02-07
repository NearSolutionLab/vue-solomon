import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { subscribeService, unsubscribeService } from '/@/api/solomon/subscription';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: t('solomon.title.service_name'),
    dataIndex: 'serviceName',
    width: 100,
  },
  {
    title: t('solomon.title.description'),
    dataIndex: 'description',
    width: 300,
  },
  {
    title: t('solomon.title.subscribed'),
    dataIndex: 'subscribed',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: !!record.subscribed,
        checkedChildren: t('solomon.text.active'),
        unCheckedChildren: t('solomon.text.inactive'),
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
                createMessage.success(t('solomon.text.success'));
              })
              .catch(() => {
                createMessage.error(t('solomon.text.error'));
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          } else {
            unsubscribeService(record.subscriptionId)
              .then((resolve) => {
                console.log(resolve);
                record.subscribed = newSubscribed;
                createMessage.success(t('solomon.text.success'));
              })
              .catch(() => {
                createMessage.error(t('solomon.text.error'));
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
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: 'orders',
    label: t('solomon.label.standard_order_count'),
    component: 'Input',
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: '[startDate, endDate]',
    label: t('solomon.label.date'),
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: [t('solomon.text.start_date'), t('solomon.text.end_date')],
    },
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
];

// 출고 물동량 분석
export const OutboundAnalysisFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: '[startDate, endDate]',
    label: t('solomon.label.date'),
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: [t('solomon.text.start_date'), t('solomon.text.end_date')],
    },
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
];

// DAS 출고 배치 생성
export const OutboundShippingBatchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: 'orders',
    label: t('solomon.label.standard_order_count'),
    component: 'InputNumber',
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: 'count',
    label: t('solomon.label.extraction_frequency'),
    component: 'InputNumber',
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: '[startDate, endDate]',
    label: t('solomon.label.date'),
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: [t('solomon.text.start_date'), t('solomon.text.end_date')],
    },
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
];

// ABC분석 서비스
export const ABCOptimizationFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
];

// 출고 물동량 ABC분석
export const OutboundABCAnalysisFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
];

// 재고 물동량 분석
export const InventoryAnalysisFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
];

// 입고 물동량 분석
export const InboundAnalysisFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('solomon.label.title'),
    component: 'Input',
    helpMessage: [t('solomon.label.please_input_the_title')],
    rules: [
      {
        required: true,
        message: t('solomon.text.this_is_a_required_field'),
      },
    ],
  },
  {
    field: '[startDate, endDate]',
    label: t('solomon.label.date'),
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: [t('solomon.text.start_date'), t('solomon.text.end_date')],
    },
    rules: [
      {
        required: false,
      },
    ],
  },
];
