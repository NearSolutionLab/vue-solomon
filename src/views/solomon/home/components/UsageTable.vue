<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__top`">
      <div>실시간 요금 현황</div>
    </div>
    <div :class="`${prefixCls}__content`">
      <BasicTable @register="usageTable" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';
  import { getCustomerUsage } from '/@/api/solomon/home';
  import { usageTableColumns } from '../meta.data';

  const userStore = useUserStore();
  const { prefixCls } = useDesign('usage-table');
  const [usageTable, { setTableData }] = useTable({
    dataSource: [],
    columns: usageTableColumns,
    pagination: false,
    showIndexColumn: false,
    scroll: { y: 300 },
    showSummary: true,
    summaryFunc: handleSummary,
  });

  function handleSummary(tableData: any[]) {
    let totalDataSaved = 0;
    let totalDataUsage = 0;
    let totalPrice = 0;
    tableData.forEach((item) => {
      totalDataSaved += item.dataSaved;
      totalDataUsage += item.dataUsage;
      totalPrice += item.price;
    });
    return [
      {
        serviceName: '계',
        dataSaved: totalDataSaved,
        dataUsage: totalDataUsage,
        amount: '',
        price: totalPrice,
      },
    ];
  }

  onMounted(async () => {
    const customerId = userStore.getCurrentUserCredentials.user.customer.id;
    const { result } = await getCustomerUsage(customerId);
    const usageItems = (result.currentUsage || []).map((item) => {
      return {
        dataSaved: item.serviceNameKey === 'data-saving' ? item.dataUsage : 0,
        dataUsage: item.serviceNameKey === 'data-saving' ? 0 : item.dataUsage,
        amount: item.amount,
        price: item.price,
        serviceName: item.serviceName,
      };
    });

    setTableData(usageItems);
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-usage-table';

  .@{prefix-cls} {
    padding: 12px;
    background-color: @component-background;

    &__top {
      div {
        margin-bottom: 12px;
        color: @text-color;
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        text-align: left;
      }
    }
  }
</style>
