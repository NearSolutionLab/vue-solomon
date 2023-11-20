<template>
  <PageWrapper v-loading="loadingRef" :class="prefixCls" contentClass="overflow-visible">
    <template #headerContent>
      <SystemUsageHeader :headerData="headerData" />
    </template>
    <div class="flex flex-col">
      <div class="flex-none flex flex-row pb-4">
        <div class="flex-none w-3/5 pr-4">
          <UsageTable />
        </div>
        <div class="flex-none w-2/5">
          <BasicTable @register="register" />
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
  import { BasicTable, useTable } from '/@/components/Table';
  import UsageTable from '/@/views/solomon/home/components/UsageTable.vue';
  import { columns } from './meta.data';

  const userStore = useUserStore();
  const loadingRef = ref(false);
  const headerData = ref();

  const { prefixCls } = useDesign('system-usage');

  const [register, { setTableData }] = useTable({
    title: '월별 과금 현황',
    columns,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    isCanResizeParent: true,
  });

  onMounted(async () => {
    loadingRef.value = true;
    const customerId = userStore.getCurrentUserCredentials.user.customer.id;
    const { currentUsage, customer, customerUsage, monthlyUsage } =
      await getCustomerUsage(customerId);

    updateReportData({
      currentUsage,
      customer,
      customerUsage,
      monthlyUsage,
    });
    loadingRef.value = false;
  });

  function updateReportData({ currentUsage, customer, customerUsage, monthlyUsage = [] }) {
    headerData.value = {
      currentUsage,
      customer,
      customerUsage,
    };

    const monthlyUsageData: any[] = monthlyUsage.map((item: any) => {
      return {
        month: item.month,
        basicCalc: '월간',
        amount: item.amount,
      };
    });
    // const monthlyUsageData = Array(10)
    //   .fill()
    //   .map((item, index) => {
    //     return {
    //       month: index + 1,
    //       basicCalc: '월간',
    //       amount: index * 1000,
    //     };
    //   });
    setTableData(monthlyUsageData);
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
