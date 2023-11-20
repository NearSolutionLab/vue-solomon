import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system',
  meta: {
    hideChildrenInMenu: false,
    hideMenu: true,
    title: '시스템',
  },
  children: [
    {
      path: 'system-usage',
      name: 'SystemUsagePage',
      component: () => import('/@/views/solomon/system/system-usage/index.vue'),
      meta: {
        title: '시스템 사용량',
        hideMenu: false,
      },
    },
  ],
};

export default system;
