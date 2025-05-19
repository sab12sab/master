import React, { useState } from 'react';

export default function Dashboard() {
  // Données initiales des statistiques
  const statistiquesInitiales = [
    { id: 1, titre: "Ventes mensuelles", valeur: 2450, icone: "/images/statistiques/ventes.svg", couleur: "bg-blue-500" },
    { id: 2, titre: "Nouveaux clients", valeur: 124, icone: "/images/statistiques/clients.svg", couleur: "bg-green-500" },
    { id: 3, titre: "Taux de conversion", valeur: 3.2, icone: "/images/statistiques/conversion.svg", couleur: "bg-purple-500" },
    { id: 4, titre: "Revenu total", valeur: 12680, icone: "/images/statistiques/revenu.svg", couleur: "bg-yellow-500" },
    { id: 5, titre: "Produits populaires", valeur: 18, icone: "/images/statistiques/produits.svg", couleur: "bg-red-500" },
    { id: 6, titre: "Commandes en attente", valeur: 8, icone: "/images/statistiques/commandes.svg", couleur: "bg-indigo-500" },
  ];

  // Données initiales des notifications
  const notificationsInitiales = [
    { id: 1, message: "Nouvelle commande #1024 reçue", date: "13/05/2025", lue: false },
    { id: 2, message: "Stock faible pour 'Bracelet Diamant'", date: "12/05/2025", lue: false },
    { id: 3, message: "Paiement reçu pour commande #1022", date: "11/05/2025", lue: true },
    { id: 4, message: "Nouveau commentaire sur produit 'Collier Or'", date: "10/05/2025", lue: true },
  ];

  // État pour gérer les statistiques
  const [statistiques, setStatistiques] = useState(statistiquesInitiales);
  
  // État pour gérer les notifications
  const [notifications, setNotifications] = useState(notificationsInitiales);
  
  // État pour la statistique en cours d'édition
  const [statistiqueEditee, setStatistiqueEditee] = useState(null);
  
  // État pour la nouvelle statistique
  const [nouvelleStatistique, setNouvelleStatistique] = useState({
    titre: "",
    valeur: 0,
    icone: "",
    couleur: "bg-gray-500"
  });

  // État pour afficher/masquer le formulaire d'ajout
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  
  // Générer un nouvel ID unique
  const genererNouvelId = () => {
    const idsExistants = statistiques.map(stat => stat.id);
    return Math.max(...idsExistants, 0) + 1;
  };
  
  // Gérer l'ajout d'une nouvelle statistique
  const ajouterStatistique = (e) => {
    e.preventDefault();
    
    if (!nouvelleStatistique.titre || nouvelleStatistique.valeur === undefined) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const nouvelId = genererNouvelId();
    const statistiqueCree = { 
      id: nouvelId, 
      titre: nouvelleStatistique.titre, 
      valeur: parseFloat(nouvelleStatistique.valeur),
      icone: nouvelleStatistique.icone,
      couleur: nouvelleStatistique.couleur
    };
    
    setStatistiques([...statistiques, statistiqueCree]);
    setNouvelleStatistique({ titre: "", valeur: 0, icone: "", couleur: "bg-gray-500" });
    setAfficherFormulaire(false);
  };
  
  // Gérer la modification d'une statistique
  const modifierStatistique = (e) => {
    e.preventDefault();
    
    if (!statistiqueEditee.titre || statistiqueEditee.valeur === undefined) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setStatistiques(
      statistiques.map(stat => 
        stat.id === statistiqueEditee.id ? {
          ...statistiqueEditee,
          valeur: parseFloat(statistiqueEditee.valeur)
        } : stat
      )
    );
    
    setStatistiqueEditee(null);
  };
  
  // Gérer la suppression d'une statistique
  const supprimerStatistique = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette statistique?")) {
      setStatistiques(statistiques.filter(stat => stat.id !== id));
    }
  };
  
  // Commencer à éditer une statistique
  const commencerEdition = (statistique) => {
    setStatistiqueEditee({ ...statistique });
  };
  
  // Annuler l'édition
  const annulerEdition = () => {
    setStatistiqueEditee(null);
  };

  // Gérer les changements dans le formulaire d'ajout
  const handleChangeNouvelleStatistique = (e) => {
    const { name, value } = e.target;
    setNouvelleStatistique({
      ...nouvelleStatistique,
      [name]: value
    });
  };
  
  // Gérer les changements dans le formulaire d'édition
  const handleChangeStatistiqueEditee = (e) => {
    const { name, value } = e.target;
    setStatistiqueEditee({
      ...statistiqueEditee,
      [name]: value
    });
  };

  // Marquer une notification comme lue
  const marquerCommeLue = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, lue: true } : notif
      )
    );
  };

  // Supprimer une notification
  const supprimerNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Calculer le nombre de notifications non lues
  const notificationsNonLues = notifications.filter(notif => !notif.lue).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête de la page */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Tableau de Bord
            </h1>
            <div className="relative">
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notificationsNonLues > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {notificationsNonLues}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Section principale */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grille des statistiques */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statistiques.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-4 ${stat.couleur}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">{stat.titre}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => commencerEdition(stat)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => supprimerStatistique(stat.id)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  {stat.icone && (
                    <div className="mr-4">
                      <img 
                        src={stat.icone || "/api/placeholder/40/40"} 
                        alt={stat.titre}
                        className="h-10 w-10 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/40/40";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-2xl font-bold">
                      {Number.isInteger(stat.valeur) ? stat.valeur : stat.valeur.toFixed(1)}
                      {stat.titre === "Taux de conversion" && "%"}
                      {stat.titre === "Revenu total" && "€"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carte pour ajouter une nouvelle statistique */}
          <div className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center p-6">
            <button
              onClick={() => setAfficherFormulaire(!afficherFormulaire)}
              className="text-gray-500 hover:text-gray-700 flex flex-col items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium">Ajouter une statistique</span>
            </button>
          </div>
        </div>

        {/* Formulaire d'ajout d'une nouvelle statistique */}
        {afficherFormulaire && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle statistique</h2>
            <form onSubmit={ajouterStatistique}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Titre</label>
                  <input
                    type="text"
                    name="titre"
                    value={nouvelleStatistique.titre}
                    onChange={handleChangeNouvelleStatistique}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Ventes hebdomadaires"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Valeur</label>
                  <input
                    type="number"
                    name="valeur"
                    value={nouvelleStatistique.valeur}
                    onChange={handleChangeNouvelleStatistique}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">URL de l'icône</label>
                  <input
                    type="text"
                    name="icone"
                    value={nouvelleStatistique.icone}
                    onChange={handleChangeNouvelleStatistique}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: /images/statistiques/ventes.svg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Couleur</label>
                  <select
                    name="couleur"
                    value={nouvelleStatistique.couleur}
                    onChange={handleChangeNouvelleStatistique}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bg-blue-500">Bleu</option>
                    <option value="bg-green-500">Vert</option>
                    <option value="bg-red-500">Rouge</option>
                    <option value="bg-yellow-500">Jaune</option>
                    <option value="bg-purple-500">Violet</option>
                    <option value="bg-indigo-500">Indigo</option>
                    <option value="bg-pink-500">Rose</option>
                    <option value="bg-gray-500">Gris</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAfficherFormulaire(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Formulaire d'édition */}
        {statistiqueEditee && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Modifier la statistique</h2>
            <form onSubmit={modifierStatistique}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Titre</label>
                  <input
                    type="text"
                    name="titre"
                    value={statistiqueEditee.titre}
                    onChange={handleChangeStatistiqueEditee}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Valeur</label>
                  <input
                    type="number"
                    name="valeur"
                    value={statistiqueEditee.valeur}
                    onChange={handleChangeStatistiqueEditee}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">URL de l'icône</label>
                  <input
                    type="text"
                    name="icone"
                    value={statistiqueEditee.icone}
                    onChange={handleChangeStatistiqueEditee}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Couleur</label>
                  <select
                    name="couleur"
                    value={statistiqueEditee.couleur}
                    onChange={handleChangeStatistiqueEditee}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bg-blue-500">Bleu</option>
                    <option value="bg-green-500">Vert</option>
                    <option value="bg-red-500">Rouge</option>
                    <option value="bg-yellow-500">Jaune</option>
                    <option value="bg-purple-500">Violet</option>
                    <option value="bg-indigo-500">Indigo</option>
                    <option value="bg-pink-500">Rose</option>
                    <option value="bg-gray-500">Gris</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={annulerEdition}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Section des notifications */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notifications récentes</h2>
            <span className="text-sm text-gray-500">{notifications.length} notification(s)</span>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {notifications.map((notif) => (
                <li key={notif.id} className={`p-4 ${!notif.lue ? 'bg-blue-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`h-2 w-2 rounded-full mr-2 ${!notif.lue ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                        <span className="text-sm text-gray-500">{notif.date}</span>
                      </div>
                      <p className="text-gray-900">{notif.message}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {!notif.lue && (
                        <button
                          onClick={() => marquerCommeLue(notif.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Marquer comme lue"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => supprimerNotification(notif.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {notifications.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Aucune notification disponible
            </div>
          )}
        </div>

        {/* Dernières activités - Graphique fictif */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Activité du site</h2>
          <div className="flex justify-between mb-2">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Visiteurs</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Commandes</span>
              </div>
            </div>
            <div>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
                <option>3 derniers mois</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500 text-sm">Graphique d'activité</p>
          </div>
        </div>
      </div>
    </div>
  );
}