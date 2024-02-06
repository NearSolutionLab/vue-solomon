import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

const report: AppRouteModule = {
  path: '/report',
  name: 'Report',
  component: LAYOUT,
  redirect: '/report',
  meta: {
    hideChildrenInMenu: false,
    hideMenu: true,
    title: t('solomon.title.report'),
  },
  children: [
    {
      path: 'capa-analysis/:id',
      name: 'CapaAnalysisPage',
      component: () => import('/@/views/solomon/report/capa-analysis/index.vue'),
      meta: {
        title: t('solomon.title.order_pattern_analysis_report'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    {
      path: 'out-bound-analysis/:id',
      name: 'OutBoundAnalysisPage',
      component: () => import('/@/views/solomon/report/out-bound-analysis/index.vue'),
      meta: {
        title: t('solomon.title.outbound_quantity_analysis_report'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    {
      path: 'inventory-analysis/:id',
      name: 'InventoryAnalysisPage',
      component: () => import('/@/views/solomon/report/inventory-analysis/index.vue'),
      meta: {
        title: t('solomon.title.inventory_quantity_analysis_report'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    {
      path: 'in-bound-analysis/:id',
      name: 'InBoundAnalysisPage',
      component: () => import('/@/views/solomon/report/in-bound-analysis/index.vue'),
      meta: {
        title: t('solomon.title.inbound_flow_analysis_report'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    {
      path: 'abc-analysis/:id',
      name: 'ABCAnalysisPage',
      component: () => import('/@/views/solomon/report/abc-analysis/index.vue'),
      meta: {
        title: t('solomon.title.abc_analysis_report'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    {
      path: 'treksta-forecast',
      name: 'TrekstaForecastPage',
      component: () => import('/@/views/solomon/report/treksta-forecast/index.vue'),
      meta: {
        title: t('solomon.title.treksta_forecast'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    {
      path: 'box-recommand/:id',
      name: 'BoxRecommandPage',
      component: () => import('/@/views/solomon/report/box-recommand/index.vue'),
      meta: {
        title: t('solomon.title.box_recommand'),
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
  ],
};

export default report;
