import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getFacture } from "../../../actions/facture/action";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const TousArticles2 = () => {
  let { factureId, articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>();
  const location = useLocation();
  const { articleData } = location.state;


  useEffect(() => {
    getFacture({ id: factureId }, (facture) => {
      const articlesWithId = facture.articles.filter(
        (a) => a._id === articleId
      )[0];
      setArticle(articlesWithId);
    });
  }, [factureId, articleId]);

  console.log(article);

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
          <h1>Detaile-Article</h1>
        </div>
        <img
          src="/previous (1).png"
          alt=""
          height={35}
          width={35}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <br />
        <br />
        <div style={{ maxHeight: "620px", overflow: "auto" }}>
          <Table bordered hover responsive>
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
            <tbody style={{ textAlign: "center" }}>
              {article ? (
                article.sub_article.map((a: any) => (
                  <tr key={a._id}>
                    <td>{a.designation}</td>
                    <td>{a.marque}</td>
                    <td>1</td>
                    <td>
                      {typeof a.prixut === "string"
                        ? parseFloat(a.prixut).toLocaleString("fr-FR", {
                            minimumFractionDigits: 3,
                          })
                        : a.prixut.toLocaleString("fr-FR", {
                            minimumFractionDigits: 3,
                          })}
                    </td>
                    <td>{a.numserie}</td>
                    <td>{a.observation}</td>
                    <td>{a.code}</td>
                    <td>{a.affectation}</td>
                    <td>{a.qi}</td>
                    <td>{a.ecart}</td>
                  </tr>
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
      </div>
    </>
  );
};

export default TousArticles2;
