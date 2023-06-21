import { ICompanyRegisterModel, ICompanyRegisterResponseModel } from "../interfaces/company";
import { IPersonnel } from "../interfaces/personnel";
import { IActivateAccount, IDeleteUserModel, IUserLoginModel, IUserRegisterModel, IUserResponseModel } from "../interfaces/user";
import { GET, POST } from "./client";

import { IResponseObject } from "./response";


// const url = "http://localhost:8080/api";
export const url = "https://viconet-vercel-git-main-viconet.vercel.app/api";


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
      error: response.status != 200,
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
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IUserResponseModel>;

    return _response;
  },

  POST_AddPersonnel: async (
    payload: IPersonnel
  ): Promise<IResponseObject<IPersonnel>> => {
    const response = await POST(`${url}/personnel`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IPersonnel>;

    return _response;
  },

  GET_Personnel: async (
    payload: string
  ): Promise<IPersonnel> => {
    const response = await GET(`${url}/personnel/${payload}`);
    const _response = {
      error:response.status != 200,
      message: response.statusText,
      data: response,
      status: response.status,
    } as IResponseObject<IPersonnel>;
    
    return response;
  },


  POST_Register: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/users`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status:response.status
    } as IResponseObject<IUserResponseModel>
    
    return _response;
  },

  POST_RegisterCompany: async (
    payload: ICompanyRegisterModel
  ): Promise<IResponseObject<ICompanyRegisterResponseModel>> => {
    const response = await POST(`${url}/users`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status:response.status
    } as IResponseObject<ICompanyRegisterResponseModel>
    
    return _response;
  },

  POST_DeleteUser: async (
    payload: IDeleteUserModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/users/delete`, payload);
    const _response = {
      error: response.status != 200,
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
      error: response.status != 200,
      message:response.statusText,
      data: response.data,
      status:response.status
    } as IResponseObject<IPersonnel>
    
    return _response;
  }
};
