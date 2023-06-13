import { IUserLoginModel, IUserRegisterModel, IUserResponseModel } from "../interfaces/user";
import { GET, POST } from "./client";

import { IResponseObject } from "./response";


const url = "http://localhost:8080/api";


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
    return response;
  },
  POST_Register: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/users`, payload);
    return response;
  }

};
