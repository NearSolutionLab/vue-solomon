import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const subscription: AppRouteModule = {
  path: '/subscription',
  name: 'Subscription',
  component: LAYOUT,
  redirect: '/subscription',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:thumbs-up-outline',
    title: t('routes.solomon.subscription'),
    orderNo: 10,
  },
  children: [
    {
      path: '',
      name: 'SubscriptionPage',
      component: () => import('/@/views/solomon/subscription/index.vue'),
      meta: {
        title: t('routes.solomon.subscription'),
        icon: 'ion:thumbs-up-outline',
        hideMenu: true,
      },
    },
  ],
};

export default subscription;
