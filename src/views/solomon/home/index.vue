<template>
  <PageWrapper>
    <div class="lg:flex">
      <div class="lg:w-5/10 w-full !mr-4 enter-y">
        <LatestDataList class="!my-4 enter-y" />
      </div>
      <div class="lg:w-5/10 w-full enter-y">
        <UsageTable class="!my-4 enter-y" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import LatestDataList from './components/LatestDataList.vue';
  import UsageTable from './components/UsageTable.vue';
</script>
