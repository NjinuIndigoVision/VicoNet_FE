import { IPersonnel } from "./personnel";

export interface ICreateProject{
  _organisation:string;
  _creatingUser:string;
  name:string;
  description:string;  
}

export interface IUpdateProjectPersonnel{
  projectId:string;
  personnelId:string;  
  status:string;
}



export interface IProjectView extends IProject {
  _uninvited:IPersonnel[];
  _pending:IPersonnel[];
  _declined:IPersonnel[];
  _accepted:IPersonnel[];
}

export interface IUpdateProjectPersonnel{
  projectId:string;
  personnelId:string;  
  status:string;  
  staffId:string;
}


export interface ICreateProject{
  _organisation:string;
  _creatingUser:string;
  name:string;
  description:string;  
}



export interface IUpdateProject{
  name:string;
  description:string;  
  status:string;
}


export interface IProject {
  _id?:string;
  _organisation:string;
  _creatingUser:string;
  name:string;
  status:string;
  description:string;  
  //list of personnel id
  uninvited:string;
  pending:string;
  declined:string;
  accepted:string;
}