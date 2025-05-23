import React, { createContext, useEffect, useState } from 'react';
import * as auth from '../Services/userServices';
import * as contact from '../Services/ContactService'
import { User } from 'lucide-vue-next';

export const AuthContext = createContext();
import * as categroy from '../Services/categoryServices'
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [category,setcategory]=useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
  console.log('user a changé:', user);
}, [user])
  const cree_contact=async({nom,email,description})=>{
      alert("h")
       try{
        const response=await contact.Contact_Services(nom,email,description);
         console.log(response)
       }catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  const signup_h=async({firstName,lastName,email,password,isAdmin})=>{
    try{
      
      const response=await auth.signup(firstName,lastName,email,password,isAdmin);
      console.log(response)
      if(response.status===201){
        window.location.href="/login"
      }else{
        alert("none")
      }
    }catch (err){

       console.log(err)
    } finally {
      setLoading(false);
    }
  }
  const login= async ({email, password}) => {
    setLoading(true);
    
    try {
      const response = await auth.Login(email, password);
      if(response.status===200 ){
        setUser(response.data.isAdmin)
        if (response.data.isAdmin){
         localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("id", response.data.id_user);
          window.location.href="/dashboard";
        }else{
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("id", response.data.id_user);
          window.location.href="/"
        }
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{user, login,signup_h,cree_contact, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
};
