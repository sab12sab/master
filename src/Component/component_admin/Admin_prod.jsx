import React, { useEffect, useState } from "react";

export default function Admin_prod() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Données initiales des produits
  const produitsInitiaux = [
    {
      id: 1,
      nom: "Bracelet en or",
      prix: 199.99,
      categorie: "Bracelets",
      image: "/images/produits/bracelet-or.jpg",
      description: "Magnifique bracelet en or 18 carats",
      stock: 15,
    },
    {
      id: 2,
      nom: "Bague diamant",
      prix: 349.99,
      categorie: "Bagues",
      image: "/images/produits/bague-diamant.jpg",
      description: "Bague en or blanc avec diamant de 0.5 carat",
      stock: 8,
    },
    {
      id: 3,
      nom: "Collier perles",
      prix: 129.99,
      categorie: "Colliers",
      image: "/images/produits/collier-perles.jpg",
      description: "Collier de perles authentiques",
      stock: 12,
    },
  ];

  // Liste des catégories disponibles
  /* const categories = [
    "Bracelets",
    "Bagues",
    "Hand Chains",
    "Boucles d'oreilles",
    "Rivières",
    "Colliers",
    "Boites",
  ]; */

  // État pour gérer les produits
  const [produits, setProduits] = useState(produitsInitiaux);

  // État pour le produit en cours d'édition
  const [produitEdite, setProduitEdite] = useState(null);

  // État pour le nouveau produit
  const [nouveauProduit, setNouveauProduit] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });

  // État pour afficher/masquer le formulaire d'ajout
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  // Générer un nouvel ID unique
  const genererNouvelId = () => {
    const idsExistants = produits.map((prod) => prod.id);
    return Math.max(...idsExistants, 0) + 1;
  };

  // Gérer l'ajout d'un nouveau produit
  const ajouterProduit = (e) => {
    e.preventDefault();

    if (
      !nouveauProduit.name ||
      !nouveauProduit.price ||
      !nouveauProduit.category
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const nouvelId = genererNouvelId();
    const produitCree = {
      id: nouvelId,
      name: nouveauProduit.name,
      price: parseFloat(nouveauProduit.price),
      category: nouveauProduit.category,
      image: nouveauProduit.image,
      description: nouveauProduit.description,
      stock: parseInt(nouveauProduit.stock) || 0,
    };

    setProduits([...produits, produitCree]);
    setNouveauProduit({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
      stock: "",
    });
    setAfficherFormulaire(false);
  };

  // Gérer la modification d'un produit
  const modifierProduit = async (e) => {
    e.preventDefault();

    if (!produitEdite.name || !produitEdite.price || !produitEdite.category) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setProduits(
      produits.map((prod) =>
        prod.id === produitEdite.id
          ? {
              ...produitEdite,
              prix: parseFloat(produitEdite.prix),
              stock: parseInt(produitEdite.stock) || 0,
            }
          : prod
      )
    );
    console.log(produitEdite);
    await handleUpdateProduct();
    //setProduitEdite(null);
  };

  // Gérer la suppression d'un produit
  const supprimerProduit = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to delete product. Status: ${response.status}`
          );
        }

        const result = await response.json();
        console.log("Product deleted successfully:", result);
        return result;
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    }
  };

  // Commencer à éditer un produit
  const commencerEdition = (produit) => {
    setProduitEdite({ ...produit });
  };

  // Annuler l'édition
  const annulerEdition = () => {
    setProduitEdite(null);
  };

  // Gérer les changements dans le formulaire d'ajout
  const handleChangeNouveauProduit = (e) => {
    const { name, value } = e.target;
    setNouveauProduit({
      ...nouveauProduit,
      [name]: value,
    });
  };

  // Gérer les changements dans le formulaire d'édition
  const handleChangeProduitEdite = (e) => {
    const { name, value } = e.target;

    setProduitEdite({
      ...produitEdite,
      [name]: value,
    });
  };

  // Formater le prix avec deux décimales
  const formaterPrix = (prix) => {
    return prix.toFixed(2).replace(".", ",") + " €";
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nouveauProduit.name,
          description: nouveauProduit.description,
          image: nouveauProduit.image,
          price: nouveauProduit.price,
          stock: nouveauProduit.stock ?? 0, // Fallback to 0 if undefined
          category_id: nouveauProduit.category,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product created:", result);
      return result;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/products/" + produitEdite.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: produitEdite.name,
            description: produitEdite.description,
            image: produitEdite.image,
            price: produitEdite.price,
            stock: produitEdite.stock ?? 0, // Fallback to 0 if undefined
            category_id: produitEdite.category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update product. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product updated:", result);
      setProduitEdite(null);
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête de la page */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Administration des Produits
          </h1>
        </div>
      </header>

      {/* Section principale */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton pour ajouter un nouveau produit */}
        <div className="mb-8">
          <button
            onClick={() => setAfficherFormulaire(!afficherFormulaire)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            {afficherFormulaire ? "Annuler" : "Ajouter un produit"}
          </button>
        </div>

        {/* Formulaire d'ajout d'un nouveau produit */}
        {afficherFormulaire && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Ajouter un nouveau produit
            </h2>
            <form onSubmit={ajouterProduit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={nouveauProduit.nom}
                    onChange={handleChangeNouveauProduit}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Bracelet en argent"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Prix (€) *</label>
                  <input
                    type="number"
                    name="prix"
                    value={nouveauProduit.prix}
                    onChange={handleChangeNouveauProduit}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 99.99"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="categorie"
                    value={nouveauProduit.categorie}
                    onChange={handleChangeNouveauProduit}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.length > 0 &&
                      categories.map((cat, index) => (
                        <option key={index} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={nouveauProduit.stock}
                    onChange={handleChangeNouveauProduit}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 10"
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={nouveauProduit.image}
                    onChange={handleChangeNouveauProduit}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: /images/produits/bracelet-argent.jpg"
                  />
                </div>
                <div className="mb-4 md:col-span-2">
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={nouveauProduit.description}
                    onChange={handleChangeNouveauProduit}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description du produit"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddProduct}
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
        {produitEdite && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Modifier le produit</h2>
            <form onSubmit={modifierProduit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={produitEdite.name}
                    onChange={handleChangeProduitEdite}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Prix (€) *</label>
                  <input
                    type="number"
                    name="price"
                    value={produitEdite.price}
                    onChange={handleChangeProduitEdite}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={produitEdite.category}
                    onChange={handleChangeProduitEdite}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.length > 0 &&
                      categories.map((cat, index) => (
                        <option key={index} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={produitEdite.stock}
                    onChange={handleChangeProduitEdite}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={produitEdite.image}
                    onChange={handleChangeProduitEdite}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4 md:col-span-2">
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={produitEdite.description}
                    onChange={handleChangeProduitEdite}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
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

        {/* Liste des produits existants */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Produits existants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((produit) => (
                  <tr key={produit.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {produit.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                        <img
                          src={produit.image || "/api/placeholder/48/48"}
                          alt={produit.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/48/48";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {produit.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formaterPrix(produit.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {produit.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {produit.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => commencerEdition(produit)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Éditer
                        </button>
                        <button
                          onClick={() => supprimerProduit(produit.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {produits.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Aucun produit disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
