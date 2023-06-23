import { IPersonnel } from "./personnel";
import { IUserRegisterModel, IUserResponseModel } from "./user";

export interface IStaff {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation:string;
  _user:string;
}

export interface IStaffViewModel {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation:string;
  _user:string;
  _userDetails: IUserResponseModel,
  _shortlisted: string;
  _shortlistedDetails: IPersonnel[]
}



export interface ICreateStaffModel extends IUserRegisterModel{
  position:string;
  profilePicture?: string;
  _organisation:string;
}