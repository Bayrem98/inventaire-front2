import { useEffect, useState } from "react";
import { getArticle } from "../../../actions/article/action";
import { ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ArticleEdit from "./ArticleEdit";
import { getFacture } from "../../../actions/facture/action";

interface Props {}

const OneArticle = (props: Props) => {
  let { factureId, articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>();

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
      <div
        className="d-flex justify-content-between"
        style={{ paddingTop: 80 }}
      >
        <h1>Article</h1>
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
      <div style={{ maxHeight: "650px", overflow: "auto" }}>
        <Table bordered hover responsive>
          <thead style={{ textAlign: "center" }}>
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
              <th>Action</th>
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
                  <td>
                    <ButtonGroup>
                      <ArticleEdit
                        article={a}
                        refresh={() => {
                          if (articleId) getArticle(articleId, setArticle);
                        }}
                      />
                    </ButtonGroup>
                  </td>
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
    </>
  );
};

export default OneArticle;
