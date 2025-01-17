<template>
  <PageWrapper dense>
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.service.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.service.description') }}</span>
      </div>
    </template>
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
                  title: t('common.confirmDelete'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getServiceList,
    deleteOutboundOrderPattern,
    deleteOutboundVolume,
    deleteOutboundShippingBatch,
    deleteABCOptimization,
    deleteOutboundABC,
    deleteInventoryAnalysis,
    deleteInboundVolume,
  } from '/@/api/solomon/service';
  import { columns, searchFormSchema } from './complete.data';
  import { useRouter } from 'vue-router';
  import { SERVICE_REPORT_MAP } from '/@/views/solomon/serviceMapping';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const SERVICE_API_DEL_FUNCTION_MAP: { [service: string]: (requestId: string) => Promise<any> } = {
    'services.outbound.capa_analysis': (requestId) => deleteOutboundOrderPattern(requestId),
    'service.outbound.out_bound_analysis': (requestId) => deleteOutboundVolume(requestId),
    'services.outbound.shipping_batch': (requestId) => deleteOutboundShippingBatch(requestId),
    'service.inventory.ABCOptimize': (requestId) => deleteABCOptimization(requestId),
    'services.outbound.abc_analysis': (requestId) => deleteOutboundABC(requestId),
    'service.inventory.inventory_analysis': (requestId) => deleteInventoryAnalysis(requestId),
    'service.inbound.in_bound_analysis': (requestId) => deleteInboundVolume(requestId),
  };

  export default defineComponent({
    name: 'CompleteServices',
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const router = useRouter();
      const [registerTable, { reload }] = useTable({
        title: t('solomon.title.complete'),
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

      async function handleDelete(record: Recordable) {
        await SERVICE_API_DEL_FUNCTION_MAP[record.service.serviceNameKey](record.id);
        reload();
      }

      return {
        registerTable,
        handleReport,
        handleDelete,
        t,
      };
    },
  });
</script>
