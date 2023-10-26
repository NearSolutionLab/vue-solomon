<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'fluent-mdl2:report-document',
                onClick: handleReport.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '삭제하시겠습니까?',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getServiceList } from '/@/api/solomon/service';
  import { columns, searchFormSchema } from './complete.data';
  import { useRouter } from 'vue-router';

  const SERVICE_REPORT_MAP: { [service: string]: string } = {
    'services.outbound.capa_analysis': 'CapaAnalysisPage',
    // 'service.outbound.out_bound_analysis': '',
  };

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction },
    setup() {
      const router = useRouter();
      const [registerTable, { reload }] = useTable({
        title: '진행완료',
        api: getCompleteServices,
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
        actionColumn: {
          width: 50,
          title: '',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      async function getCompleteServices(params) {
        const requestParams = {
          // statuses: 'END,ERROR',
          statuses: 'END',
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

      function handleReport(record: Recordable) {
        if (SERVICE_REPORT_MAP[record.service.serviceNameKey]) {
          router.push({
            name: SERVICE_REPORT_MAP[record.service.serviceNameKey],
            params: {
              id: record.id,
            },
          });
        }
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleReport,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
