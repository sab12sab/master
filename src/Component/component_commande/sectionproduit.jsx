import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Produit_D({ id }) {
  const [data_d, setdata] = useState({});
  const [quantite, setQuantite] = useState("");
  const [messageErreur, setMessageErreur] = useState("");

  const id_user = localStorage.getItem("id");
  const etat = "valide";
 

  const commande = async () => {
    const qte = parseInt(quantite);
   if (!qte || qte <= 0) {
      setMessageErreur("Entrez une quantité valide");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/commande/creation_commande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantite: parseInt(quantite),
          etat_commande: etat,
          user_id: id_user,
          produit_id: id
        })
      });
      console.log(response)
      const result = await response.json();
      if (response.ok) {
        alert("Commande créée avec succès !");
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      alert("Une erreur est survenue : " + error.message);
    }
  };

  const get_produit_by_id = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/getproduit_by_id/${id}`);
      const data = await response.json();
      setdata(data.products[0]);
    } catch (err) {
      console.error("Erreur de chargement du produit", err);
    }
  };

  useEffect(() => {
    get_produit_by_id(id);
  }, [id]);

  return (
    <section className="w-full space-x-2 h-120 flex">
      <div className="w-1/2 relative space-y-5 flex-col p-10 flex h-full">
        <h1 className="absolute text-7xl z-0 font-black text-gray-400/20">Golden Spark</h1>
        <h1 className="text-xl">Golden Spark</h1>
        <h1 className="text-2xl font-bold">{data_d.name}</h1>
        <h1 className="text-3xl font-medium">{data_d.price}Dh</h1>
        <p>{data_d.description}</p>
        <p className="text-xl">{data_d.stock} en stock</p>
        <p>
          {data_d.stock > 0 ? (
            <span className="bg-green-400 p-2 rounded-2xl text-white">Disponible</span>
          ) : (
            <span className="bg-red-400 p-2 rounded-2xl text-white">Indisponible</span>
          )}
        </p>
        <div className="flex flex-col">
          <label>Saisis la quantité</label>
          <div className="w-52 max-w-52">
            <Input
              type="number"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
            />
          </div>
          {messageErreur && <p className="text-red-500" id="message">{messageErreur}</p>}
        </div>
        <div>
          <Button onClick={commande}>Valider la commande</Button>
        </div>
      </div>
      <div className="w-1/2 pt-5 pb-5 justify-center h-full flex">
        <img src={`/${data_d.image}`} alt={data_d.name} />
      </div>
    </section>
  );
}
