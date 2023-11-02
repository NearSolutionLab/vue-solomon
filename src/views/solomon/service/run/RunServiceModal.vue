<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    @ok="handleSubmit"
    :width="700"
    :minHeight="500"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    OutboundAnalysisFormSchema,
    OutboundCapaAnalysisFormSchema,
    OutboundShippingBatchFormSchema,
  } from './meta.data';
  import { FormSchema } from '/@/components/Table';
  import { formatToDate } from '/@/utils/dateUtil';
  import { analyzeOutboundVolume, analyzeOutboundOrderPattern } from '/@/api/solomon/service';

  export default defineComponent({
    name: 'RunServiceModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const title = ref('');
      const serviceNameKey = ref('');
      const dataId = ref('');
      const serviceId = ref('');
      const [registerForm, { resetSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const SERVICE_FORM_SCHEMA_MAP: { [service: string]: FormSchema[] } = {
        'services.outbound.capa_analysis': OutboundCapaAnalysisFormSchema, // 주문 패턴 분석 서비스
        'service.outbound.out_bound_analysis': OutboundAnalysisFormSchema, // 출고 물동량 분석
        'services.outbound.shipping_batch': OutboundShippingBatchFormSchema, // DAS 출고 배치 생성
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        console.log(data);
        title.value = data.serviceName || '';
        serviceNameKey.value = data.serviceNameKey || '';
        dataId.value = data.dataListId || '';
        serviceId.value = data.id || '';
        if (SERVICE_FORM_SCHEMA_MAP[data.serviceNameKey]) {
          resetSchema(SERVICE_FORM_SCHEMA_MAP[data.serviceNameKey]);
        }
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          const variables = getServiceVariables(values);
          const data = {
            dataIdList: [unref(dataId)],
            name: values.name,
            serviceId: unref(serviceId),
            serviceKey: unref(serviceNameKey),
            variables,
          };

          let result = {};
          // 주문 패턴 분석 서비스
          if (serviceNameKey.value === 'services.outbound.capa_analysis') {
            result = await analyzeOutboundOrderPattern(data);
          }
          // 출고 물동량 분석
          else if (serviceNameKey.value === 'service.outbound.out_bound_analysis') {
            result = await analyzeOutboundVolume(data);
          }
          // DAS 출고 배치 생성
          else if (serviceNameKey.value === 'services.outbound.shipping_batch') {
          }

          closeModal();
          emit('success', result);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function getServiceVariables(values: any) {
        if (serviceNameKey.value === 'services.outbound.capa_analysis') {
          const [startDate, endDate] = values['[startDate, endDate]'];
          return {
            start_date: formatToDate(startDate),
            end_date: formatToDate(endDate),
            batch_list: parseInt(values.orders),
          };
        }
        if (serviceNameKey.value === 'service.outbound.out_bound_analysis') {
          const [startDate, endDate] = values['[startDate, endDate]'];
          return {
            start_date: formatToDate(startDate),
            end_date: formatToDate(endDate),
          };
        }
      }

      return { registerModal, registerForm, handleSubmit, title };
    },
  });
</script>
