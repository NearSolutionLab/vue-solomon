import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetServiceList = '/requests/monitoring/search',
  GetOptimizeServiceList = '/services',
  GetServiceSelectionList = '/services/list',
  OutboundCapaAnalysis = '/request/das_capa',
  OutboundVolumeAnalysis = '/request/volume_analysis/out_bound_analysis',
  OutboundShippingBatch = '/request/order_similarities',
  ABCOptimization = '/request/abc',
  OutboundABCAnalysis = '/request/abc_analysis',
  InventoryAnalysis = '/request/volume_analysis/inventory_analysis',
  InboundVolumeAnalysis = '/request/volume_analysis/in_bound_analysis',
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
    url: Api.OutboundCapaAnalysis + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteOutboundOrderPattern = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.OutboundCapaAnalysis + '/' + id,
  });
  return result;
};

// 출고 물동량 분석, service.outbound.out_bound_analysis
export const analyzeOutboundVolume = async (params) => {
  const { result } = await defHttp.post({
    url: Api.OutboundVolumeAnalysis + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteOutboundVolume = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.OutboundVolumeAnalysis + '/' + id,
  });
  return result;
};

// DAS 출고 배치 생성, 'services.outbound.shipping_batch'
export const createOutboundShippingBatch = async (params) => {
  const { result } = await defHttp.post({
    url: Api.OutboundShippingBatch + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteOutboundShippingBatch = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.OutboundShippingBatch + '/' + id,
  });
  return result;
};

// ABC분석 서비스, 'service.inventory.ABCOptimize'
export const optimizeABC = async (params) => {
  const { result } = await defHttp.post({
    url: Api.ABCOptimization + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteABCOptimization = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.ABCOptimization + '/' + id,
  });
  return result;
};

// 출고 물동량 ABC분석, 'services.outbound.abc_analysis'
export const analyzeOutboundABC = async (params) => {
  const { result } = await defHttp.post({
    url: Api.OutboundABCAnalysis + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteOutboundABC = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.OutboundABCAnalysis + '/' + id,
  });
  return result;
};

// 재고 물동량 분석, 'service.inventory.inventory_analysis'
export const analyzeInventory = async (params) => {
  const { result } = await defHttp.post({
    url: Api.InventoryAnalysis + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteInventoryAnalysis = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.InventoryAnalysis + '/' + id,
  });
  return result;
};

// 입고 물동량 분석, 'service.inbound.in_bound_analysis'
export const analyzeInboundVolume = async (params) => {
  const { result } = await defHttp.post({
    url: Api.InboundVolumeAnalysis + '/start',
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteInboundVolume = async (id) => {
  const { result } = await defHttp.delete({
    url: Api.InboundVolumeAnalysis + '/' + id,
  });
  return result;
};
