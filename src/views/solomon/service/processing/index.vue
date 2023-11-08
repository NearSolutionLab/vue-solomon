<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getServiceList } from '/@/api/solomon/service';
  import { columns, searchFormSchema } from './processing.data';

  export default defineComponent({
    name: 'RunningServices',
    components: { BasicTable },
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
        const { items } = await getServiceList(requestParams);
        return (items || []).map((item) => ({
          ...item,
          serviceName: item.service?.serviceName,
          dataSize: item.dataSize || 0,
        }));
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
      };
    },
  });
</script>
