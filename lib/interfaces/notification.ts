export interface INotification {
  _id?:string;
  targetUser:string;
  reference:string;
  message:string;
  status:string
  type:string;
  email:string;
  phone:string;
  date:string
}