import { SrvRecord } from "dns";
import { IProject } from "./project";

export interface IOrganisationViewModel extends IOrganisation{
  projects: IProject[],
  organisation: IOrganisation
}
export interface IOrganisation {
  _id?:string;
  profile:string;
  name:string;	
  description:string;
  status:string;		
  currentPackage:string;		
  renewalDate	:string;	
  mobilePhone:string;	
  _staff:string;
  _projects:string;
  _adminStaff:string;
  
}


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
  title?:string
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
