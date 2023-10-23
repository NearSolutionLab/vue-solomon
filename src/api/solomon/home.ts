import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetCustomerUsage = '/customers/usage',
}

export const getCustomerUsage = (id) => {
  return defHttp.get({ url: Api.GetCustomerUsage + '/' + id });
};
