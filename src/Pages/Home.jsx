import Section1_home from "../Component/component_home/Section1_home";
import Navbar from "../Component/component_home/Navbar"; // Chemin corrigé
import SectionCategories from "@/Component/component_home/SectionCategories";
import SectionAccueil from "@/Component/component_home/SectionAccueil";
import Footer from "@/Component/component_home/Footer";
import ClientReviews from "@/Component/component_home/ClientReviews";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/ContexT/ContextAPI";
export default function Home() {

    
    
    return (
        <>
        <Navbar></Navbar>
        <SectionAccueil></SectionAccueil>
        <SectionCategories></SectionCategories>
        <ClientReviews></ClientReviews>
        <Footer></Footer>
        </>
    )
}