<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="`팀원초대`"
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
  import { inviteMember } from '/@/api/solomon/organization';

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
      const { emailId, name } = values;
      await inviteMember(emailId, {
        emailId,
        name,
        authType: 'INVITE',
      });
      resetFields();
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
