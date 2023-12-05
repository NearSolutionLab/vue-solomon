<template>
  <div class="lg:flex">
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">{{ t('solomon.title.abc_analysis_report') }}</h1>
      <span class="text-secondary">{{ t('solomon.text.document_name') }} {{ getTitle }} </span>
    </div>
    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary">{{ t('solomon.text.a_class_items_sku_count') }}</span>
        <span class="text-2xl">{{ getInfo.ASkuCount }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary">{{ t('solomon.text.a_class_items_pcs_count') }}</span>
        <span class="text-2xl">{{ getInfo.APcs }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-16 mr-12">
        <span class="text-secondary">{{ t('solomon.text.a_class_items_ratio') }}</span>
        <span class="text-2xl">{{ getInfo.AProp }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-16 mr-12">
        <span class="text-secondary">{{ t('solomon.text.bc_class_items_sku_count') }}</span>
        <span class="text-2xl">{{ getInfo.BCSkuCount }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-16 mr-12">
        <span class="text-secondary">{{ t('solomon.text.bc_class_items_pcs_count') }}</span>
        <span class="text-2xl">{{ getInfo.BCPcs }}</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary">{{ t('solomon.text.bc_class_items_ratio') }}</span>
        <span class="text-2xl">{{ getInfo.BCProp }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatNumber } from '/@/utils/numberUtil';
  import { computed, PropType } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  type HeaderItem = {
    grade: string;
    sku: number;
    order_count: number;
    pcs: number;
    prop: number;
  };

  type HeaderData = {
    title: string;
    abcHighlight: [HeaderItem, HeaderItem];
  };

  const props = defineProps({
    headerData: {
      type: Object as PropType<HeaderData>,
      default: () => ({
        title: '',
        abcHighlight: [
          { grade: '', sku: 0, order_count: 0, pcs: 0, prop: 0 },
          { grade: '', sku: 0, order_count: 0, pcs: 0, prop: 0 },
        ],
      }),
    },
  });

  const getTitle = computed(() => {
    return props.headerData?.title || '';
  });

  const getInfo = computed(() => {
    const [AGrade, BCGrade] = props.headerData.abcHighlight as HeaderItem[];
    return {
      ASkuCount: formatNumber({ num: AGrade.sku }),
      APcs: formatNumber({ num: AGrade.pcs || 0 }),
      AProp: formatNumber({ num: AGrade.prop || 0, decimals: 1 }),
      BCSkuCount: formatNumber({ num: BCGrade.sku }),
      BCPcs: formatNumber({ num: BCGrade.pcs || 0 }),
      BCProp: formatNumber({ num: BCGrade.prop || 0, decimals: 1 }),
    };
  });
</script>
