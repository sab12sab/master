import axiosInstance from "./apiServices";
export const Get_all_category=()=>{
       return axiosInstance.get("/category/")
}
export const get_category_by_id=(id)=>{
       return axiosInstance.get(`/category/${id}`)
}