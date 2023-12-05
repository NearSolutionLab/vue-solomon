<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.service.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.service.description') }}</span>
      </div>
    </template>
    <DataTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 p-4 xl:w-4/5">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'octicon:play-16',
                color: 'success',
                tooltip: t('solomon.title.action'),
                onClick: runService.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RunServiceModal @register="registerRunServiceModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DataTree from './DataTree.vue';
  import { getServiceSelectionList } from '/@/api/solomon/service';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './meta.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import RunServiceModal from './RunServiceModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { t } = useI18n();
  const { notification } = useMessage();
  const [registerRunServiceModal, { openModal: openRunServiceModal }] = useModal();
  const [registerTable, { setTableData, reload }] = useTable({
    title: t('solomon.title.select_service'),
    rowKey: 'id',
    columns,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    actionColumn: {
      width: 120,
      title: t('solomon.title.action'),
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  async function handleSelect({ id, dataType, isLeaf }) {
    if (isLeaf) {
      const result = await getServiceSelectionList();
      const items = result.filter(
        (res) => res.feasibleDataTypes === dataType && res.active === true,
      );

      setTableData(
        (items || []).map((item) => {
          return {
            id: item.id,
            serviceName: item.serviceName,
            description: t(`solomon.${item.serviceNameKey}.desc`),
            subscribed: item.subscribed,
            subscriptionId: item.subscriptionId,
            dataListId: id,
            serviceNameKey: item.serviceNameKey,
          };
        }),
      );
    }

    reload();
  }

  const runService = (record) => {
    openRunServiceModal(true, record);
  };

  const handleSuccess = (result) => {
    console.log(result);
    notification.success({
      message: t('solomon.text.service_execution_completed'),
      description: t('solomon.text.service_has_been_executed'),
      duration: 3,
    });
  };
</script>
