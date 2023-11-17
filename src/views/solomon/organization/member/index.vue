<template>
  <div>
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
    <MemberDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './meta.data';
  import { getMembers, deleteMember } from '/@/api/solomon/organization';
  import { useDrawer } from '/@/components/Drawer';
  import MemberDrawer from './MemberDrawer.vue';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '팀원목록',
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
