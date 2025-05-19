// ClientReviews.jsx
import React, { useState } from 'react';

export default function ClientReviews() {
    // Données des avis clients
    const avis = [
        { 
            id: 1, 
            nom: "Marie Dupont", 
            note: 5, 
            commentaire: "J'adore ma rivière en diamants, elle est magnifique et parfaitement réalisée !",
            image: "photos/golden_spark/personnes/téléchargement (1).jpg",
            produit: "Rivière en diamants"
        },
        { 
            id: 2, 
            nom: "Thomas Laurent", 
            note: 5, 
            commentaire: "Service impeccable et bijou de grande qualité. Ma femme est ravie de son bracelet !",
            image: "photos/golden_spark/personnes/téléchargement.jpg",
            produit: "Bracelet en or blanc"
        },
        { 
            id: 3, 
            nom: "Sophie Moreau", 
            note: 4, 
            commentaire: "Une bague splendide qui attire tous les regards. Merci pour votre professionnalisme.",
            image: "photos/golden_spark/personnes/téléchargement (4).jpg",
            produit: "Bague saphir et diamants"
        },
        { 
            id: 4, 
            nom: "Jean Petit", 
            note: 5, 
            commentaire: "Les boucles d'oreilles sont encore plus belles que sur les photos. Un grand merci !",
            image: "photos/golden_spark/personnes/téléchargement (2).jpg",
            produit: "Boucles d'oreilles pendantes"
        },
        { 
            id: 5, 
            nom: "Camille Martin", 
            note: 5, 
            commentaire: "Je ne retire plus mon collier, il est parfait pour toutes les occasions !",
            image: "photos/golden_spark/personnes/ABC.jpg",
            produit: "Collier or rose"
        },
        { 
            id: 6, 
            nom: "Alexandre Dubois", 
            note: 4, 
            commentaire: "Livraison rapide et emballage soigné. La hand chain est superbe.",
            image: "photos/golden_spark/personnes/téléchargement (3).jpg",
            produit: "Hand chain argent"
        },
    ];

    // État pour le défilement
    const [startIndex, setStartIndex] = useState(0);
    
    // Nombre d'avis à afficher à la fois (ajustable selon votre design)
    const nombreAvisVisible = 3;

    // Fonction pour afficher les avis précédents
    const afficherPrecedents = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    // Fonction pour afficher les avis suivants
    const afficherSuivants = () => {
        if (startIndex < avis.length - nombreAvisVisible) {
            setStartIndex(startIndex + 1);
        }
    };

    // Fonction pour générer les étoiles basées sur la note
    const genererEtoiles = (note) => {
        const etoiles = [];
        for (let i = 1; i <= 5; i++) {
            etoiles.push(
                <svg 
                    key={i} 
                    className={`w-4 h-4 ${i <= note ? "text-yellow-500" : "text-gray-300"}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return etoiles;
    };

    // Avis visibles actuellement
    const avisVisibles = avis.slice(startIndex, startIndex + nombreAvisVisible);

    return (
        <section className="bg-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
                    Ce que nos clients disent
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Découvrez l'expérience de nos clients avec nos bijoux
                </p>

                <div className="relative">
                    {/* Bouton précédent */}
                    <button 
                        onClick={afficherPrecedents}
                        disabled={startIndex === 0}
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${startIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Avis clients */}
                    <div className="flex space-x-4 overflow-hidden py-4">
                        {avisVisibles.map((avis) => (
                            <div 
                                key={avis.id}
                                className="flex-none w-full sm:w-1/2 md:w-1/3 bg-gray-50 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                            >
                                <div className="flex items-center mb-4">
                                    <img 
                                        src={avis.image} 
                                        alt={`Avatar de ${avis.nom}`} 
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{avis.nom}</h3>
                                        <p className="text-sm text-gray-500">{avis.produit}</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {genererEtoiles(avis.note)}
                                </div>
                                <p className="text-gray-700 italic">"{avis.commentaire}"</p>
                            </div>
                        ))}
                    </div>

                    {/* Bouton suivant */}
                    <button 
                        onClick={afficherSuivants}
                        disabled={startIndex >= avis.length - nombreAvisVisible}
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md ${startIndex >= avis.length - nombreAvisVisible ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Indicateurs de pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {avis.slice(0, avis.length - nombreAvisVisible + 1).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setStartIndex(index)}
                            className={`w-2 h-2 rounded-full ${startIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
                            aria-label={`Voir les avis à partir de ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}