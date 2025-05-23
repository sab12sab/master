import axiosInstance from "./apiServices";
export const commande=(quantite,etat_commande,user_id,produit_id)=>{
    return axiosInstance.post("/commande/creation_commande",{
    quantite:quantite,
    etat_commande:etat_commande,
    user_id:user_id,
    produit_id:produit_id
    })
}