import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AdminNav() {
    // États pour gérer l'ouverture des modales
    const [profileOpen, setProfileOpen] = useState(false);
    const [contrastEnabled, setContrastEnabled] = useState(false);

    // Fonction pour fermer toutes les modales
    const closeAllModals = () => {
        setProfileOpen(false);
    };

    // Fonction pour ouvrir/fermer le modal profil
    const toggleProfileModal = () => {
        setProfileOpen(prev => !prev);
    };

    // Fonction pour activer/désactiver le contraste
    const toggleContrast = () => {
        setContrastEnabled(prev => !prev);
        // Ajout ou suppression de la classe high-contrast
        document.body.classList.toggle('high-contrast');
    };

    return (
        <nav className="w-full h-auto">
            {/* Bannière supérieure */}
            <div className="w-full bg-black py-2">
                <div className="flex justify-center items-center px-8 md:px-16 lg:px-24">
                    <div className="text-sm font-medium text-white">LIVRAISON PARTOUT AU MAROC</div>
                </div>
            </div>
            
            {/* Barre principale avec logo au centre */}
            <div className="w-full py-3 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Section gauche - Texte "GOLDEN SPARK" */}
                        <div className="flex-1 flex justify-start">
                            <div className="text-xl font-semibold tracking-wider">GOLDEN SPARK</div>
                        </div>
                        
                        {/* Section centrale - Logo */}
                        <div className="flex-1 flex justify-center">
                            <div className="h-14 flex items-center">
                                <img 
                                    src="photos/bague.png" 
                                    alt="Golden Spark Logo" 
                                    className="h-full" 
                                />
                            </div>
                        </div>
                        
                        {/* Section droite - Bouton profil */}
                        <div className="flex-1 flex justify-end space-x-6">
                            <button 
                                aria-label="Compte" 
                                className="text-gray-800 hover:text-yellow-600 transition-colors"
                                onClick={toggleProfileModal}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Barre de menu navigation */}
            <div className="w-full bg-white py-2 border-t border-b border-gray-200">
                <div className="flex justify-center">
                    <nav className="flex space-x-12">
                        <Link to="/dashboard" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Dashboard</Link>
                        <Link to="/admin_prod" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Gestion Produit</Link>
                        <Link to="/admin" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Gestion Catégorie</Link>
                        <Link to="/commande" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Commandes </Link>
                    </nav>
                </div>
            </div>
            
            {/* Bouton de déconnexion */}
{profileOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mon Compte</h2>
        <button onClick={toggleProfileModal} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-4">
        <button 
          onClick={() => {
            // Logique de déconnexion ici (si nécessaire)
            // Par exemple: clearUserSession(), removeToken(), etc.
            
            // Fermer le modal
            toggleProfileModal();
            localStorage.clear();

            // Rediriger vers la page d'accueil
            window.location.href = "/";
            // Alternative avec React Router:
            // navigate("/");
          }}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
)}
        </nav>
    );
}