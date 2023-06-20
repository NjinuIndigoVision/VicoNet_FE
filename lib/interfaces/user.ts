import { SrvRecord } from "dns";

export interface IUserResponseModel{
      _id? :string;
      title?:string;
      firstName?:string;
      surname?	:string;
      email?	:string;	
      password?	:string;
      type?:string;
      status?:string;
}

export interface IDeleteUserModel{
  email:string
}

export interface IUserLoginModel{
 email:string;
 password:string; 
}

export interface IActivateAccount{
  email:string;
  otp:string; 
 }

export interface IUserRegisterModel{
  firstName: string;
  surname:string;
  email:string;
  mobileNumber:string;
  password:string;
  type:number;
}

export interface ICompanyRegisterModel{
  email: string;
  password: string;
  userName:string;
  userSurname: string;
  // mobileNumber: z.string(),  
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