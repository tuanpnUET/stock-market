import request from 'api/request';

export const getProfile = (token?: string, id?: string) =>
    request.get(`users/${id}`, { headers: { token: `Bearer ${token}` } });
export const login = (params: any) => request.post(`users/login`, params);
export const register = (params: any) => request.post(`users/register`, params);
export const deleteAccount = (id?: string) => request.delete(`users/${id}`);
export const updateProfile = (id?: string, params?: any) => request.put(`users/${id}`, params);

export const forgotPassword = (email: string) => request.post(`auth/forgot-password`, { email });
export const checkIsExistEmail = (email: string) => request.post(`auth/check-account-existed`, { email });
export const getVerifyCode = (email: string) => request.post(`auth/request-verified-code`, { email });
export const checkVerifyCode = (email: string, verifiedCode: string) =>
    request.post(`auth/check-verified-code`, { email, verifiedCode });
