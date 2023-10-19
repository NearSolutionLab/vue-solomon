import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetOptimizeResultByStatus = '/requests/monitoring/search',
}

export const getOptimizeResultByStatus = () => {
  const params = {
    statuses: 'START,VALIDATING,ANALYSING,SOLVING,REPORTING,END',
    periodFilter: 'month',
    limit: 6,
    page: 1,
  };
  return defHttp.get({ url: Api.GetOptimizeResultByStatus, params });
};
