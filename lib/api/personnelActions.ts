import { object } from "zod";
import { IPersonnel } from "../interfaces/personnel";
import { Api } from "./endpoints";


export interface IShortlistPersonnelRequest{
personnelId:string,
staffId:string,
isShortlisted:Boolean
}


export interface IShortlistPersonnelResponse{
    personnelId:string,
    staffId:string,
    isShortlisted:Boolean,

    }


export interface ICustomError {
    code: any;
    message: string;
    object?:any;
    }
  
      
export const AddPersonnelToShortlist= async (payload:IShortlistPersonnelRequest):Promise<IPersonnel[]|ICustomError >=>{

const response = (await Api.POST_ShortlistPersonnel(payload)).data?? {code:500, message: "Did not add user to shortlist", object:undefined} as ICustomError;
return response;

}

export const GetShortlistedPersonnel= async (staffId:string):Promise<IPersonnel[]|ICustomError >=>{

const response = (await Api.GET_ShortlistPersonnel(staffId)).data?? {code:500, message: "Cannot retrieve shortlist", object:undefined} as ICustomError;
return response;

}

export const AddPersonnelToProject= async (staffId:string):Promise<IPersonnel[]|ICustomError >=>{

    const response = (await Api.GET_ShortlistPersonnel(staffId)).data?? {code:500, message: "Cannot retrieve shortlist", object:undefined} as ICustomError;
    return response;
    
}
