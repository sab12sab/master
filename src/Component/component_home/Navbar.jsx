import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
export default function Navbar() {
    // États pour gérer l'ouverture des modales
    const [searchOpen, setSearchOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [contrastEnabled, setContrastEnabled] = useState(false);
    const [articleDropdownOpen, setArticleDropdownOpen] = useState(false);
    const [etat_o,setetat]=useState()
    const naviaget=useNavigate()
    // Fonction pour fermer toutes les modales
    const closeAllModals = () => {
        setSearchOpen(false);
        setFavoritesOpen(false);
        setCartOpen(false);
        setProfileOpen(false);
    };
 useEffect(() => {
  const item = localStorage.getItem("isAdmin");
  console.log("isAdmin in localStorage:", item);
  const isAdmin = item === "true";
  setetat(isAdmin);
}, []);


    // Fonction pour ouvrir une modale spécifique
    const toggleModal = (modal) => {
        closeAllModals();
        switch(modal) {
            case 'search':
                setSearchOpen(prev => !prev);
                break;
            case 'favorites':
                setFavoritesOpen(prev => !prev);
                break;
            case 'cart':
                setCartOpen(prev => !prev);
                break;
            case 'profile':
                setProfileOpen(prev => !prev);
                break;
            default:
                break;
        }
    };

    // Fonction pour activer/désactiver le contraste
    const toggleContrast = () => {
        setContrastEnabled(prev => !prev);
        // Ici, vous pourriez ajouter du code pour modifier le contraste de toute la page
        if (!contrastEnabled) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    };

    return (
        <>
           <nav className='w-full h-auto'>
            <div className="w-full bg-black py-2">
                <div className="flex justify-center items-center px-8 md:px-16 lg:px-24">
                    <div className="text-sm font-medium text-white">LIVRAISON PARTOUT AU MAROC</div>
                </div>
            </div>
            
            {/* Barre principale - tout sur une même ligne avec logo au centre */}
            <div className="w-full py-3 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Section gauche - Texte "GOLDEN SPARK" */}
                        <div className="flex-1 flex justify-start">
                            <div className="text-xl font-semibold tracking-wider">GOLDEN SPARK</div>
                        </div>
                        
                        {/* Section centrale - Logo */}
                        <div className="flex-1 flex justify-center">
                            {/* Logo Golden Spark avec taille moyenne */}
                            <div className="h-14 flex items-center">
                                <img 
                                    src="/photos/bague.png" 
                                    alt="Golden Spark Logo" 
                                    className="h-full" 
                                />
                            </div>
                        </div>
                        
                        {/* Section droite - Boutons d'action */}
                        <div className="flex-1 flex justify-end space-x-6">
                            {/* Bouton Recherche */}
                            <button 
                                aria-label="Recherche" 
                                className="text-gray-800 hover:text-yellow-600 transition-colors relative"
                                onClick={() => toggleModal('search')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            
                            {/* Bouton Favoris */}
                            <button 
                                aria-label="Favoris" 
                                className="text-gray-800 hover:text-yellow-600 transition-colors relative"
                                onClick={() => toggleModal('favorites')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {/* Badge si des favoris sont présents */}
                                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
                            </button>
                            
                            {/* Bouton Panier */}
                            <button 
                                aria-label="Panier" 
                                className="text-gray-800 hover:text-yellow-600 transition-colors relative"
                                onClick={() => toggleModal('cart')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {/* Badge si des articles sont dans le panier */}
                                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
                            </button>
                            
                            {/* Bouton Profil */}
                            <button 
                                aria-label="Compte" 
                                className="text-gray-800 hover:text-yellow-600 transition-colors"
                                onClick={(e) =>{e.preventDefault();naviaget("/login")}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                       {!etat_o ? (
  <Button
    className="bg-red-500"
    onClick={(e) => {
      e.preventDefault();
      localStorage.clear();
      alert("deconnecte")
    }}
  >
    <LogOut />
  </Button>
) : null}


                        </div>
                    </div>
                </div>
            </div>
            
            {/* Barre de menu navigation */}
            <div className="w-full bg-white py-2 border-t border-b border-gray-200">
                <div className="flex justify-center">
                    <nav className="flex space-x-12">
                        <Link to="/" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Home</Link>
                        <Link to="/produit" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Produit</Link>
                        <Link to="/histoire" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">Histoire</Link>
                        <Link to="/contact" className="text-sm tracking-widest hover:text-yellow-600 transition-colors font-medium">CONTACT</Link>
                    </nav>
                </div>
            </div>
            
            {/* Modales pour chaque fonctionnalité */}
            {/* Modal de recherche */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Rechercher</h2>
                            <button onClick={() => setSearchOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4">
                            <input 
                                type="text" 
                                placeholder="Que recherchez-vous ?" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                autoFocus
                            />
                            <button className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors">
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Les autres modales restent inchangées */}
            {favoritesOpen && (
                /* Contenu modal favoris inchangé */
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Mes Favoris</h2>
                            <button onClick={() => setFavoritesOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center space-x-4 border-b pb-4">
                                <div className="w-16 h-16 bg-gray-200"></div>
                                <div>
                                    <h3 className="font-medium">Projet A</h3>
                                    <p className="text-sm text-gray-600">Développement Web</p>
                                </div>
                                <button className="ml-auto text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-200"></div>
                                <div>
                                    <h3 className="font-medium">Projet B</h3>
                                    <p className="text-sm text-gray-600">Design UX/UI</p>
                                </div>
                                <button className="ml-auto text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {cartOpen && (
                /* Contenu modal panier inchangé */
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Mon Panier</h2>
                            <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center space-x-4 border-b pb-4">
                                <div className="w-16 h-16 bg-gray-200"></div>
                                <div>
                                    <h3 className="font-medium">Service Premium</h3>
                                    <p className="text-sm text-gray-600">1 × 1500€</p>
                                </div>
                                <button className="ml-auto text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center space-x-4 border-b pb-4">
                                <div className="w-16 h-16 bg-gray-200"></div>
                                <div>
                                    <h3 className="font-medium">Design Personnalisé</h3>
                                    <p className="text-sm text-gray-600">1 × 800€</p>
                                </div>
                                <button className="ml-auto text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-200"></div>
                                <div>
                                    <h3 className="font-medium">Maintenance</h3>
                                    <p className="text-sm text-gray-600">1 × 300€</p>
                                </div>
                                <button className="ml-auto text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>2600€</span>
                                </div>
                                <button className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors">
                                    Commander
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
          
            </nav>
        </>
    )
}