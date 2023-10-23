import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetCapaAnalysisReport = '/request/das_capa/get_data',
}

export const GetCapaAnalysisReport = (id) => {
  return defHttp.get({ url: Api.GetCapaAnalysisReport + '/' + id });
};
