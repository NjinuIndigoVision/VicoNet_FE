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

export const _staffMock = {
  _id: "6492faa650751a30c3cafc4a",
  position: "Manager",
  _user: "6492faa650751a30c3cafc48",
  profilePicture:"",
  _organisation:"",
  _userDetails:"",
  _shortlisted:"",
  _shortlistedDetails:[
    
  ]


} as IStaffViewModel

export interface ICreateStaffModel extends IUserRegisterModel{
  position:string;
  profilePicture?: string;
  _organisation:string;
}