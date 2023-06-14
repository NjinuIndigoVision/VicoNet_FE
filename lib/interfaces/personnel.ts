export interface IPersonalDetails {
  profile?: string;
  name?: string;
  surname?: string;
  dateOfBirth?: string;
  cellPhone?: string;
  address?: string;
  country?: string;
  province?: string;
}

export interface IPersonalInformation {
  profile?: string;
  name: string;
  surname: string;
  dateOfBirth?: string;
  cellPhone?: string;
  address?: string;
  country?: string;
  province?: string;
  _id: string;
}

export interface IJobResponsibilities {
  content: string;
}

export interface IJobInformation {
  employer?: string;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
  about?: string;
  responsibilities?: IJobResponsibilities[];
}

export interface IEducationInformation {
  instituteName?: string;
  qualification?: string;
  dateCompleted?: string;
}
export interface IPersonnel {
  _id?: string;
  searchKeys?: string;
  information?: string;
  currentJob?: IJobInformation;
  previousWorkExperience?: IJobInformation[];
  yearsOfExperience?: string;
  education?: IEducationInformation[];
  keySkills?: string[];
  keyCourses?: string[];
  cvUrl?: string;
  personalInformation?: IPersonalInformation;
  _user?: string;
}
