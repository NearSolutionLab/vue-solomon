import { BasicFetchResult } from '/@/api/model/baseModel';

export interface ServiceListItem {
  id: string;
  service?: object;
  dataSize?: number;
  status?: string;
  progress?: number;
  createdAt?: string;
}

/**
 * @description: Request list return value
 */
export type ServiceListGetResultModel = BasicFetchResult<ServiceListItem>;
