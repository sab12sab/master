import { Navigate } from "react-router-dom";

export default function Loginvarifei({ children }) {
  const login = localStorage.getItem("id_user");
  const etat = localStorage.getItem("isAdmin"); // This is a string like "true" or "false" or null
  if (etat === "false") {
    return <Navigate to="/" />;
  }
  if (etat === "true") {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
