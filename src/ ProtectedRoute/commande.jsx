import { Navigate } from "react-router-dom"

export default function Commande_Pro({children}){
    const etat=localStorage.getItem("isAdmin")
    if(etat==="false"){
        return children
    }
    return <Navigate to="/login"></Navigate>
}