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
  import { formatNumber, stringToNumber } from '/@/utils/numberUtil';

  const userStore = useUserStore();
  const { prefixCls } = useDesign('usage-table');
  const [usageTable, { setTableData }] = useTable({
    dataSource: [],
    columns: [
      {
        title: '서비스명',
        width: 160,
        dataIndex: 'serviceName',
      },
      {
        title: '데이터 저장 건수',
        width: 130,
        dataIndex: 'dataSaved',
      },
      {
        title: '데이터 사용 건수',
        width: 130,
        dataIndex: 'dataUsage',
      },
      {
        title: '단가(원)',
        width: 100,
        dataIndex: 'amount',
      },
      {
        title: '과금액(원)',
        width: 140,
        dataIndex: 'price',
      },
    ],
    pagination: false,
    showIndexColumn: false,
    scroll: { y: 300 },
    showSummary: true,
    summaryFunc: handleSummary,
  });

  function handleSummary(tableData: any[]) {
    let totalDataSaved = 0;
    let totalDataUsage = 0;
    let totalAmount = 0;
    let totalPrice = 0;
    tableData.forEach((item) => {
      totalDataSaved += stringToNumber(item.dataSaved);
      totalDataUsage += stringToNumber(item.dataUsage);
      totalAmount += stringToNumber(item.amount);
      totalPrice += stringToNumber(item.price);
    });
    return [
      {
        serviceName: '계',
        dataSaved: formatNumber({ num: totalDataSaved }),
        dataUsage: formatNumber({ num: totalDataUsage }),
        amount: formatNumber({ num: totalAmount, decimals: 2 }),
        price: formatNumber({ num: totalPrice, decimals: 2 }),
      },
    ];
  }

  onMounted(async () => {
    const customerId = userStore.getCurrentUserCredentials.user.customer.id;
    const { result } = await getCustomerUsage(customerId);
    const usageItems = (result.currentUsage || []).map((item) => {
      return {
        dataSaved: formatNumber({
          num: item.serviceNameKey === 'data-saving' ? item.dataUsage : 0,
        }),
        dataUsage: formatNumber({
          num: item.serviceNameKey === 'data-saving' ? 0 : item.dataUsage,
        }),
        amount: formatNumber({
          num: item.amount,
          decimals: 2,
        }),
        price: formatNumber({
          num: item.price,
          decimals: 2,
        }),
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
