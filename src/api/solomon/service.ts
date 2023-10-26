import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetServiceList = '/requests/monitoring/search',
}

export const getServiceList = async (params) => {
  const { result } = await defHttp.get({ url: Api.GetServiceList, params });
  return result;
};
