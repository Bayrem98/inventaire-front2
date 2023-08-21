import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faEye } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getFactures } from "../../../actions/facture/action";
import Facture from "../../../@types/Facture";
import { Link, useNavigate, useParams } from "react-router-dom";

const TousArticles = () => {
  const navigate = useNavigate();
  let { factureId, articleId } = useParams();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prixTotal, setPrixTotal] = useState(0);

  function handleEyeButtonClick(facture: Facture) {
    const articleData = facture.articles.map((article, index) => {
      return {
        id: `${article._id}-${index}`,
        designation: article.sub_article[0].designation,
        prixut: article.sub_article[0].prixut,
        qc: article.sub_article.length,
        marque: article.sub_article[0].marque,
        numserie: article.sub_article[0].numserie,
        observation: article.sub_article[0].observation,
        code: article.sub_article[0].code,
        affectation: article.sub_article[0].affectation,
        qi: article.sub_article[0].qi,
        ecart: article.sub_article[0].ecart,
      };
    });

    console.log(articleData); // Vérifiez ici que les données sont correctes
    navigate("/tousarticles2", {
      state: {
        articleData,
      },
    });
  }

  useEffect(() => {
    getFactures(null, setFactures);
  }, [factureId, articleId]);

  function renderArticles(facture: Facture) {
    return facture.articles
      .filter((article) =>
        article.sub_article[0].designation
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((article, index) => {
        return {
          id: `${article._id}-${index}`,
          designation: article.sub_article[0].designation,
          prixut: article.sub_article[0].prixut,
          qc: article.sub_article.length,
          marque: article.sub_article[0].marque,
          numserie: article.sub_article[0].numserie,
          observation: article.sub_article[0].observation,
          code: article.sub_article[0].code,
          affectation: article.sub_article[0].affectation,
          qi: article.sub_article[0].qi,
          ecart: article.sub_article[0].ecart,
        };
      });
  }

  function calculerPrixTotal() {
    let total = 0;
    factures.forEach((facture) => {
      facture.articles.forEach((article) => {
        const prixTotalArticle =
          article.sub_article[0].prixut * article.sub_article.length;
        total += prixTotalArticle;
      });
    });
    return total;
  }

  useEffect(() => {
    const total = calculerPrixTotal();
    setPrixTotal(total);
  }, [factures, searchTerm]);

  return (
    <>
      <div style={{ paddingTop: 80 }}>
        <div className="">
          {" "}
          <Avatar
            style={{ backgroundColor: "#217575" }}
            icon={<UserOutlined />}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <h1>Tous Les Articles</h1>
        </div>

        <div>
          <Input
            style={{
              width: 150,
              height: 30,
              borderRadius: 10,
              borderColor: "#217575",
              backgroundColor: "lightgray",
            }}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Chercher..."
          />
        </div>
        <br />
        <div style={{ maxHeight: "620px", overflow: "auto" }}>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Marque</th>
                <th>Quantité</th>
                <th>Prix UT</th>
                <th>PrixTotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {factures.length ? (
                factures.map((facture, index) =>
                  renderArticles(facture).map((article, articleIndex) => {
                    const prixTotalLigne = (
                      article.qc * article.prixut
                    ).toFixed(3);

                    return (
                      <tr key={`${article.id}-${articleIndex}`}>
                        <td>{article.designation}</td>
                        <td>{article.marque}</td>
                        <td>{article.qc}</td>
                        <td>
                          {typeof article.prixut === "string"
                            ? parseFloat(article.prixut).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 3,
                                }
                              )
                            : article.prixut.toLocaleString("fr-FR", {
                                minimumFractionDigits: 3,
                              })}
                        </td>
                        <td>{prixTotalLigne}</td>
                        <td>
                          {" "}
                          <Button
                            style={{
                              height: 50,
                              width: 60,
                              backgroundColor: "#217575",
                              borderRadius: 8,
                            }}
                            onClick={() => handleEyeButtonClick(facture)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ height: 25, color: "yellow" }}
                            />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )
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
      </div>
    </>
  );
};

export default TousArticles;
