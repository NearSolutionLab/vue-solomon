import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home',
  meta: {
    title: t('routes.solomon.home'),
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('/@/views/solomon/home/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.solomon.home'),
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export default home;
