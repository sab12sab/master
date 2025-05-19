import React, { useEffect, useState } from "react";

export default function Admin8Projet() {
  // Données initiales des catégories
  /* const categoriesInitiales = [
    { id: 1, nom: "Bracelets", image: "/images/categories/bracelets.jpg" },
    { id: 2, nom: "Bagues", image: "/images/categories/bagues.jpg" },
    { id: 3, nom: "Hand Chains", image: "/images/categories/hand-chains.jpg" },
    {
      id: 4,
      nom: "Boucles d'oreilles",
      image: "/images/categories/boucles.jpg",
    },
    { id: 5, nom: "Rivières", image: "/images/categories/rivieres.jpg" },
    { id: 6, nom: "Colliers", image: "/images/categories/colliers.jpg" },
    { id: 9, nom: "Boites", image: "/images/categories/boites.jpg" },
  ]; */
  const [categories, setCategories] = useState([]);
  // État pour gérer les catégories
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

  useEffect(() => {
    fetchCategories();
  }, []);

  // État pour la catégorie en cours d'édition
  const [categorieEditee, setCategorieEditee] = useState(null);

  // État pour la nouvelle catégorie
  const [nouvelleCategorie, setNouvelleCategorie] = useState({
    nom: "",
    image: "",
  });

  // État pour afficher/masquer le formulaire d'ajout
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  // Générer un nouvel ID unique
  const genererNouvelId = () => {
    const idsExistants = categories.map((cat) => cat.id);
    return Math.max(...idsExistants, 0) + 1;
  };

  // Gérer l'ajout d'une nouvelle catégorie
  const ajouterCategorie = async (e) => {
    e.preventDefault();

    if (!nouvelleCategorie.name || !nouvelleCategorie.image) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nouvelleCategorie.name,
          image: nouvelleCategorie.image,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create category. Status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("category created:", result);
      return result;
    } catch (error) {
      console.error("Error category product:", error);
      throw error;
    }
  };

  // Gérer la modification d'une catégorie
  const modifierCategorie = async (e) => {
    e.preventDefault();

    if (!categorieEditee.name || !categorieEditee.image) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/category/" + categorieEditee.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categorieEditee.name,
            image: categorieEditee.image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update category. Status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("category updated:", result);
      setCategorieEditee(null);
      return result;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  // Gérer la suppression d'une catégorie
  const supprimerCategorie = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) {
      try {
        const response = await fetch(`http://localhost:5000/category/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to delete category. Status: ${response.status}`
          );
        }

        const result = await response.json();
        console.log("Product category successfully:", result);
        return result;
      } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
      }
    }
  };

  // Commencer à éditer une catégorie
  const commencerEdition = (categorie) => {
    setCategorieEditee({ ...categorie });
  };

  // Annuler l'édition
  const annulerEdition = () => {
    setCategorieEditee(null);
  };

  // Gérer les changements dans le formulaire d'ajout
  const handleChangeNouvelleCategorie = (e) => {
    const { name, value } = e.target;
    setNouvelleCategorie({
      ...nouvelleCategorie,
      [name]: value,
    });
  };

  // Gérer les changements dans le formulaire d'édition
  const handleChangeCategorieEditee = (e) => {
    const { name, value } = e.target;
    setCategorieEditee({
      ...categorieEditee,
      [name]: value,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête de la page */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Administration des Catégories
          </h1>
        </div>
      </header>

      {/* Section principale */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton pour ajouter une nouvelle catégorie */}
        <div className="mb-8">
          <button
            onClick={() => setAfficherFormulaire(!afficherFormulaire)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            {afficherFormulaire ? "Annuler" : "Ajouter une catégorie"}
          </button>
        </div>

        {/* Formulaire d'ajout d'une nouvelle catégorie */}
        {afficherFormulaire && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Ajouter une nouvelle catégorie
            </h2>
            <form onSubmit={ajouterCategorie}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  name="name"
                  value={nouvelleCategorie.name}
                  onChange={handleChangeNouvelleCategorie}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Pendentifs"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  URL de l'image
                </label>
                <input
                  type="text"
                  name="image"
                  value={nouvelleCategorie.image}
                  onChange={handleChangeNouvelleCategorie}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: /images/categories/pendentifs.jpg"
                  required
                />
              </div>
              <div className="flex justify-end">
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
        {categorieEditee && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Modifier la catégorie
            </h2>
            <form onSubmit={modifierCategorie}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  name="name"
                  value={categorieEditee.name}
                  onChange={handleChangeCategorieEditee}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  URL de l'image
                </label>
                <input
                  type="text"
                  name="image"
                  value={categorieEditee.image}
                  onChange={handleChangeCategorieEditee}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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

        {/* Liste des catégories existantes */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Catégories existantes</h2>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((categorie) => (
                  <tr key={categorie.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categorie.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                        <img
                          src={categorie.image || "/api/placeholder/48/48"}
                          alt={categorie.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/48/48";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {categorie.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => commencerEdition(categorie)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Éditer
                        </button>
                        <button
                          onClick={() => supprimerCategorie(categorie.id)}
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
          {categories.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Aucune catégorie disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
