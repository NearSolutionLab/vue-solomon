<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DataTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DataTree from './DataTree.vue';
  import { getOptimizeServiceList } from '/@/api/solomon/service';

  async function handleSelect({ id, dataType, isLeaf }) {
    console.log(id);
    if (isLeaf) {
      const params = {
        query: JSON.stringify([
          { name: 'feasible_data_types', operator: 'eq', value: dataType, relation: false },
        ]),
      };
      const result = await getOptimizeServiceList(params);
      console.log(result);
    }

    // reload();
  }
</script>
