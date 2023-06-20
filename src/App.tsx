import React from "react";
import "./App.css";
import Navbar from "./components/parts/Navbard";
import FacturesTable from "./components/pages/factures/FacturesTable";
import { Route, Routes } from "react-router-dom";
import ArticlesTable from "./components/pages/articles/ArticlesTable";
import OneArticle from "./components/pages/articles/OneArticle";
import Login from "./components/parts/Login";
import UsersTable from "./components/pages/users/Users";

enum WebsiteRoute {
  LOGIN = "/",
  USERS_TABLE = "/users",
  FACTURES_TABLE = "/facture",
  ARTICLES_TABLE = "/articlestable",
  ONE_ARTICLE = "/onearticle",
}

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 30, paddingLeft: 50, paddingRight: 50 }}>
        <Routes>
          <Route path={WebsiteRoute.LOGIN} element={<Login />} />
          <Route path={WebsiteRoute.USERS_TABLE} element={<UsersTable />} />
          <Route
            path={WebsiteRoute.FACTURES_TABLE}
            element={<FacturesTable />}
          />
          <Route
            path={`${WebsiteRoute.ARTICLES_TABLE}/:factureId`}
            element={<ArticlesTable />}
          />
          <Route
            path={`${WebsiteRoute.ONE_ARTICLE}/:factureId/:articleId`}
            element={<OneArticle />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
