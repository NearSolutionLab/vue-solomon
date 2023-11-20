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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchKey',
    label: '서비스명/설명',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const serviceDetailFormSchema: FormSchema[] = [
  {
    field: 'serviceDescription',
    label: '서비스 설명',
    component: 'InputTextArea',
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'serviceEffect',
    label: '서비스 주요 효과',
    component: 'InputTextArea',
    componentProps: {
      readonly: true,
    },
  },
];
