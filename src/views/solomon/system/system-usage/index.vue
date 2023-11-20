<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <SystemUsageHeader :headerData="headerData" />
    </template>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useUserStore } from '/@/store/modules/user';
  import { getCustomerUsage } from '/@/api/solomon/home';
  import SystemUsageHeader from '/@/views/solomon/system/system-usage/components/SystemUsageHeader.vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const userStore = useUserStore();
  const loadingRef = ref(false);
  const headerData = ref();

  const { prefixCls } = useDesign('system-usage');

  onMounted(async () => {
    loadingRef.value = true;
    console.log(userStore.getUserInfo);
    const { currentUsage, customer, customerUsage, monthlyUsage } = await getCustomerUsage(
      userStore.getUserInfo.customerId,
    );
    console.log(currentUsage, customer, customerUsage, monthlyUsage);

    updateReportData({
      currentUsage,
      customer,
      customerUsage,
      monthlyUsage,
    });
    loadingRef.value = false;
  });

  function updateReportData({ currentUsage, customer, customerUsage, monthlyUsage }) {
    headerData.value = {
      currentUsage,
      customer,
      customerUsage,
    };
    console.log(monthlyUsage);
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-system-usage';

  .@{prefix-cls} {
    max-width: 100%;
    height: 100%;

    .ant-form {
      width: 100%;
      margin-bottom: 16px;
      padding: 12px 10px 6px;
      border-radius: 2px;
      background-color: @component-background;
    }
  }
</style>
