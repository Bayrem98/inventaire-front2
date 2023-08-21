import React, { useEffect, useState } from "react";
import Facture from "../../../@types/Facture";
import { getFactures } from "../../../actions/facture/action";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const Inventaire = () => {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [articles, setArticles] = useState<any>([]);
  const [filtre, setFiltre] = useState<string>("");

  // Fonction pour traiter les articles et regrouper les désignations en doublon
  function processArticles(factures: Facture[]) {
    const articleMap = new Map<string, any>();
    factures.forEach((facture) => {
      facture.articles.forEach((article) => {
        const key = article.sub_article[0].designation;
        if (articleMap.has(key)) {
          // Cumuler la quantité pour la désignation existante
          articleMap.get(key).sub_article[0].quantite +=
            article.sub_article[0].qc;
        } else {
          // Ajouter la désignation au map
          articleMap.set(key, article);
        }
      });
    });

    // Convertir le map en tableau
    const processedArticles = Array.from(articleMap.values());
    return processedArticles;
  }

  useEffect(() => {
    // Récupérer toutes les factures
    getFactures(null, setFactures);
  }, []);

  useEffect(() => {
    // Mettre à jour les articles traités lorsque les factures sont mises à jour
    if (factures.length) {
      const processedArticles = processArticles(factures);
      setArticles(processedArticles);
    }
  }, [factures]);

  return (
    <>
      <div style={{ paddingTop: 100 }}>
        <div className="mb-3">
          <label htmlFor="filtreInput" className="form-label">
            Filtrer par désignation :
          </label>
          <input
            type="text"
            id="filtreInput"
            className="form-control"
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
          />
        </div>
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>Désignation</th>
              <th>Marque</th>
              <th>Quantité</th>
              <th>Prix UT</th>
              <th>N°Série</th>
              <th>Observation</th>
              <th>Code</th>
              <th>Affectation</th>
              <th>QI</th>
              <th>Ecart</th>
            </tr>
          </thead>
          <tbody>
            {articles.length ? (
              articles
                .filter((article: any) =>
                  article.sub_article[0].designation
                    .toLowerCase()
                    .includes(filtre.toLowerCase())
                )
                .map((article: any, index: any) => (
                  <React.Fragment key={`${article._id}-${index}`}>
                    <tr key={`${article._id}-${index}`}>
                      <td>{article.sub_article[0].designation}</td>
                      <td>{article.sub_article[0].marque}</td>
                      <td>{article.sub_article[0].qc}</td>
                      <td>
                        {typeof article.sub_article[0].prixut === "string"
                          ? parseFloat(
                              article.sub_article[0].prixut
                            ).toLocaleString("fr-FR", {
                              minimumFractionDigits: 3,
                            })
                          : article.sub_article[0].prixut.toLocaleString(
                              "fr-FR",
                              {
                                minimumFractionDigits: 3,
                              }
                            )}
                      </td>
                      <td>{article.sub_article[0].numserie}</td>
                      <td>{article.sub_article[0].observation}</td>
                      <td>{article.sub_article[0].code}</td>
                      <td>{article.sub_article[0].affectation}</td>
                      <td>{article.sub_article[0].qi}</td>
                      <td>{article.sub_article[0].ecart}</td>
                    </tr>
                  </React.Fragment>
                ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center p-5">
                  <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                  <br />
                  Pas de données...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Inventaire;
