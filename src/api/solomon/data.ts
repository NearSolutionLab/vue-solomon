import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  DataSetList = '/data_lists',
  GetOutBoundData = '/out_bound_inputs/',
  GetInBoundData = '/in_bound_inputs/',
  GetInventoryData = '/inventory_inputs/',
  GetOrderData = '/order_inputs/',
  UploadExcelData = '/data_lists/upload_by_excel/',
  UpdateExcelData = '/data_lists/update_by_excel/',
}

export const getDataSetList = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.DataSetList, params });
  return { total, items };
};

export const deleteDataSet = async (id, dataType) => {
  const { result } = await defHttp.delete({
    url: Api.DataSetList + '/' + id + '/' + dataType,
  });
  return result;
};

export const updateDataSet = async (params) => {
  const { result } = await defHttp.put({
    url: Api.DataSetList + '/rename',
    data: JSON.stringify(params),
  });
  return result;
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

export const getOrderData = async (params) => {
  const { total, items } = await defHttp.get({ url: Api.GetOrderData, params });
  return { total, items };
};

export const uploadExcelData = async (name: string, type: string, formData: any) => {
  const response = await defHttp.post({
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
      // @ts-ignore
      ignoreCancelToken: true,
    },
    url: Api.UploadExcelData + name + '/' + type,
    data: formData,
  });
  return response;
};
export const updateExcelData = async (id: string, name: string, type: string, formData: any) => {
  const response = await defHttp.post({
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
      // @ts-ignore
      ignoreCancelToken: true,
    },
    url: Api.UpdateExcelData + id + '/' + name + '/' + type,
    data: formData,
  });
  return response;
};
