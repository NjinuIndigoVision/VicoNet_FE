import axios from "axios";

function uploadImage(){
axios.post("https://param-hr-be-dev.azurewebsites.net/Personnel/AddPersonnel", formData, config)
.then((response:any) => {
    console.log("response", response);
    setId(response.data.data.id);
    setUserId(response.data.data.user.id);
    setcvUrl(response.data.cv)
    setMastersUrl(response.data.masters);
    setDegreeUrl(response.data.degree);
    toast.update(_id, { render: "Saved successfully", type: "success", isLoading: false });
    handleComplete();
    
    
})
.catch((error:any) => {
  toast.update(_id, { render: "All is good", type: "success", isLoading: false });
    console.log(error);
});

}
