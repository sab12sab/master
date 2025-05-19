// pages/produit.js ou pages/produit.jsx
import React from 'react';
import SectionProduit from '@/Component/component_Produit/SectionProduit';
import Navbar from '@/Component/component_home/Navbar';
import Footer from '@/Component/component_home/Footer';

export default function Produit() {
  return (
    <div>
    <Navbar></Navbar>
    <SectionProduit></SectionProduit>
    <Footer></Footer>  
    </div>
  );
}