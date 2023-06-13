import { Diagnostic } from "../logger/logger";

const className="troob.api.lib.api.response"

export interface IResponseObject<T> {
  error: boolean;
  message?: string;
  data?: T;
  status:number
}



