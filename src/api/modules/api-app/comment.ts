import request from 'api/request';

export const getAllComment = () => request.get(`/comments`);
export const createComment = (params: any) => request.post(`/comments`, params);
export const deleteComment = (id: string) => request.delete(`/comments/${id}`);
