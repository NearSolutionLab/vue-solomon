import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const organization: AppRouteModule = {
  path: '/organization',
  name: 'Organization',
  component: LAYOUT,
  redirect: '/organization',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:people-outline',
    title: t('routes.solomon.organization.organization'),
    orderNo: 40,
  },
  children: [
    {
      path: 'member',
      name: 'MemberPage',
      component: () => import('/@/views/solomon/organization/member/index.vue'),
      meta: {
        title: t('routes.solomon.organization.member'),
        hideMenu: false,
      },
    },
    {
      path: 'invite',
      name: 'InvitePage',
      component: () => import('/@/views/solomon/organization/invite/index.vue'),
      meta: {
        title: t('routes.solomon.organization.invite'),
        hideMenu: false,
      },
    },
  ],
};

export default organization;
