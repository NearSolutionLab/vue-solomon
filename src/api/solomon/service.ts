import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetServiceList = '/requests/monitoring/search',
  GetOptimizeServiceList = '/services',
}

export const getServiceList = async (params) => {
  const { result } = await defHttp.get({ url: Api.GetServiceList, params });
  return result;
};

export const getOptimizeServiceList = async (params) => {
  const { result } = await defHttp.get({ url: Api.GetOptimizeServiceList, params });
  return result;
};
