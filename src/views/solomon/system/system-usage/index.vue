<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <SystemUsageHeader :headerData="headerData" />
    </template>
    <div class="flex flex-col">
      <div class="flex-none h-96 flex flex-row pb-4">
        <div class="flex-none w-1/2 pr-4 h-90">
          <UsageTable />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useUserStore } from '/@/store/modules/user';
  import { getCustomerUsage } from '/@/api/solomon/home';
  import SystemUsageHeader from '/@/views/solomon/system/system-usage/components/SystemUsageHeader.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import UsageTable from '/@/views/solomon/home/components/UsageTable.vue';

  const userStore = useUserStore();
  const loadingRef = ref(false);
  const headerData = ref();

  const { prefixCls } = useDesign('system-usage');

  onMounted(async () => {
    loadingRef.value = true;
    const customerId = userStore.getCurrentUserCredentials.user.customer.id;
    const { currentUsage, customer, customerUsage, monthlyUsage } =
      await getCustomerUsage(customerId);
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
