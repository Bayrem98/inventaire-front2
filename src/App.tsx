import React from "react";
import "./App.css";
import Navbar from "./components/parts/Navbard";
import FacturesTable from "./components/pages/factures/FacturesTable";
import { Route, Routes } from "react-router-dom";
import ArticlesTable from "./components/pages/articles/ArticlesTable";
import OneArticle from "./components/pages/articles/OneArticle";
import Login from "./components/parts/Login";
import UsersTable from "./components/pages/users/Users";
import TousArticles from "./components/pages/articles/TousArticles";
import TousArticles2 from "./components/pages/articles/TousArticles2";
import Home from "./components/parts/Home";
import LecteurExcel from "./components/parts/LecteurExcel";

enum WebsiteRoute {
  LOGIN = "/",
  USERS_TABLE = "/users",
  FACTURES_TABLE = "/facture",
  ARTICLES_TABLE = "/articlestable",
  ONE_ARTICLE = "/onearticle",
  TOUS_ARTICLES = "/articles",
  TOUS_ARTICLES2 = "/tousarticles2",
  INVENTAIRE = "/inventaire",
  LECTEUREXCEL = "/lecteurexcel",
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
          <Route path={WebsiteRoute.TOUS_ARTICLES} element={<TousArticles />} />

          <Route
            path={WebsiteRoute.TOUS_ARTICLES2}
            element={<TousArticles2 />}
          />
          <Route path={WebsiteRoute.INVENTAIRE} element={<Home />} />
          <Route path={WebsiteRoute.LECTEUREXCEL} element={<LecteurExcel />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
