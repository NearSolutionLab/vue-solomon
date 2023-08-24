import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const data: AppRouteModule = {
  path: '/data',
  name: 'Data',
  component: LAYOUT,
  redirect: '/data',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:grid-outline',
    title: t('routes.solomon.data'),
    orderNo: 20,
  },
  children: [
    {
      path: '',
      name: 'DataPage',
      component: () => import('/@/views/solomon/data/index.vue'),
      meta: {
        title: t('routes.solomon.data'),
        icon: 'ion:grid-outline',
        hideMenu: true,
      },
    },
  ],
};

export default data;
