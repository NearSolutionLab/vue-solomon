<template>
  <PageWrapper>
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.organization.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.organization.description') }}</span>
      </div>
    </template>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('solomon.button.invite_team_member') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:close-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.confirmCancel'),
                  placement: 'left',
                  confirm: handleCancel.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <InviteDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './meta.data';
  import { getInvites, deleteInvite } from '/@/api/solomon/organization';
  import { useDrawer } from '/@/components/Drawer';
  import InviteDrawer from './InviteDrawer.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: t('solomon.title.invite_status'),
    api: getInviteList,
    columns,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 50,
      title: t('solomon.title.cancel'),
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  async function getInviteList(params) {
    const requestParams = {
      page: params.page,
      limit: params.pageSize,
    };
    const { items, total = 0 } = await getInvites(requestParams);
    return {
      items,
      total,
    };
  }

  async function handleCancel(record: Recordable) {
    await deleteInvite(record.emailId);
    reload();
  }

  async function handleCreate() {
    openDrawer(true);
  }

  function handleSuccess() {
    reload();
  }
</script>
