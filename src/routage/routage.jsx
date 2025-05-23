
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Creation_compte from "@/Pages/Creation_compte";
import Histoire from "@/Pages/Histoire";
import Produit from "@/Pages/Produit";
import Contact from "@/Pages/Contact";
import Admin from "@/Pages/Admin";
import Dashboard from "@/Pages/Dashboard";
import Commande from "@/Pages/Commande";


import AdminProdPage from "@/Pages/Admin_prod";
import { Loginfom2 } from "@/components/Login_form2";
import Login from "@/Pages/Login";
import ProtectedRoute from "@/ ProtectedRoute/ProtectedRoute";
import Loginvarifei from "@/ ProtectedRoute/loginrouteur";
import Porduit_deatils from "@/Pages/Produitdetails";
import Commande_Pro from "@/ ProtectedRoute/commande";

export const index_routage = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/apropos",
    element: <Home />
  },

  {
    path: "/login",
    element: (
      <Loginvarifei>
        <Login></Login>
      </Loginvarifei>
    )
  },

  {
    path: "/histoire",
    element: <Histoire></Histoire>
  },

  {
    path: "/produit",
    element: <Produit></Produit>
  },

  {
    path: "/contact",
    element: <Contact></Contact>
  },
   {
    path:"/cree_compte",
    element:<Creation_compte></Creation_compte>
   },
  {
    path: "/admin",
    element: <Admin></Admin>
  },
  {
    path: "/admin_prod",
    element: <AdminProdPage></AdminProdPage>
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard></Dashboard>
      </ProtectedRoute>
    )
  },
  {
    path: "/commande",
    element: <Commande></Commande>
  },
    {
    path: "/produit_details/:id",
    element:(
      <Commande_Pro>
        <Porduit_deatils></Porduit_deatils>
      </Commande_Pro>
    )
  },
  




  
  
])