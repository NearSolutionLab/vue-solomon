import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  RegisterParams,
  CheckPasswordParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/vue/getUserInfo',
  GetPermCode = '/vue/getPermCode',
  TestRetry = '/testRetry',
  Register = '/customers/join',
  RequestEmailCode = '/user_auth/send/',
  CheckEmailCode = '/user_auth/confirm/',
  ChangePassword = '/users/change_pass/',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.post<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export function register(params: RegisterParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function changePassword(
  userId: string,
  params: CheckPasswordParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(
    {
      url: Api.ChangePassword + userId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function requestEmailCode(userId: string, authType: string) {
  console.log(userId);
  return defHttp.post({
    url: Api.RequestEmailCode + userId,
    params: {
      emailId: userId,
      authType: authType,
    },
  });
}

export function confirmAuthKey(userId: string, emailCode: string) {
  return defHttp.get({
    url: Api.CheckEmailCode + `${userId}/${emailCode}`,
  });
}

export function checkEmailCode(userId: string, emailCode: string) {
  return defHttp.get({
    url: Api.CheckEmailCode + `${userId}/${emailCode}`,
  });
}
