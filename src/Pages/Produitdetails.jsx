import Produit_D from "@/Component/component_commande/sectionproduit";
import Footer from "@/Component/component_home/Footer";
import Navbar from "@/Component/component_home/Navbar";
import { useParams } from 'react-router-dom';

export default function Porduit_deatils(){
    const { id } = useParams();
    return(
        <>
         <section>
            <Navbar></Navbar>
            <Produit_D id={id}></Produit_D>
            <Footer></Footer>
         </section>
        </>
    )
}