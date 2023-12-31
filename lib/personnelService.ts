import axios from "axios";
import { IPersonnel, IPersonnelRequestModel } from "./interfaces/personnel";
import { Api, url } from "./api/endpoints";

export async function uploadCV(formData: FormData){

    const config = {     
        headers: { 'content-type': 'multipart/form-data',  "Access-Control-Allow-Origin": "*"},
        
    }
   const resp = await axios.post(`${url}/upload_cv/1`, formData, config)
   return resp;


}
export async function _addPersonnel(person: IPersonnelRequestModel ){
    const formData = new FormData();
    formData.append("cv", person.cv as Blob);
    const resource = await uploadCV(formData);
    const personnel ={
        cvUrl:resource,
        ...person
    } as IPersonnel;

    const personnelResponse = await Api.POST_Personnel(personnel);
    return personnelResponse;

}