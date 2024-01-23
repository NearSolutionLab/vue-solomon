<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getDataSetList } from '/@/api/solomon/data';
  import { columns, searchFormSchema } from './processing.data';

  export default defineComponent({
    name: 'RunningDataPages',
    components: { BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '진행중 업로드',
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
          status: 'UPLOADING,PROCESSING,ERROR,END',
          page: params.page,
          limit: params.pageSize,
        };
        delete params.page;
        delete params.pageSize;
        Object.keys(params).forEach((key) => {
          if (params[key]) requestParams[key] = params[key];
        });
        const { items, total = 0 } = await getDataSetList(requestParams);
        console.log(items);
        return {
          items: (items || []).map((item) => ({
            ...item,
            dataType: item.dataType,
            dataSize: item.size || 0,
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
      };
    },
  });
</script>
