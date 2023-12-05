<template>
  <PageWrapper>
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.organization.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.organization.description') }}</span>
      </div>
    </template>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
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
    <MemberDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './meta.data';
  import { getMembers, deleteMember } from '/@/api/solomon/organization';
  import { useDrawer } from '/@/components/Drawer';
  import MemberDrawer from './MemberDrawer.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: t('solomon.title.member_list'),
    api: getMemberList,
    columns,
    useSearchForm: false,
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

  async function getMemberList(params) {
    const requestParams = {
      page: params.page,
      limit: params.pageSize,
    };
    const { items, total = 0 } = await getMembers(requestParams);
    return {
      items,
      total,
    };
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
    });
  }

  async function handleDelete(record: Recordable) {
    await deleteMember(record.id);
    reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
