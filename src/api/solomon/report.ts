import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetCapaAnalysisReport = '/request/das_capa/get_data',
  GetDasCapaDetails = '/request/das_capa/get_details',
  GetOutBoundAnalysisReport = '/request/volume_analysis/out_bound_analysis/get_data',
}

export const getCapaAnalysisReport = async (id) => {
  const { result } = await defHttp.get({ url: Api.GetCapaAnalysisReport + '/' + id });
  return result;
};

export const getDasCapaDetails = async (requestId, batchSize, date) => {
  const { result } = await defHttp.get({
    url: Api.GetDasCapaDetails + '/' + requestId + '/' + batchSize + '/' + date,
  });
  return result;
};

export const getOutBoundAnalysisReport = async (requestId, storageMethod?) => {
  const url =
    Api.GetOutBoundAnalysisReport + '/' + requestId + `${storageMethod ? '/' + storageMethod : ''}`;
  const { result } = await defHttp.get({ url });
  return result;
};
