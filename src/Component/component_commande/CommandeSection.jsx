import { useState, useEffect } from 'react';

const CommandeSection = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);

  const recuperelescommande = async () => {
    try {
      const response = await fetch("http://localhost:5000/commande/get_commande");
      const data = await response.json();
      setCommandes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  };

  useEffect(() => {
    recuperelescommande();
  }, []);

  // Fonction pour mettre à jour l'état d'une commande
  const updateEtatCommande = async (id, newEtat) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/commande/update_etat_commande/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ etat_commande: newEtat }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        recuperelescommande(); // rafraîchir la liste
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Ajouter Commande
        </button>
      </div>

      {commandes.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <table className="w-full table-auto border-0">
          <thead>
            <tr>
              <th className="px-4 py-2">ID Commande</th>
              <th className="px-4 py-2">Produit</th>
              <th className="px-4 py-2">Quantité</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">État</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((commande) => (
              <tr key={commande.commande_id} className="text-center border-t border-gray-300">
                <td className="px-4 py-2">{commande.commande_id}</td>
                <td className="px-4 py-2">{commande.produit.nom}</td>
                <td className="px-4 py-2">{commande.quantite}</td>
                <td className="px-4 py-2">{commande.total.toFixed(2)} Dh</td>
                <td className="px-4 py-2">{commande.user.nom} ({commande.user.email})</td>
                <td className="px-4 py-2">
                  <select
                    defaultValue={commande.etat_commande}
                    onChange={(e) => updateEtatCommande(commande.commande_id, e.target.value)}
                    disabled={loading}
                    className="border rounded px-2 py-1"
                  >
                    <option value="en attente">En attente</option>
                    <option value="en cours">En cours</option>
                    <option value="terminée">Terminée</option>
                    <option value="annulée">Annulée</option>
                  </select>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CommandeSection;
