
export interface IUserResponseModel{
      _id? :string;
      title?:string;
      firstName?:string;
      surname?	:string;
      email?	:string;	
      password?	:string;
      type?:string
}

export interface IUserLoginModel{
 email:string;
 password:string; 
}

export interface IUserRegisterModel{
  fullName: string;
  surname:string;
  email:string;
  mobileNumber:string;
  password:string;
}