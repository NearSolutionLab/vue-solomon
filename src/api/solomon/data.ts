import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetDataSetList = '/data_lists',
  GetOutBoundData = '/out_bound_inputs/',
  GetInBoundData = '/in_bound_inputs/',
  GetInventoryData = '/inventory_inputs/',
}

export const getDataSetList = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.GetDataSetList, params });
  return { total, items };
};

export const getOutBoundData = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.GetOutBoundData, params });
  return { total, items };
};

export const getInBoundData = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.GetInBoundData, params });
  return { total, items };
};

export const getInventoryData = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.GetInventoryData, params });
  return { total, items };
};
