<template>
  <BasicModal
    autoFocusFirstItem
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
    ABCOptimizationFormSchema,
    OutboundABCAnalysisFormSchema,
    InventoryAnalysisFormSchema,
    InboundAnalysisFormSchema,
    OrderBoxRecommendationFormSchema,
  } from './meta.data';
  import { FormSchema } from '/@/components/Table';
  import { formatToDate } from '/@/utils/dateUtil';
  import {
    analyzeOutboundVolume,
    analyzeOutboundOrderPattern,
    createOutboundShippingBatch,
    optimizeABC,
    analyzeOutboundABC,
    analyzeInventory,
    analyzeInboundVolume,
    boxRecommendation,
  } from '/@/api/solomon/service';

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
        'service.inventory.ABCOptimize': ABCOptimizationFormSchema, // ABC분석 서비스
        'services.outbound.abc_analysis': OutboundABCAnalysisFormSchema, // 출고 물동량 ABC분석
        'service.inventory.inventory_analysis': InventoryAnalysisFormSchema, // 재고 물동량 분석
        'service.inbound.in_bound_analysis': InboundAnalysisFormSchema, // 입고 물동량 분석
        'services.order.box_recommendation': OrderBoxRecommendationFormSchema, // 박스 추천 서비스
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
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
            result = await createOutboundShippingBatch(data);
          }
          // ABC분석 서비스
          else if (serviceNameKey.value === 'service.inventory.ABCOptimize') {
            result = await optimizeABC(data);
          }
          // 출고 물동량 ABC분석
          else if (serviceNameKey.value === 'services.outbound.abc_analysis') {
            result = await analyzeOutboundABC(data);
          }
          // 재고 물동량 분석
          else if (serviceNameKey.value === 'service.inventory.inventory_analysis') {
            result = await analyzeInventory(data);
          }
          // 입고 물동량 분석
          else if (serviceNameKey.value === 'service.inbound.in_bound_analysis') {
            result = await analyzeInboundVolume(data);
          }
          // 박스 추천 서비스
          else if (serviceNameKey.value === 'services.order.box_recommendation') {
            result = await boxRecommendation(data);
          }

          closeModal();
          emit('success', result);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function getServiceVariables(values: any) {
        // 주문 패턴 분석 서비스
        if (serviceNameKey.value === 'services.outbound.capa_analysis') {
          const [startDate, endDate] = values['[startDate, endDate]'];
          return {
            start_date: formatToDate(startDate),
            end_date: formatToDate(endDate),
            batch_list: values.orders,
          };
        }
        // 출고 물동량 분석
        if (serviceNameKey.value === 'service.outbound.out_bound_analysis') {
          // const [startDate, endDate] = values['[startDate, endDate]'];
          return {
            // start_date: formatToDate(startDate),
            // end_date: formatToDate(endDate),
          };
        }
        // DAS 출고 배치 생성
        if (serviceNameKey.value === 'services.outbound.shipping_batch') {
          const [startDate, endDate] = values['[startDate, endDate]'];
          return {
            start_date: formatToDate(startDate),
            end_date: formatToDate(endDate),
            batch_size: parseInt(values.orders),
            count: parseInt(values.count),
          };
        }
        // ABC분석 서비스
        if (serviceNameKey.value === 'service.inventory.ABCOptimize') {
          return {};
        }
        // 출고 물동량 ABC분석
        if (serviceNameKey.value === 'services.outbound.abc_analysis') {
          return {};
        }
        // 재고 물동량 분석
        if (serviceNameKey.value === 'service.inventory.inventory_analysis') {
          return {};
        }
        // 입고 물동량 분석
        if (serviceNameKey.value === 'service.inbound.in_bound_analysis') {
          // if (!values['[startDate, endDate]']) return {};
          // const [startDate, endDate] = values['[startDate, endDate]'];
          return {
            // start_date: formatToDate(startDate),
            // end_date: formatToDate(endDate),
          };
        }
        // 박스 추천 서비스
        if (serviceNameKey.value === 'services.order.box_recommendation') {
          return {
            boxType: values.boxType,
          };
        }
        return {};
      }

      return { registerModal, registerForm, handleSubmit, title };
    },
  });
</script>
