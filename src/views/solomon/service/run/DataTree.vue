<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="데이터셋"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="true"
      :treeData="treeData"
      :fieldNames="{ key: 'key', title: 'title' }"
      @select="handleSelect"
      :renderIcon="createIcon"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getDataSetList } from '/@/api/solomon/data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'DataTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeData = ref<TreeItem[]>([]);

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
        emit('select', {
          id: keys[0],
          dataType: selectedNodes[0].dataType,
          isLeaf: selectedNodes[0].isLeaf,
        });
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

      return { treeData, handleSelect, createIcon };
    },
  });
</script>
