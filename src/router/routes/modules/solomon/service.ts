import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const service: AppRouteModule = {
  path: '/service',
  name: 'Service',
  component: LAYOUT,
  redirect: '/service',
  meta: {
    hideChildrenInMenu: false,
    icon: 'material-symbols:language',
    title: t('routes.solomon.service.service'),
    orderNo: 30,
  },
  children: [
    {
      path: 'complete',
      name: 'CompletePage',
      component: () => import('/@/views/solomon/service/complete/index.vue'),
      meta: {
        title: t('routes.solomon.service.complete'),
        hideMenu: false,
      },
    },
    {
      path: 'processing',
      name: 'ProcessingPage',
      component: () => import('/@/views/solomon/service/processing/index.vue'),
      meta: {
        title: t('routes.solomon.service.processing'),
        hideMenu: false,
      },
    },
  ],
};

export default service;
