import React, { createContext, useState } from 'react';
import * as auth from '../Services/userServices';
import { User } from 'lucide-vue-next';
export const AuthContext = createContext();
import * as categroy from '../Services/categoryServices'
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [category,setcategory]=useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const signup_h=async({firstName,lastName,email,password,isAdmin})=>{
    try{
      
      const response=await auth.signup(firstName,lastName,email,password,isAdmin);
      console.log(response)
      if(response.status===201){
        window.location.href="/"
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
      console.log(response)
      setUser(response.data)
      if(response.status===200 ){
        if (response.data.isAdmin){
          window.location.href="/dashboard";
        }else{
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
    <AuthContext.Provider value={{user, login,signup_h, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
};
