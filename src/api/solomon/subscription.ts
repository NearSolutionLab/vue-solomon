import { defHttp } from '/@/utils/http/axios';

enum Api {
  Subscriptions = '/subscriptions',
}

export const getSubscriptionList = async (params) => {
  const { result } = await defHttp.get({ url: Api.Subscriptions, params });
  return result;
};

export const subscribeService = async (params?) => {
  return defHttp.post({ url: Api.Subscriptions, data: JSON.stringify(params) });
};

export const unsubscribeService = async (id) => {
  return defHttp.delete({ url: Api.Subscriptions + '/' + id });
};
