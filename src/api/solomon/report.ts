import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetCapaAnalysisReport = '/request/das_capa/get_data',
}

export const GetCapaAnalysisReport = async (id) => {
  const { result } = await defHttp.get({ url: Api.GetCapaAnalysisReport + '/' + id });
  return result;
};
