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
export const signup=(name,email,password)=>{
    return axiosInstance.post("/signup",{
        name:name,
        email:email,
        password:password
    })
}
