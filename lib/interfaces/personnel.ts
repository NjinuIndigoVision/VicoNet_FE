export interface IPersonalInformation{
  _id?:string;
  about? :string;
  name?:string;
  surname?:string;
  dateOfBirth?	:string; //not sent
  address?	:string; //not sent
  country?:string; //not sent 
  province?:string;
}
export interface IJobResponsibilities{
  content:string
}

export interface IJobInformation{
  employer?:string,
  jobTitle?:string,
  startDate?:string,
  endDate?:string
  responsibilities?:IJobResponsibilities[]
}

export interface IEducationInformation{
  instituteName:string,
  qualification:string,
  dateCompleted:string
}
export interface IPersonnel {
  searchKeys?:string;
  about?:string; // personal info->about
  currentJob?: IJobInformation;
  previousWorkExperience?:IJobInformation[];
  yearsOfExperience?:string,
  education?:IEducationInformation[],
  keySkills?: string[];
  keyCourses?:string[];
  cvUrl?:string;
  personalInformation:IPersonalInformation;
  _user:string;
  state:number;
  preferedWorkMethod?:number;
  _id:string;
  
}

export interface IPersonnelRequestModel extends IPersonnel{
  cv: Blob;
}