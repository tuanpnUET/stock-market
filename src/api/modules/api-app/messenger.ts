import request from 'api/request';

export const sendMessenger = (params: any) => request.post(`task/add`, params);
export const updateMessenger = (id: number, params: any) => request.put(`task/update/${id}`, params);
export const getDetailMessenger = (id: number) => request.get(`task/details/${id}`);
export const getData = (params: any): Promise<any> => {
    return request.get(`task/list`, params);
};
