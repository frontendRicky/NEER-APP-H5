import { request } from "./request";
import { AxiosRequestConfig } from 'axios';

//发送验证码
export const sendCode = <T>(params: any,config:AxiosRequestConfig) =>
  request.get<T>("/api/account/sendVerificationCode", params, {
    timeout: 15000,
    ...config
  });
//注册
export const signUp = <T>(params: any,config:AxiosRequestConfig) =>
  request.post<T>("/api/account/signUp", params, {
    timeout: 15000,
    ...config
  });