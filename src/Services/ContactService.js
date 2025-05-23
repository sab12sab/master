import axiosInstance from "./apiServices";

export const Contact_Services=(nom,email,description)=>{
    return axiosInstance.post("/contact/contact_admin",{
        nom:nom,
        email:email,
        description:description
    })
}