import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetServiceList = '/requests/monitoring/search',
  GetOptimizeServiceList = '/services',
  GetServiceSelectionList = '/services/list',
  OutboundVolumeAnalysis = '/request/volume_analysis/out_bound_analysis/start',
  OutboundCapaAnalysis = '/request/das_capa/start',
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

// 주문 패턴 분석, services.outbound.capa_analysis
export const analyzeOutboundOrderPattern = async (params) => {
  const { result } = await defHttp.post({
    url: Api.OutboundCapaAnalysis,
    data: JSON.stringify(params),
  });
  return result;
};

// 출고 물동량 분석, service.outbound.out_bound_analysis
export const analyzeOutboundVolume = async (params) => {
  const { result } = await defHttp.post({
    url: Api.OutboundVolumeAnalysis,
    data: JSON.stringify(params),
  });
  return result;
};
