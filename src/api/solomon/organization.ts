import { defHttp } from '/@/utils/http/axios';

interface UserParams {
  id: string;
  name?: string;
  phoneNo?: string;
  position?: string;
}

interface InviteParams {
  emailId: string;
  name: string;
  authType: string;
}

interface ConfirmInvitationParams {
  userId: string;
  password: string;
  companyName: string;
  businessCode: string;
  name: string;
  position?: string;
  authType: string;
  domainId: string;
}

enum Api {
  Members = '/customers/members',
  Users = '/users',
  Invites = '/customers/invites',
  InviteMember = '/user_auth/invite_user',
  ConfirmInvitation = '/customers/confirm_invite',
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

export const getInvites = async (params) => {
  const { result } = await defHttp.get({ url: Api.Invites, params });
  return result;
};

export const deleteInvite = async (emailId) => {
  const { result } = await defHttp.delete({
    url: Api.Invites + '/' + emailId,
  });
  return result;
};

export const inviteMember = async (emailId: string, params: InviteParams) => {
  const { result } = await defHttp.post({
    url: Api.InviteMember + '/' + emailId,
    data: JSON.stringify(params),
  });
  return result;
};

export const confirmInvitation = async (params: ConfirmInvitationParams) => {
  const { result } = await defHttp.post({
    url: Api.ConfirmInvitation,
    data: JSON.stringify(params),
  });
  return result;
};
