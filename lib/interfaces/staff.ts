import { IUserRegisterModel } from "./user";

export interface IStaff {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation:string;
  _user:string;
}


export interface ICreateStaffModel extends IUserRegisterModel{
  position:string;
  profilePicture?: string;
  _organisation:string;
}