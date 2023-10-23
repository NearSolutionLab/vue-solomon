import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const report: AppRouteModule = {
  path: '/report',
  name: 'Report',
  component: LAYOUT,
  redirect: '/report',
  meta: {
    hideChildrenInMenu: false,
    hideMenu: true,
    title: '리포트',
  },
  children: [
    {
      path: 'capa-analysis/:id',
      name: 'CapaAnalysisPage',
      component: () => import('/@/views/solomon/report/capa-analysis/index.vue'),
      meta: {
        title: '주문 패턴 분석 리포트',
        hideMenu: false,
      },
      props: (route: any) => ({ ...route.params }),
    },
    // {
    //   path: 'capa-analysis',
    //   name: 'CapaAnalysisPage',
    //   component: () => import('/@/views/solomon/report/capa-analysis/index.vue'),
    //   meta: {
    //     title: '주문 패턴 분석 리포트출고 물동량 분석 리포트',
    //     hideMenu: false,
    //   },
    // },
  ],
};

export default report;