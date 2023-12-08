<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="`데이터셋 수정`"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"
  /></BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { updateDataSet } from '/@/api/solomon/data';

  const emit = defineEmits(['success', 'register']);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'id',
        required: false,
        component: 'Input',
        show: false,
      },
      {
        field: 'name',
        label: '명칭',
        required: false,
        component: 'Input',
      },
    ],
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });

    setFieldsValue({
      ...data,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      const { id, name } = values;
      await updateDataSet({
        id,
        name,
      });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
