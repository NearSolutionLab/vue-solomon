<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <OutBoundAnalysisHeader :headerData="headerData" />
    </template>
    <BasicForm @register="formRegister" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getOutBoundAnalysisReport } from '/@/api/solomon/report';
  import OutBoundAnalysisHeader from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisHeader.vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useDesign } from '/@/hooks/web/useDesign';

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  // const formRef = ref();

  const { prefixCls } = useDesign('out-bound-analysis');
  const [
    formRegister,
    {
      // validate, setProps, getFieldsValue,
      resetSchema,
    },
  ] = useForm({
    labelWidth: 120,
    submitButtonOptions: {
      text: '조회',
    },
    showAdvancedButton: true,
    compact: true,
    submitFunc: async () => {},
  });

  onMounted(async () => {
    loadingRef.value = true;
    const {
      storageMethodList,
      monthlyAnalysis,
      // , quarterAnalysis, ratioAnalysis, weeklyAnalysis
    } = await getOutBoundAnalysisReport(props.id);
    headerData.value = monthlyAnalysis;
    const formSchema = storageMethodList.reduce(
      (acc, curr) => {
        if (curr.storage_method === 'all' || curr.storage_method === '') {
          return acc;
        }
        return [
          ...acc,
          {
            value: curr.storage_method,
            label: curr.storage_method,
          },
        ];
      },
      [{ value: 'all', label: '전체' }],
    );
    resetSchema([
      {
        field: 'storageMethod',
        defaultValue: 'all',
        component: 'Select',
        label: '저장 방식',
        colProps: { span: 8 },
        componentProps: {
          options: formSchema,
        },
      },
    ]);
    loadingRef.value = false;
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-out-bound-analysis';

  .@{prefix-cls} {
    max-width: 100%;
    height: 100%;

    .ant-form {
      width: 100%;
      margin-bottom: 16px;
      padding: 12px 10px 6px;
      border-radius: 2px;
      background-color: @component-background;
    }
  }
</style>
