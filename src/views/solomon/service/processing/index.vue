<template>
  <PageWrapper dense>
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.service.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.service.description') }}</span>
      </div>
    </template>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getServiceList } from '/@/api/solomon/service';
  import { columns, searchFormSchema } from './processing.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  export default defineComponent({
    name: 'RunningServices',
    components: { BasicTable, PageWrapper },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '진행중 서비스',
        api: getProcessingServices,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
      });

      async function getProcessingServices(params) {
        const requestParams = {
          // statuses: 'START,VALIDATING,ANALYSING,SOLVING,REPORTING,FETCHING',
          statuses: 'START,VALIDATING,ANALYSING,SOLVING,REPORTING,FETCHING,ERROR',
          page: params.page,
          limit: params.pageSize,
        };
        delete params.page;
        delete params.pageSize;
        Object.keys(params).forEach((key) => {
          if (params[key]) requestParams[key] = params[key];
        });
        const { items, total = 0 } = await getServiceList(requestParams);
        return {
          items: (items || []).map((item) => ({
            ...item,
            serviceName: item.service?.serviceName,
            dataSize: item.dataSize || 0,
          })),
          total,
        };
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
        t,
      };
    },
  });
</script>
