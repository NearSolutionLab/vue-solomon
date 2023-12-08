<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      :title="$t('solomon.title.dataset')"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="true"
      :treeData="treeData"
      :fieldNames="{ key: 'key', title: 'title' }"
      @select="handleSelect"
      :renderIcon="createIcon"
      :beforeRightClick="handleRightClickMenu"
    />
    <DataTreeDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getDataSetList, deleteDataSet } from '/@/api/solomon/data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import DataTreeDrawer from './DataTreeDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';

  export default defineComponent({
    name: 'DataTree',
    components: { BasicTree, DataTreeDrawer },
    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeData = ref<TreeItem[]>([]);
      const { createConfirm } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      async function fetch() {
        const params = {
          sort: JSON.stringify([{ field: 'created_at', ascending: false }, { field: 'dataType' }]),
        };
        const { items } = await getDataSetList(params);

        const dataTypes = items.reduce((acc, curr) => {
          const exists = acc.find((i) => i.key === curr.dataType);
          if (exists) {
            return acc;
          }
          return [
            ...acc,
            {
              key: curr.dataType,
              title: t(`solomon.data.${curr.dataType}`),
              children: [],
            },
          ];
        }, []);

        const result: any[] = [];
        for (let i = 0; i < dataTypes.length; i++) {
          result.push({
            key: dataTypes[i].key,
            title: dataTypes[i].title,
            children: (() => {
              const children: any[] = [];
              for (let j = 0; j < items.length; j++) {
                if (dataTypes[i].key === items[j].dataType) {
                  children.push({
                    key: items[j].id,
                    title: items[j].name + ` (${items[j].sendType})`,
                    isLeaf: true,
                    dataType: items[j].dataType,
                    name: items[j].name,
                  });
                }
              }
              return children;
            })(),
          });
        }

        treeData.value = result as unknown as TreeItem[];
      }

      function handleSelect(keys, { selectedNodes }) {
        emit('select', {
          id: keys[0],
          dataType: selectedNodes[0].dataType,
          isLeaf: selectedNodes[0].isLeaf,
        });
      }

      async function handleRightClickMenu(node) {
        if (!node.isLeaf || !node.key) return;
        const editItem = {
          label: '수정',
          icon: 'ion:settings-outline',
          handler: () => {
            openDrawer(true, {
              id: node.key,
              name: node.name,
            });
          },
        };
        const deleteItem = {
          label: '삭제',
          icon: 'ion:trash-outline',
          handler: () => {
            createConfirm({
              iconType: 'warning',
              title: '삭제',
              content: '삭제하시겠습니까?',
              onOk: async () => {
                const result = await deleteDataSet(node.key);
                if (result) fetch();
              },
            });
          },
        };

        return [editItem, deleteItem];
      }

      onMounted(async () => {
        fetch();
      });

      function createIcon({ isLeaf }: any): any {
        if (isLeaf) {
          return 'ion:document-outline';
        }
        return '';
      }

      function handleSuccess() {
        fetch();
      }

      return {
        treeData,
        handleSelect,
        createIcon,
        handleRightClickMenu,
        registerDrawer,
        handleSuccess,
      };
    },
  });
</script>
