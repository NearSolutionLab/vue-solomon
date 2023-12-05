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
    width: 150,
  },
  {
    title: t('solomon.title.description'),
    dataIndex: 'description',
    width: 400,
  },
  {
    title: t('solomon.title.subscribed'),
    dataIndex: 'subscribed',
    width: 100,
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
  {
    title: t('solomon.title.service_count'),
    dataIndex: 'serviceCount',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'searchKey',
    label: t('solomon.label.service_name_description'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const serviceDetailFormSchema: FormSchema[] = [
  {
    field: 'serviceDescription',
    label: t('solomon.label.service_description'),
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'serviceEffect',
    label: t('solomon.label.service_effect'),
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
];
