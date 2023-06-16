import React from "react";
import "./App.css";
import Navbar from "./components/parts/Navbard";
import FacturesTable from "./components/pages/factures/FacturesTable";
import { Route, Routes } from "react-router-dom";
import ArticlesTable from "./components/pages/articles/ArticlesTable";
import OneArticle from "./components/pages/articles/OneArticle";
import Login from "./components/parts/Login";
import UsersTable from "./components/pages/users/Users";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 30, paddingLeft: 50, paddingRight: 50 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/facture" element={<FacturesTable />} />
          <Route path="/articlestable/:factureId" element={<ArticlesTable />} />
          <Route
            path="/onearticle/:factureId/:articleId"
            element={<OneArticle />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
