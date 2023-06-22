import { SrvRecord } from "dns";



export interface ICompanyRegisterModel{
  email: string;
  password: string;
  userName:string;
  userSurname: string;
  userNumber: string;
  companyNumber: string;
  companyReg: string;
  companyName:string;
  companyAdrress: string;
  position:string;
  userEmail:string;  
}

export interface ICompanyRegisterResponseModel extends ICompanyRegisterModel{

}

export interface IStaff {
  _id?:string;
  profilePicture?:string;
  position?:string;		
  _organisation:string;
  _user:string;
}
