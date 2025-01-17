/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[] | string[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

/**
 * @description: Register interface parameters
 */
export interface RegisterParams {
  userId: string;
  password: string;
  companyName: string;
  businessCode: string;
  managerName: string;
  managerPosition: string;
  managerPhoneNo: string;
}

export interface CheckPasswordParams {
  login: string;
  currentPass: string;
  newPass: string;
  email: string;
}
