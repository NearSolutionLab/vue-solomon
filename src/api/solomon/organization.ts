import { defHttp } from '/@/utils/http/axios';

interface UserParams {
  id: string;
  name?: string;
  phoneNo?: string;
  position?: string;
}

enum Api {
  Members = '/customers/members',
  Users = '/users',
}

export const getMembers = async (params) => {
  const { result } = await defHttp.get({ url: Api.Members, params });
  return result;
};

export const updateMember = async (userId: string, params: UserParams) => {
  const { result } = await defHttp.put({
    url: Api.Users + '/' + userId,
    data: JSON.stringify(params),
  });
  return result;
};

export const deleteMember = async (userId: string) => {
  const { result } = await defHttp.delete({
    url: Api.Users + '/' + userId,
  });
  return result;
};
