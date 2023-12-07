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
  </div>
  <div><PopConfirmButton v-if="true" /></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, h } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getDataSetList } from '/@/api/solomon/data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PopConfirmButton } from '/@/components/Button';
  //import { Popconfirm } from 'ant-design-vue';

  export default defineComponent({
    name: 'DataTree',
    components: { BasicTree, PopConfirmButton },

    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeData = ref<TreeItem[]>([]);
      let editPopconfrimVisible = false;
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
        console.log('select', keys, selectedNodes);
        emit('select', {
          id: keys[0],
          dataType: selectedNodes[0].dataType,
          isLeaf: selectedNodes[0].isLeaf,
        });
      }

      async function handleRightClickMenu(node, evnet) {
        console.log(`Selected menu item:`, node);
        console.log(`Selected evnet: `, evnet);
        const editItem = {
          label: '수정',
          icon: 'ion:settings-outline',
          handler: () => {
            // 삭제 동작 수행

            return h(PopConfirmButton);
          },
        };
        const deleteItem = {
          label: '삭제',
          icon: 'ion:trash-outline',
          handler: () => {
            // 삭제 동작 수행
            console.log('삭제 동작 수행', node);
          },
        };

        return [editItem, deleteItem];
      }

      onMounted(async () => {
        fetch();
      });
      // function showEditPopconfirm(node) {
      //   editPopconfrimVisible = true;
      //   console.log('showEdit', editPopconfrimVisible);
      // }
      function createIcon({ isLeaf }: any): any {
        if (isLeaf) {
          return 'ion:document-outline';
        }
        return '';
      }

      return {
        treeData,
        handleSelect,
        createIcon,

        editPopconfrimVisible,
        handleRightClickMenu,
      };
    },
  });
</script>
