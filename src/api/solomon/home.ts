import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetCustomerUsage = '/customers/usage',
}

export const getCustomerUsage = async (id) => {
  const { result } = await defHttp.get({ url: Api.GetCustomerUsage + '/' + id });
  return result;
};
