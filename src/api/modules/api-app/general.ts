import request from 'api/request';
import requestv2 from 'api/requestv2';

export const getInit = (): Promise<any> => request.get(`/init`);
export const getResources = (): Promise<any> => request.get(`/resources`);
export const uploadImage = (formData: any): Promise<any> => requestv2.post(`/v1/app/upload/image`, formData);
