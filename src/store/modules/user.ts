import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, CURRENT_USER_CREDENTIALS } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import {
  GetUserInfoModel,
  LoginParams,
  RegisterParams,
  CheckPasswordParams,
} from '/@/api/sys/model/userModel';
import {
  doLogout,
  getUserInfo,
  loginApi,
  register,
  requestEmailCode,
  checkEmailCode,
  changePassword,
} from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { isFakeDataMode } from '/@/utils/env';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  currentUserCredentials: Nullable<any>;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    currentUserCredentials: null,
  }),
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getCurrentUserCredentials(state): any {
      return state.currentUserCredentials || getAuthCache<any>(CURRENT_USER_CREDENTIALS) || {};
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setCurrentUserCredentials(info: any) {
      this.currentUserCredentials = info;
      setAuthCache(CURRENT_USER_CREDENTIALS, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        this.setCurrentUserCredentials(data);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('Token 로그아웃 실패');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },

    /**
     * @description: register
     */
    async register(
      params: RegisterParams & {
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      try {
        const { mode, ...registerParams } = params;
        const data = isFakeDataMode()
          ? await new Promise((resolve) =>
              setTimeout(
                () =>
                  resolve({
                    status: true,
                    result: {
                      domainId: 1039,
                      creatorId: 'khw@nearsolution.co.kr',
                      updaterId: 'khw@nearsolution.co.kr',
                      createdAt: '2023-08-23 16:14:13',
                      updatedAt: '2023-08-23 16:14:13',
                      id: 'khw1@nearsolution.co.kr',
                      login: 'khw1@nearsolution.co.kr',
                      email: 'khw1@nearsolution.co.kr',
                      encryptedPassword:
                        'f47c4b720cd560809b27592e4933f897170e7cfe999a3f80d04c7b2887aa8843',
                      name: '테스트유저',
                      phoneNo: '01028283728',
                      position: '매니저',
                      locale: 'ko',
                      timezone: 'Asia/Seoul',
                      activeFlag: true,
                      accountType: 'user',
                    },
                  }),
                1000,
              ),
            )
          : await register(registerParams, mode);
        const { status, result, errorMessage } = data;
        if (!status) {
          throw new Error(errorMessage);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async changePassword(
      userId: string,
      params: CheckPasswordParams & {
        mode?: ErrorMessageMode;
      },
    ): Promise<any> {
      try {
        const { mode, ...checkPasswordParams } = params;
        const data = await changePassword(userId, checkPasswordParams, mode);
        const status = data;
        if (!status) {
          throw new Error();
        }
        return status;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: request email code
     */
    async requestEmailCode(userId: string, authType: string): Promise<any> {
      try {
        const data = isFakeDataMode()
          ? await new Promise((resolve) =>
              setTimeout(
                () =>
                  resolve({
                    status: true,
                    result: true,
                  }),
                1000,
              ),
            )
          : await requestEmailCode(userId, authType);
        const { status, result, errorMessage } = data;
        if (!status) {
          throw new Error(errorMessage);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: check email code
     */

    async checkEmailCode(userId: string, emailCode: string): Promise<any> {
      try {
        const data = isFakeDataMode()
          ? await new Promise((resolve) =>
              setTimeout(
                () =>
                  resolve({
                    status: true,
                    result: true,
                  }),
                1000,
              ),
            )
          : await checkEmailCode(userId, emailCode);
        const { status, result, errorMessage } = data;
        if (!status) {
          throw new Error(errorMessage);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
