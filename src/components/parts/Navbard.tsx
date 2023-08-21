import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className="navbar"
      style={{ position: "fixed", top: 0, width: "100%" }}
    >
      <ul>
        {localStorage.getItem("access_token") && (
          <>
            <li>
              <a href="/facture">Factures</a>
            </li>
            <li>
              <a href="/articles">Articles</a>
            </li>
            <li>
              <a href="/inventaire">Inventaire</a>
            </li>
            <li>
              <a href="/users">Ajouter Utilisateur</a>
            </li>
            <li onClick={logout}>
              <a style={{ paddingLeft: 173 }} href="/">
                Déconnexion
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
