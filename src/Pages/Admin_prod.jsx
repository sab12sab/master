// pages/Admin_prod.jsx
import React from 'react';
import Admin_prod from '@/Component/component_admin/Admin_prod';
import Footer from '@/Component/component_home/Footer';
import AdminNav from '@/Component/component_admin/AdminNav';

const AdminProdPage = () => {
  return (
    <div>
       <AdminNav></AdminNav> 
      <Admin_prod></Admin_prod>
     
      <Footer></Footer>
    </div>
  );
}

export default AdminProdPage;