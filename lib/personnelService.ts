import axios from "axios";
import { IPersonnel, IPersonnelRequestModel } from "./interfaces/personnel";
import { Api } from "./api/endpoints";

export function uploadCV(formData: FormData){

    const config = {     
        headers: { 'content-type': 'multipart/form-data',  "Access-Control-Allow-Origin": "*"},
        
    }
    axios.post("http://localhost:8080/api/upload_cv/1", formData, config)
    .then((response:any) => {
        console.log("response", response);      
        
    })
    .catch((error:any) => {

        console.log(error);
    });


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