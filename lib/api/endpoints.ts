import {
  ICompanyRegisterModel,
  ICompanyRegisterResponseModel,
  IOrganisationViewModel,
} from "../interfaces/company";
import { IPersonnel,  } from "../interfaces/personnel";
import {
  IActivateAccount,
  IDeleteUserModel,
  IUserLoginModel,
  IUserRegisterModel,
  IUserResponseModel,
} from "../interfaces/user";
import { IShortlistPersonnelRequest } from "./personnelActions";
import { GET, POST } from "./client";

import { IResponseObject } from "./response";
import { ICreateProject, IProject, IProjectView, IUpdateProjectPersonnel } from "../interfaces/project";
import { IStaffViewModel } from "../interfaces/staff";
import { INotification } from "../interfaces/notification";

// export const url = "http://localhost:8080/api";
export const url = "https://viconet-vercel-git-main-viconet.vercel.app/api";

export const Api = {
  Base: url,
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

  POST_UpdatePersonnel: async (
    payload: IPersonnel, personnelId:string
  ): Promise<IResponseObject<IPersonnel>> => {
    const response = await POST(`${url}/personnel/${personnelId}`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IPersonnel>;

    return _response;
  },


  POST_UpdateProjectPersonnel: async (
    payload: IUpdateProjectPersonnel
  ): Promise<IResponseObject<IProject>> => {
    const response = await POST(`${url}/updateProjectPersonnel/`, payload);

    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IProject>;

    return _response;
  },


  GET_Personnel: async (payload: string): Promise<IPersonnel> => {
    const response = await GET(`${url}/personnel/${payload}`);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response,
      status: response.status,
    } as IResponseObject<IPersonnel>;

    return response;
  },
  GET_PersonnelByUserId: async (payload: string): Promise<IPersonnel> => {
    const response = await GET(`${url}/personnelByUserId/${payload}`);
    const _response = {
      error: response.status != 200,
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
      status: response.status,
    } as IResponseObject<IUserResponseModel>;

    return _response;
  },

  POST_RegisterCompany: async (
    payload: ICompanyRegisterModel
  ): Promise<IResponseObject<ICompanyRegisterResponseModel>> => {
    const response = await POST(`${url}/organisation`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<ICompanyRegisterResponseModel>;

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
      status: response.status,
    } as IResponseObject<IUserResponseModel>;

    return _response;
  },

  POST_ShortlistPersonnel: async (
    payload: IShortlistPersonnelRequest
  ): Promise<IResponseObject<IPersonnel[]>> => {
    const response = await POST(`${url}/staff/shortlist`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IPersonnel[]>;

    return _response;
  },

  GET_ProjectById: async (projectId: string): Promise<IProjectView> => {
    const response = await GET(`${url}/project/${projectId}`);
    // const _response = {
    //   error: response.status != 200,
    //   message: response.statusText,
    //   data: response,
    //   status: response.status,
    // } as IProjectView;
console.log("RESSS", response._doc);
    return response;
  },

  GET_OrganisationById: async (organisationId: string): Promise<IOrganisationViewModel> => {
    const response = await GET(`${url}/organisation/${organisationId}`);
    console.log("resss", response)
    // const _response = {
    //   error: response.status != 200,
    //   message: response.statusText,
    //   data: response,
    //   status: response.status,
    // } as IResponseObject<IOrganisationViewModel>;

    return response;
  },

  
  GET_NotificationByPersonnelId: async (personnelId: string): Promise<INotification[]> => {
    const response = await GET(`${url}/notificationByUser/${personnelId}`);
    return response;
  },


  GET_CloseNotification: async (notificationId:string): Promise<INotification[]> => {
    
    const response = await GET(`${url}/closeNotification/${notificationId}`);
    return response;
  },

  GET_AcceptInvitation: async (personnelId:string, projectId:string): Promise<INotification[]> => {
    const response = await GET(`${url}/acceptinvite/${personnelId}/${projectId}`);
    return response;
  },

  GET_DeclineInvitation: async (personnelId:string, projectId:string): Promise<INotification[]> => {
    const response = await GET(`${url}/declineinvite/${personnelId}/${projectId}`);
    return response;
  },

  GET_ShortlistPersonnel: async (staffId: string, personnelId:string): Promise<IStaffViewModel> => {
    const response = await GET(`${url}/staff/shortlist/${personnelId}/${staffId}`) as IStaffViewModel;
    // const _response = {
    //   error: response.status != 200,
    //   message: response.statusText,
    //   data: response,
    //   status: response.status,
    // } as IResponseObject<IStaffViewModel>;

    return response;
  },

  GET_UnShortlistPersonnel: async (staffId: string, personnelId:string): Promise<IStaffViewModel> => {
    const response = await GET(`${url}/staff/removeshortlist/${personnelId}/${staffId}`) as IStaffViewModel; 
    // const _response = {
    //   error: response.status != 200,
    //   message: response.statusText,
    //   data: response,
    //   status: response.status,
    // } as IResponseObject<IStaffViewModel>;

    return response;
  },

//  UpdateProjectPersonnel: async (upadateRequest: IUpdateProjectPersonnel): Promise<IResponseObject<IProject>> => {
//     const response = await POST(`${url}/project/updateProjectPersonnel`, upadateRequest);
//     const _response = {
//       error: response.status != 200,
//       message: response.statusText,
//       data: response.data,
//       status: response.status,
//     } as IResponseObject<IProject>;

//     return _response;
//   },

  
  GET_StaffUserById: async (userId:string): Promise<IStaffViewModel> => {
    const response = await GET(`${url}/staffuser/${userId}`) as IStaffViewModel; 
    return response;
  },


  POST_Personnel: async (
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

  POST_Project: async (
    payload: ICreateProject
  ): Promise<IResponseObject<IProject>> => {
    const response = await POST(`${url}/project`, payload);
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IProject>;

    return _response;
  },

  POST_Search: async (payload: any) => {
    const response = await POST(`${url}/searchPersonnel`, {searchKey: payload});
    const _response = {
      error: response.status != 200,
      message: response.statusText,
      data: response.data,
      status: response.status,
    } as IResponseObject<IPersonnel[]>;

    return _response;
  }
};
