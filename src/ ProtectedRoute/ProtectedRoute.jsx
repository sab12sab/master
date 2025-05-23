import { AuthContext } from "@/ContexT/ContextAPI";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const etat=localStorage.getItem("isAdmin")
    if(etat==="true"){
        return children
    }
    else{
        return <Navigate to="/login"></Navigate>
    }
}