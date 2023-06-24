import { object } from "zod";
import { IPersonnel } from "../interfaces/personnel";
import { Api } from "./endpoints";
import { IProjectView } from "../interfaces/project";


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
  
      
export const GetProjectById= async (projectId:string):Promise<IProjectView[]|ICustomError >=>{

const response = (await Api.GET_ProjectById(projectId)).data?? {code:500, message: "Cannot load project", object:undefined} as ICustomError;
return response;

}
