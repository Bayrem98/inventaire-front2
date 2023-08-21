import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFacture } from "../../../actions/facture/action";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface Props {}

const ArticlesTable = (props: Props) => {
  let { factureId } = useParams();
  const navigate = useNavigate();

  const [articles, setArticles] = useState<any>([]);

  useEffect(() => {
    getFacture({ id: factureId }, (facture) => {
      const articlesWithId = facture.articles.map((article) => ({
        ...article,
      }));
      setArticles(articlesWithId);
    });
  }, [factureId]);
  console.log(articles);

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ paddingTop: 80 }}
      >
        <h1>Facture-Detailes</h1>
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
      <Table bordered hover responsive>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Désignation</th>
            <th>Marque</th>
            <th>QC</th>
            <th>Prix UT</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.length ? (
            articles.map((article: any, index: number) => (
              <tr
                key={`${article._id}-${index}`}
                style={{ textAlign: "center" }}
              >
                <td>{article.sub_article[0].designation}</td>
                <td>{article.sub_article[0].marque}</td>
                <td>{article.sub_article.length}</td>
                <td>
                  {" "}
                  {typeof article.sub_article[0].prixut === "string"
                    ? parseFloat(article.sub_article[0].prixut).toLocaleString(
                        "fr-FR",
                        {
                          minimumFractionDigits: 3,
                        }
                      )
                    : article.sub_article[0].prixut.toLocaleString("fr-FR", {
                        minimumFractionDigits: 3,
                      })}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/onearticle/${factureId}/${article._id}`}>
                    <Button
                      style={{
                        height: 50,
                        width: 60,
                        backgroundColor: "#217575",
                        borderRadius: 8,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ height: 25, color: "yellow" }}
                      />
                    </Button>
                  </Link>
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
    </>
  );
};

export default ArticlesTable;
