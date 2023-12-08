import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  GetDataSetList = '/data_lists',
  GetOutBoundData = '/out_bound_inputs/',
  GetInBoundData = '/in_bound_inputs/',
  GetInventoryData = '/inventory_inputs/',
  UploadExcelData = '/data_lists/upload_by_excel/',
  DeleteDataSet = '/data_lists/',
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

export const deleteDataSet = async (id, type) => {
  const { result } = await defHttp.delete({ url: Api.DeleteDataSet + id + '/' + type });
  return { result };
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
