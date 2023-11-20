<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    :width="750"
    :minHeight="500"
  >
    <div class="text-xl text-center font-bold mb-2" :subtitle="subtitle">{{ subtitle }}</div>
    <BasicForm @register="registerForm" />
    <div>
      <p>서비스 이미지</p>
      <div class="serviceImg"><img src="../../../assets/images/logo.png" /></div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { serviceDetailFormSchema } from './subscription.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'ServiceDetailModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const title = ref('');
      const subtitle = ref('');
      const serviceNameKey = ref('');
      const dataId = ref('');
      const serviceId = ref('');
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
        actionColOptions: { span: 23 },
        schemas: serviceDetailFormSchema,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        title.value = '상세보기';
        subtitle.value = data.serviceName || '';
        serviceNameKey.value = data.serviceNameKey || '';
        dataId.value = data.dataListId || '';
        serviceId.value = data.id || '';
        setFieldsValue({
          serviceDescription: t(`solomon.${serviceNameKey.value}.description`),
          serviceEffect: t(`solomon.${serviceNameKey.value}.effect`),
        });
      });

      async function handleSubmit() {
        try {
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit, title, subtitle };
    },
  });
</script>
<style lang="less" scoped>
  .serviceImg {
    display: flex;
    justify-content: center;
    border: 1px solid rgb(216 216 26);
  }
</style>
