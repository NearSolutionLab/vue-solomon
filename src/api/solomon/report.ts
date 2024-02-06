import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetCapaAnalysisReport = '/request/das_capa/get_data',
  GetDasCapaDetails = '/request/das_capa/get_details',
  GetOutBoundAnalysisReport = '/request/volume_analysis/out_bound_analysis/get_data',
  GetInventoryAnalysisReport = '/request/volume_analysis/inventory_analysis/get_data',
  GetInBoundAnalysisReport = '/request/volume_analysis/in_bound_analysis/get_data',
  GetABCAnalysisReport = '/request/abc_analysis/get_data',
  GetBoxRecommand = '/request/bms/get_data',
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

export const getInventoryAnalysisReport = async (requestId, storageMethod?) => {
  const url =
    Api.GetInventoryAnalysisReport +
    '/' +
    requestId +
    `${storageMethod ? '/' + storageMethod : ''}`;
  const { result } = await defHttp.get({ url });
  return result;
};

export const getInBoundAnalysisReport = async (requestId, storageMethod?) => {
  const url =
    Api.GetInBoundAnalysisReport + '/' + requestId + `${storageMethod ? '/' + storageMethod : ''}`;
  const { result } = await defHttp.get({ url });
  return result;
};

export const getABCAnalysisReport = async (id) => {
  const { result } = await defHttp.get({ url: Api.GetABCAnalysisReport + '/' + id });
  return result;
};

export const getBoxRecommandReport = async (id) => {
  const result = await defHttp.get({ url: Api.GetBoxRecommand + '/' + id });
  return result;
};
