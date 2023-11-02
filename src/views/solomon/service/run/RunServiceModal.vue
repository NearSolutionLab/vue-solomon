<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { OutboundAnalysisFormSchema, OutboundCapaAnalysisFormSchema } from './meta.data';
  import { FormSchema } from '/@/components/Table';

  export default defineComponent({
    name: 'RunServiceModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const title = ref('');
      const [registerForm, { resetSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const SERVICE_FORM_SCHEMA_MAP: { [service: string]: FormSchema[] } = {
        'services.outbound.capa_analysis': OutboundCapaAnalysisFormSchema,
        'service.outbound.out_bound_analysis': OutboundAnalysisFormSchema,
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        console.log(data);
        title.value = data.serviceName || '';
        resetSchema(SERVICE_FORM_SCHEMA_MAP[data.serviceNameKey]);
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeModal();
          emit('success', {});
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit, title };
    },
  });
</script>
