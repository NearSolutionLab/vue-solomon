<template>
  <PageWrapper>
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.subscription.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.subscription.description') }}</span>
      </div>
    </template>
    <BasicTable @register="registerTable" :pageSize="20">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'fluent-mdl2:report-document',
                onClick: showDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ServiceDetailModal @register="registerServiceDetailModal" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './subscription.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import ServiceDetailModal from './ServiceDetailModal.vue';
  import { getServiceSelectionList } from '/@/api/solomon/service';

  const { t } = useI18n();
  const [registerServiceDetailModal, { openModal: openServiceDetailModal }] = useModal();
  const [registerTable] = useTable({
    title: '전체 서비스',
    api: getSubscriptionService,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '상세보기',
      dataIndex: 'action',
    },
  });

  async function getSubscriptionService() {
    const result = await getServiceSelectionList();
    const items = result.map((item) => ({
      ...item,
      description: t(`solomon.${item.serviceNameKey}.desc`),
    }));
    return items;
  }

  const showDetail = (record) => {
    openServiceDetailModal(true, record);
  };
</script>
