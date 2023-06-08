import React from "react";
import "./App.css";
import Navbar from "./components/parts/Navbard";
import FacturesTable from "./components/pages/factures/FacturesTable";
import { Route, Routes } from "react-router-dom";
import ArticlesTable from "./components/pages/articles/ArticlesTable";
import OneArticle from "./components/pages/articles/OneArticle";
import Home from "./components/parts/Home";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 30, paddingLeft: 50, paddingRight: 50 }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
