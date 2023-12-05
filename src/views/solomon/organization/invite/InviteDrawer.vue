<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="$t('solomon.title.invite_team_member')"
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
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  const emit = defineEmits(['success', 'register']);
  const { t } = useI18n();
  const { createErrorModal } = useMessage();
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
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body,
      });
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
