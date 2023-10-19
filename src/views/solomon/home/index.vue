<template>
  <PageWrapper>
    <div class="lg:flex">
      <div class="lg:w-4/10 w-full !mr-4 enter-y">
        <LatestDataList :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-6/10 w-full enter-y"> </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import LatestDataList from './components/LatestDataList.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
