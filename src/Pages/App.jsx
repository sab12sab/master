import React, { useState } from 'react';
import RegistrationPage from './RegistrationPage';

const App = () => {
  // États pour gérer les modales
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // Fonction pour ouvrir la page d'inscription
  const openRegistrationPage = () => {
    setIsLoginOpen(false);
    setIsRegistrationOpen(true);
  };

  // Fonction pour gérer le succès de l'inscription
  const handleRegistrationSuccess = () => {
    setIsRegistrationOpen(false);
    setIsLoginOpen(true);
    // Vous pourriez ajouter une notification de succès ici
  };

  // Fonction pour fermer la page d'inscription et revenir à la connexion
  const closeRegistrationAndOpenLogin = () => {
    setIsRegistrationOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div>
      {/* Votre contenu principal ici */}
      
      {/* Bouton pour ouvrir la modale de connexion */}
      <button onClick={() => setIsLoginOpen(true)} className="bg-yellow-600 text-white px-4 py-2 rounded">
        Mon Compte
      </button>
      
      {/* Modale de connexion */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mon Compte</h2>
              <button onClick={() => setIsLoginOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Connexion</h3>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                  <button className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors">
                    Se connecter
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <a href="#" className="text-sm text-yellow-600 hover:underline">Mot de passe oublié ?</a>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Pas encore de compte ?</h3>
                <button 
                  onClick={openRegistrationPage} 
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Créer un compte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Page d'inscription */}
      {isRegistrationOpen && (
        <RegistrationPage 
          onClose={closeRegistrationAndOpenLogin}
          onRegisterSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
};


export default App;