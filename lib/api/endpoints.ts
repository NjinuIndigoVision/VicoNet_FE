import { IPersonnel } from "../interfaces/personnel";
import { IActivateAccount, IUserLoginModel, IUserRegisterModel, IUserResponseModel } from "../interfaces/user";
import { GET, POST } from "./client";

import { IResponseObject } from "./response";


const url = "http://localhost:8080/api";
// const url = "https://viconet-vercel-git-main-viconet.vercel.app/api";


export const Api = {
  Base: url,
  // GET_AllPersonnel: async():Promise<IResponseObject<IPersonnelResponseModel[]>> => {
  //   const response = await GET(`${url}/Personnel/GetAllPersonnel/`);
  //   return response;
  // },
  // GET_PersonnelById: async (payload: string): Promise<IResponseObject<IPersonnelResponseModel>> => {
  //   const response = await GET(`${url}/personnel/${payload}`);
  //   return response;
  // },
  // POST_CreatePersonnel: async (
  //   payload: IUserRequestModel
  // ): Promise<IResponseObject<IUserResponseModel>> => {
  //   const response = await POST(`${url}/Personnel/GetAllPersonnel`, payload);
  //   return response;
  // },

  POST_Login: async (
    payload: IUserLoginModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/login`, payload);
    const _response = {
      error: response.statusText != "OK",
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IUserResponseModel>;

    return _response;
  },
  POST_ActivateOTP: async (
    payload: IActivateAccount
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/users/verify`, payload);
    const _response = {
      error: response.statusText != "OK",
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IUserResponseModel>;

    return _response;
  },
  POST_Register: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/users`, payload);
    const _response = {
      error: response.statusText != "OK",
      message: response.statusText,
      data: response.data,
      status:response.status
    } as IResponseObject<IUserResponseModel>
    
    return _response;
  },
  POST_Personnel: async (
    payload: IPersonnel
  ): Promise<IResponseObject<IPersonnel>> => {
    const response = await POST(`${url}/personnel`, payload);
    const _response =  {
      error: response.statusText!="OK",
      message:response.statusText,
      data: response.data,
      status:response.status
    } as IResponseObject<IPersonnel>
    
    return _response;
  }
};
