import axiosInstance from "./apiServices";
export const Login=(email,password)=>{
    return axiosInstance.post("/auth/login",{
        email:email,
        password:password
    })
}
export const test=()=>{
    return axiosInstance.get("/teste/test")
}
export const signup=(firstName,lastName,email,password,isAdmin)=>{
    return axiosInstance.post("/auth/signup",{
        firstname:firstName,
        lastname:lastName,
        email:email,
        password:password,
        isAdmin:isAdmin
    })
}
