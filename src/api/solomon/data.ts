import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetDataSetList = '/data_lists',
}

export const getDataSetList = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.GetDataSetList, params });
  return { total, items };
};
