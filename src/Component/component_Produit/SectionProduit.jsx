import React, { useEffect, useState } from "react";

export default function SectionProduit() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // État pour la catégorie sélectionnée (par défaut "Tous")
  const [categorieSelectionnee, setCategorieSelectionnee] = useState("Tous");

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/category/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.categories);
      setCategories(data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/products/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/products/category/${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products by category:", err);
      setError(err.message);
      setProducts([]); // Réinitialiser les produits en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  // Gérer le changement de catégorie
  const handleCategoryChange = (categoryName) => {
    setCategorieSelectionnee(categoryName);
    
    if (categoryName === "Tous") {
      fetchAllProducts();
    } else {
      // Trouver l'ID de la catégorie sélectionnée
      const selectedCategory = categories.find(cat => cat.name === categoryName);
      if (selectedCategory) {
        fetchProductsByCategory(selectedCategory.id);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête de la page */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Nos Produits
          </h1>
        </div>
      </header>

      {/* Section des catégories (filtres) */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Filtrer par catégorie
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {/* Bouton "Tous" */}
            <button
              onClick={() => handleCategoryChange("Tous")}
              disabled={loading}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  categorieSelectionnee === "Tous"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              Tous
            </button>

            {/* Boutons pour chaque catégorie */}
            {categories.map((categorie) => (
              <button
                key={categorie.id}
                onClick={() => handleCategoryChange(categorie.name)}
                disabled={loading}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    categorieSelectionnee === categorie.name
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {categorie.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des produits */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {categorieSelectionnee === "Tous"
              ? "Tous nos produits"
              : `Catégorie: ${categorieSelectionnee}`}
            <span className="text-gray-500 text-lg ml-2">
              ({products.length} produits)
            </span>
          </h2>

          {/* Affichage de l'erreur */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Erreur: {error}
            </div>
          )}

          {/* Indicateur de chargement */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-500">Chargement des produits...</p>
            </div>
          )}

          {/* Affichage des produits */}
          {!loading && products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Aucun produit trouvé dans cette catégorie.
              </p>
            </div>
          ) : !loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((produit) => (
                <div key={produit.id} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="relative pb-[100%] overflow-hidden">
                      <img
                        src={produit.image}
                        alt={produit.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {produit.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {produit.category ? produit.category.name : 'Catégorie non définie'}
                      </p>
                      <p className="text-gray-900 font-bold">
                        {produit.price} €
                      </p>
                      <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors">
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}