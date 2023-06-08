import React from "react";
const Navbar: React.FC = () => {
  return (
    <div
      className="navbar"
      style={{ position: "fixed", top: 0, width: "100%" }}
    >
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/facture">Factures</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
