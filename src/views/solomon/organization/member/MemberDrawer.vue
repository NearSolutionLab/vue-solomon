<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="`사용자 정보 변경`"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"
  /></BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './meta.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { updateMember } from '/@/api/solomon/organization';

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });

    setFieldsValue({
      ...data.record,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      const { email, name, phoneNo, position } = values;
      await updateMember(email, {
        id: email,
        ...(name ? { name } : {}),
        ...(phoneNo ? { phoneNo } : {}),
        ...(position ? { position } : {}),
      });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
