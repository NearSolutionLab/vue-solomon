<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <template #headerContent>
      <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
        <h1 class="md:text-lg text-md">{{ t('solomon.category.data.name') }}</h1>
        <span class="text-secondary">{{ t('solomon.category.data.description') }}</span>
      </div>
    </template>
    <DataTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 p-4 xl:w-4/5">
      <!-- <template #bodyCell="{ column }"> </template> -->
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DataTree from '../service/run/DataTree.vue';
  import {
    getOutBoundData,
    getInBoundData,
    getInventoryData,
    getOrderData,
  } from '/@/api/solomon/data';
  import { BasicTable, useTable } from '/@/components/Table';
  import { inboundColumns, outboundColumns, inventoryColumns, orderColumns } from './meta.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  // import { useModal } from '/@/components/Modal';
  // import RunServiceModal from './RunServiceModal.vue';
  // import { useMessage } from '/@/hooks/web/useMessage';

  const { t } = useI18n();
  // const { notification } = useMessage();
  // const [registerRunServiceModal, { openModal: openRunServiceModal }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    title: t('solomon.title.retrieved_data'),
    rowKey: 'id',
    api: getDetailData,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
  });
  let selectedData = { dataId: null, dataType: null };

  async function handleSelect({ id, dataType, isLeaf }) {
    if (isLeaf) {
      selectedData.dataId = id;
      selectedData.dataType = dataType;
      console.log('leaf', id, dataType);
      reload();
    }
  }

  async function getDetailData(params) {
    const filterCols: { name: string; operator: string; value: any; relation: boolean }[] = [];
    const { page, pageSize } = params;
    if (selectedData.dataId) {
      filterCols.push({
        name: 'dataId',
        operator: 'eq',
        value: selectedData.dataId,
        relation: false,
      });

      let requestParams = {
        sort: JSON.stringify([{ field: 'date', ascending: false }, { field: 'rowIndex' }]),
        query: JSON.stringify(filterCols),
        page: params.page,
        limit: params.pageSize,
      };

      delete params.page;
      delete params.pageSize;
      Object.keys(params).forEach((key) => {
        if (params[key]) requestParams[key] = params[key];
      });

      if (selectedData.dataType === 'OUTBOUND') {
        setProps({
          columns: outboundColumns,
        });
        console.log('param', requestParams);
        const { total, items } = await getOutBoundData(requestParams);
        console.log('outobund', items);
        return {
          items: (items || []).map((item) => ({
            id: item.id,
            date: item.date,
            orderNo: item.orderNo,
            skuNo: item.skuNo,
            skuName: item.skuName,
            eaCount: item.eaCount,
            storageMethod: item.storageMethod,
            category1: item.category1,
            category2: item.category2,
            category3: item.category3,
            category4: item.category4,
          })),
          total: total,
        };
      } else if (selectedData.dataType === 'INBOUND') {
        setProps({
          columns: inboundColumns,
        });
        const { total, items } = await getInBoundData(requestParams);
        return {
          items: (items || []).map((item) => ({
            id: item.id,
            date: item.date,
            client: item.client,
            skuNo: item.skuNo,
            skuName: item.skuName,
            eaCount: item.eaCount,
            storageMethod: item.storageMethod,
            category1: item.category1,
            category2: item.category2,
            category3: item.category3,
            category4: item.category4,
          })),
          total: total,
        };
      } else if (selectedData.dataType === 'INVENTORY') {
        setProps({
          columns: inventoryColumns,
        });
        const { total, items } = await getInventoryData(requestParams);
        return {
          items: (items || []).map((item) => ({
            id: item.id,
            date: item.date,
            whCode: item.whCode,
            locCode: item.locCode,
            skuNo: item.skuNo,
            skuName: item.skuName,
            eaCount: item.eaCount,
            locType: item.locType,
            invType: item.invType,
            category: item.category,
            lotNo: item.lotNo,
            expireDate: item.expireDate,
            brand: item.brand,
          })),
          total: total,
        };
      } else if (selectedData.dataType === 'ORDER') {
        setProps({
          columns: orderColumns,
        });
        const { total = 0, items = [] } = await getOrderData({
          sort: JSON.stringify([{ field: 'jobDt', ascending: false }]),
          query: JSON.stringify([
            {
              name: 'dataId',
              operator: 'eq',
              value: selectedData.dataId,
              relation: false,
            },
          ]),
          page: page,
          limit: pageSize,
        });
        return {
          items,
          total,
        };
      }
    }
  }
</script>
