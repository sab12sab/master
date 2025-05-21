import axiosInstance from "./apiServices";
export const Get_all_category=()=>{
       return axiosInstance.get("/category/")
}