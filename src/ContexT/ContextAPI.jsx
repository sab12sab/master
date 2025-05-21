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
  const get_category=async()=>{
    try{
      const response=await categroy.Get_all_category();
      console.log(response)
    }catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  const login= async ({email, password}) => {
    setLoading(true);
    try {
      const response = await auth.Login(email, password);
      setUser(response.data.user);
      setError(null);
      console.log(response)
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
    <AuthContext.Provider value={{user, login, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
};
