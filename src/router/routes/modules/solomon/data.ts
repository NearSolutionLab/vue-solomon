import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const data: AppRouteModule = {
  path: '/data',
  name: 'Data',
  component: LAYOUT,
  redirect: '/data',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:grid-outline',
    title: t('routes.solomon.data.data'),
    orderNo: 20,
  },
  children: [
    {
      path: 'retrieve',
      name: 'DataPage',
      component: () => import('/@/views/solomon/data/index.vue'),
      meta: {
        title: t('routes.solomon.data.retrieve'),
        hideMenu: false,
      },
    },
    {
      path: 'create',
      name: 'CreatePage',
      component: () => import('/@/views/solomon/data/create/index.vue'),
      meta: {
        title: t('routes.solomon.data.create'),
        hideMenu: false,
      },
    },
    {
      path: 'processing',
      name: 'RunningDataPages',
      component: () => import('/@/views/solomon/data/processing/index.vue'),
      meta: {
        title: t('routes.solomon.data.processing'),
        hideMenu: false,
      },
    },
  ],
};

export default data;
