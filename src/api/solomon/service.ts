import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetServiceList = '/requests/monitoring/search',
  GetOptimizeServiceList = '/services',
  GetServiceSelectionList = '/services/list',
}

export const getServiceList = async (params) => {
  const { result } = await defHttp.get({ url: Api.GetServiceList, params });
  return result;
};

export const getOptimizeServiceList = async (params) => {
  const { result } = await defHttp.get({ url: Api.GetOptimizeServiceList, params });
  return result;
};

export const getServiceSelectionList = async () => {
  const { result } = await defHttp.get({ url: Api.GetServiceSelectionList });
  return result;
};
