// SectionCategories.jsx 
export default function SectionCategories() {
    // Données des catégories
    const categories = [
        { id: 1, nom: "Bracelets", image: "photos/golden_spark/chunky_bracelet/bracelet .jpg" },
        { id: 2, nom: "Bagues", image: "photos/golden_spark/ring/1.jpg" },
        { id: 3, nom: "Hand Chains", image: "/images/categories/hand-chains.jpg" },
        { id: 4, nom: "Boucles d'oreilles", image: "photos/golden_spark/earing/5.jpg" },
        { id: 5, nom: "Rivières", image: "/images/categories/rivieres.jpg" },
        { id: 6, nom: "Colliers", image: "/images/categories/colliers.jpg" },
        { id: 9, nom: "Boites", image: "/golden_spark/boite/1.jpg" },    
    ];
    
    // Fonction de navigation
    const navigateTo = (categorie) => {
        console.log(`Navigation vers la catégorie: ${categorie}`);
        // Dans un vrai projet: window.location.href = `/categorie/${categorie}`;
        // Ou avec React Router: navigate(`/categorie/${categorie}`);
    };
    
    return (
        <section className="bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">
                    Commander par catégories
                </h2>
                
                <div className="flex flex-nowrap overflow-x-auto pb-4 gap-3 scrollbar-hide">
                    {categories.map((categorie) => (
                        <div 
                            key={categorie.id}
                            className="group cursor-pointer flex-none"
                            onClick={() => navigateTo(categorie.nom.toLowerCase())}
                            style={{ width: "140px" }}
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-sm">
                                <img 
                                    src={categorie.image}
                                    alt={`Catégorie ${categorie.nom}`}
                                    className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-2">
                                    <h3 className="text-white font-medium text-xs text-center">
                                        {categorie.nom}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}