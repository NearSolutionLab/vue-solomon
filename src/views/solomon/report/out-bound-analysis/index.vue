<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <OutBoundAnalysisHeader :headerData="headerData" />
    </template>
    <BasicForm @register="formRegister" />
    <div class="flex flex-col">
      <div class="flex-none h-96 flex flex-row pb-4">
        <OutBoundAnalysisChart1 class="flex-none w-1/2 pr-4 h-92" :chartData="chartData1" />
        <OutBoundAnalysisChart2 class="flex-none w-1/2 h-92" :chartData="chartData2" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref } from 'vue';
  import { getOutBoundAnalysisReport } from '/@/api/solomon/report';
  import OutBoundAnalysisHeader from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisHeader.vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useDesign } from '/@/hooks/web/useDesign';
  import OutBoundAnalysisChart1 from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisChart1.vue';
  import OutBoundAnalysisChart2 from '/@/views/solomon/report/out-bound-analysis/components/OutBoundAnalysisChart2.vue';

  const props = defineProps({
    id: { type: String },
  });
  const loadingRef = ref(false);
  const headerData = ref();
  const chartData1 = ref();
  const chartData2 = ref();

  const { prefixCls } = useDesign('out-bound-analysis');
  const [formRegister, { validate, resetSchema }] = useForm({
    labelWidth: 120,
    submitButtonOptions: {
      text: '조회',
    },
    showAdvancedButton: true,
    compact: true,
    submitFunc: handleSubmit,
  });

  onMounted(async () => {
    loadingRef.value = true;
    const { storageMethodList, monthlyAnalysis, quarterAnalysis, ratioAnalysis, weeklyAnalysis } =
      await getOutBoundAnalysisReport(props.id);
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
    updateReportData({
      monthlyAnalysis,
      quarterAnalysis,
      ratioAnalysis,
      weeklyAnalysis,
    });
    loadingRef.value = false;
  });

  async function handleSubmit() {
    loadingRef.value = true;
    const { storageMethod } = await validate();
    const { monthlyAnalysis, quarterAnalysis, ratioAnalysis, weeklyAnalysis } =
      await getOutBoundAnalysisReport(props.id, storageMethod);

    updateReportData({
      monthlyAnalysis,
      quarterAnalysis,
      ratioAnalysis,
      weeklyAnalysis,
    });
    loadingRef.value = false;
  }

  function updateReportData({ monthlyAnalysis, quarterAnalysis, ratioAnalysis, weeklyAnalysis }) {
    headerData.value = monthlyAnalysis;
    chartData1.value = {
      monthlyAnalysis,
    };
    chartData2.value = {
      weeklyAnalysis,
    };
    console.log(quarterAnalysis);
    console.log(ratioAnalysis);
    console.log(weeklyAnalysis);
  }
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
