<template>
  <div>
    <BasicTable @register="registerTable" :columns="columns">
      <template #toolbar>
        <a-button @click="downloadExcel">{{ t('solomon.button.download_excel') }}</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns as trekstaColumns, searchFormSchema } from './trekstaForecast.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { jsonToSheetXlsx } from '/@/components/Excel/src/Export2Excel';
  import trekstaData from './treksta-data.json';

  const { t } = useI18n();

  export default defineComponent({
    name: 'TrekstaForecast',
    components: { BasicTable },
    setup() {
      const [registerTable, { getDataSource }] = useTable({
        title: t('solomon.title.treksta_forecast'),
        api: getTrekstaForecast,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
      });

      const columns = ref(trekstaColumns);

      async function getTrekstaForecast(params) {
        // Default sort
        let result = trekstaData
          .sort((a, b) => {
            if (b.date > a.date) {
              return -1;
            } else {
              return 1;
            }
          })
          .sort((a, b) => {
            if (b.item_id > a.item_id) {
              return -1;
            } else {
              return 1;
            }
          });
        // Filter
        if (Object.keys(params).length > 0) {
          const filters = [
            { key: 'item_id', type: 'includes' },
            { key: 'l_class_cd', type: 'includes' },
            { key: 'm_class_cd', type: 'includes' },
            { key: 's_class_cd', type: 'includes' },
            { key: 'goods_nm', type: 'includes' },
            { key: 'season_cd', type: 'strict' },
            { key: 'gender', type: 'strict' },
          ];

          result = result.filter((data) => {
            return filters.every((filter) => {
              const { key, type } = filter;
              if (params[key]) {
                if (type === 'includes') {
                  return data[key]?.includes(params[key]);
                } else if (type === 'strict') {
                  return data[key] === params[key];
                }
              }
              return true;
            });
          });
        }
        if (params.startDate && params.endDate) {
          const startDate = new Date(params.startDate);
          const endDate = new Date(params.endDate);
          const formattedStartDate = startDate.toISOString().split('T')[0];
          const formattedEndDate = endDate.toISOString().split('T')[0];

          result = result.filter((data) => {
            const date = new Date(data.date);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate >= formattedStartDate && formattedDate <= formattedEndDate;
          });
        }
        // Click Sort
        if (params.field && params.order) {
          const ascend = params.order === 'ascend';
          result.sort((a, b) => {
            if (params.field === 'p90') {
              return ascend ? a[params.field] - b[params.field] : b[params.field] - a[params.field];
            } else {
              if (a[params.field] < b[params.field]) {
                return ascend ? -1 : 1;
              }
              if (a[params.field] > b[params.field]) {
                return ascend ? 1 : -1;
              }
            }
            return 0;
          });
        }
        return {
          total: result.length,
          items: result,
        };
      }

      const downloadExcel = () => {
        jsonToExcel();
      };

      const jsonToExcel = () => {
        const header = trekstaColumns.reduce((acc, column: any) => {
          return {
            ...acc,
            [column.dataIndex]: column.title,
          };
        }, {});
        const data = getDataSource().map((d) => {
          const obj = {};
          Object.keys(header).forEach((key) => {
            obj[key] = d[key] ?? '';
          });
          return obj;
        });
        jsonToSheetXlsx({
          data,
          header,
          filename: `${t('solomon.title.treksta_forecast')}.xlsx`,
        });
      };

      return {
        registerTable,
        downloadExcel,
        columns,
        t,
      };
    },
  });
</script>
