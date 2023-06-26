import { IPersonnel } from "./personnel";
import { IUserRegisterModel, IUserResponseModel } from "./user";

export interface IStaff {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation:string;
  _user:string;
  _shortlist:string
}

export interface IStaffViewModel {
  staff:IStaff,
  shortlisted: IPersonnel[]
}


export interface ICreateStaffModel extends IUserRegisterModel{
  position:string;
  profilePicture?: string;
  _organisation:string;
}