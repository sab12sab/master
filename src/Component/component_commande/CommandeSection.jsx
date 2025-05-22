import { useState, useEffect } from 'react';

const CommandeSection = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCommande, setEditingCommande] = useState(null);
  const [formData, setFormData] = useState({
    etat_commande: 'en_attente',
    client_nom: '',
    client_prenom: '',
    client_telephone: '',
    produits: [{ nom: '', quantite: 1, prix: 0 }]
  });

  // Données d'exemple
  useEffect(() => {
    const exemplesCommandes = [
      {
        id: 1,
        quantite: 2,
        etat_commande: 'en_attente',
        date: '2024-05-20',
        user_id: 1,
        user: { nom: 'Jean Dupont', email: 'jean@email.com' },
        produit_id: 1,
        produit: { nom: 'Smartphone XY', prix: 299.99 }
      },
      {
        id: 2,
        quantite: 1,
        etat_commande: 'validee',
        date: '2024-05-20',
        user_id: 1,
        user: { nom: 'Jean Dupont', email: 'jean@email.com' },
        produit_id: 2,
        produit: { nom: 'Écouteurs Bluetooth', prix: 89.99 }
      },
      {
        id: 3,
        quantite: 3,
        etat_commande: 'livree',
        date: '2024-05-21',
        user_id: 2,
        user: { nom: 'Marie Martin', email: 'marie@email.com' },
        produit_id: 3,
        produit: { nom: 'Chargeur USB-C', prix: 25.50 }
      }
    ];

    const commandesGroupees = grouperCommandes(exemplesCommandes);
    setCommandes(commandesGroupees);
    setLoading(false);
  }, []);

  const grouperCommandes = (lignesCommandes) => {
    const commandesMap = new Map();
    
    lignesCommandes.forEach(ligne => {
      const key = `${ligne.user_id}_${ligne.date}`;
      
      if (commandesMap.has(key)) {
        commandesMap.get(key).produits.push({
          id: ligne.produit_id,
          nom: ligne.produit?.nom || 'Produit non trouvé',
          quantite: ligne.quantite,
          prix: ligne.produit?.prix || 0
        });
      } else {
        commandesMap.set(key, {
          id: ligne.id,
          etat_commande: ligne.etat_commande,
          client_nom: ligne.user?.nom?.split(' ')[1] || 'Nom',
          client_prenom: ligne.user?.nom?.split(' ')[0] || 'Prénom',
          client_telephone: ligne.user?.telephone || '06 12 34 56 78',
          produits: [{
            id: ligne.produit_id,
            nom: ligne.produit?.nom || 'Produit non trouvé',
            quantite: ligne.quantite,
            prix: ligne.produit?.prix || 0
          }]
        });
      }
    });
    
    return Array.from(commandesMap.values());
  };

  const getStatutColor = (etat) => {
    switch (etat) {
      case 'en_attente':
        return 'bg-orange-100 text-orange-800';
      case 'validee':
        return 'bg-blue-100 text-blue-800';
      case 'livree':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatut = (etat) => {
    switch (etat) {
      case 'en_attente':
        return 'En attente';
      case 'validee':
        return 'Validée';
      case 'livree':
        return 'Livrée';
      default:
        return 'Non défini';
    }
  };

  const handleAjouterCommande = () => {
    setEditingCommande(null);
    setFormData({
      etat_commande: 'en_attente',
      client_nom: '',
      client_prenom: '',
      client_telephone: '',
      produits: [{ nom: '', quantite: 1, prix: 0 }]
    });
    setShowForm(true);
  };

  const handleModifierCommande = (commande) => {
    setEditingCommande(commande);
    setFormData({
      etat_commande: commande.etat_commande,
      client_nom: commande.client_nom,
      client_prenom: commande.client_prenom,
      client_telephone: commande.client_telephone,
      produits: commande.produits
    });
    setShowForm(true);
  };

  const handleSauvegarder = () => {
    if (editingCommande) {
      // Modifier commande existante
      setCommandes(commandes.map(cmd => 
        cmd.id === editingCommande.id 
          ? { ...cmd, ...formData }
          : cmd
      ));
    } else {
      // Ajouter nouvelle commande
      const nouvelleCommande = {
        id: Math.max(...commandes.map(c => c.id), 0) + 1,
        ...formData
      };
      setCommandes([...commandes, nouvelleCommande]);
    }
    setShowForm(false);
    setEditingCommande(null);
  };

  const ajouterProduit = () => {
    setFormData({
      ...formData,
      produits: [...formData.produits, { nom: '', quantite: 1, prix: 0 }]
    });
  };

  const supprimerProduit = (index) => {
    setFormData({
      ...formData,
      produits: formData.produits.filter((_, i) => i !== index)
    });
  };

  const modifierProduit = (index, champ, valeur) => {
    const nouveauxProduits = [...formData.produits];
    nouveauxProduits[index] = { ...nouveauxProduits[index], [champ]: valeur };
    setFormData({ ...formData, produits: nouveauxProduits });
  };

  const supprimerCommande = (commandeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      setCommandes(commandes.filter(commande => commande.id !== commandeId));
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center py-8">
          <p>Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Commandes</h2>
        <button 
          onClick={handleAjouterCommande}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Ajouter Commande
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingCommande ? 'Modifier la commande' : 'Ajouter une nouvelle commande'}
            </h3>
            
            {/* Informations client */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.client_nom}
                  onChange={(e) => setFormData({...formData, client_nom: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nom du client"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  value={formData.client_prenom}
                  onChange={(e) => setFormData({...formData, client_prenom: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Prénom du client"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={formData.client_telephone}
                  onChange={(e) => setFormData({...formData, client_telephone: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Statut */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={formData.etat_commande}
                onChange={(e) => setFormData({...formData, etat_commande: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="en_attente">En attente</option>
                <option value="validee">Validée</option>
                <option value="livree">Livrée</option>
              </select>
            </div>

            {/* Produits */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Produits</label>
                <button
                  onClick={ajouterProduit}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Ajouter Produit
                </button>
              </div>
              
              {formData.produits.map((produit, index) => (
                <div key={index} className="border border-gray-200 rounded p-3 mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Nom du produit"
                      value={produit.nom}
                      onChange={(e) => modifierProduit(index, 'nom', e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Quantité"
                      value={produit.quantite}
                      onChange={(e) => modifierProduit(index, 'quantite', parseInt(e.target.value) || 1)}
                      className="p-2 border border-gray-300 rounded"
                      min="1"
                    />
                    <input
                      type="number"
                      placeholder="Prix"
                      value={produit.prix}
                      onChange={(e) => modifierProduit(index, 'prix', parseFloat(e.target.value) || 0)}
                      className="p-2 border border-gray-300 rounded"
                      step="0.01"
                      min="0"
                    />
                    <button
                      onClick={() => supprimerProduit(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      disabled={formData.produits.length === 1}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleSauvegarder}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des Commandes */}
      <div className="space-y-4">
        {commandes.map((commande, index) => (
          <div key={`commande_${commande.id}_${index}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* En-tête avec informations client */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Commande #{commande.id}</h3>
                  <p className="text-gray-600 text-sm">
                    {commande.client_prenom} {commande.client_nom}
                  </p>
                  <p className="text-gray-500 text-sm">{commande.client_telephone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(commande.etat_commande)}`}>
                  {formatStatut(commande.etat_commande)}
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleModifierCommande(commande)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => supprimerCommande(commande.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>

            {/* Produits */}
            <div className="bg-gray-50 rounded p-3">
              <h4 className="font-medium text-gray-700 mb-2">Produits:</h4>
              <div className="space-y-2">
                {commande.produits.map((produit, produitIndex) => (
                  <div key={`${produit.id}_${produitIndex}`} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 flex-1">{produit.nom}</span>
                    <span className="text-gray-600 mx-4">Qté: {produit.quantite}</span>
                    <span className="text-gray-800 font-medium">
                      {(produit.prix * produit.quantite).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucune commande */}
      {commandes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Aucune commande trouvée</p>
          <button 
            onClick={handleAjouterCommande}
            className="mt-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            Créer votre première commande
          </button>
        </div>
      )}
    </div>
  );
};

export default CommandeSection;