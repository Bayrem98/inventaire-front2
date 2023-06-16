import React, { useEffect, useMemo, useState } from "react";
import Facture from "../../../@types/Facture";
import { getFactures } from "../../../actions/facture/action";
import FactureAdd from "./FactureAdd";
import { Button, ButtonGroup, Input, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import FactureDelete from "./FactureDelete";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import FactureEdit from "./FactureEdit";

interface Props {}
const FacturesTable = (props: Props) => {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getFactures(null, setFactures);
  }, []);
  console.log(factures);

  function renderArticles(facture: Facture) {
    return facture.articles.map((article, index) => (
      <React.Fragment key={`${article._id}-${index}`}>
        <div>
          <div>{article.sub_article[0].designation}</div>
        </div>
      </React.Fragment>
    ));
  }

  const filteredFactures = useMemo(() => {
    return factures.filter(
      (facture) =>
        facture.reference
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        facture.societe
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        facture.fournisseur
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        new Date(facture.date)
          .toLocaleDateString("fr-CA") // <-- Formatage de la date ici
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        facture.etat.toString().toLowerCase().includes(filter.toLowerCase()) ||
        facture.categorie
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
    );
  }, [factures, filter]);

  /*  const excelData = filteredFactures.map((facture) => [
    facture.reference,
    facture.societe,
    new Date(facture.date).toLocaleDateString("fr-CA"),
    facture.categorie,
    facture.fournisseur,
    facture.quantite,
    typeof facture.prix === "string"
      ? parseFloat(facture.prix).toLocaleString("fr-FR", {
          minimumFractionDigits: 3,
        })
      : facture.prix.toLocaleString("fr-FR", { minimumFractionDigits: 3 }),
    facture.etat,
    renderArticles(facture),
  ]);
 
  {factures.length > 0 && <ExcelTable excelData={excelData} />}
  */

  return (
    <div>
      <div
        className="d-flex justify-content-between"
        style={{ paddingTop: 80 }}
      >
        <h1>Factures</h1>
        <FactureAdd refresh={() => getFactures(null, setFactures)} />
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
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Chercher..."
        />
      </div>
      <br />
      <div style={{ maxHeight: "650px", overflow: "auto" }}>
        <Table bordered hover responsive>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Référence</th>
              <th>Société</th>
              <th>Date</th>
              <th>Catégorie</th>
              <th>Fournisseur</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Etat</th>
              <th>Articles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {filteredFactures.length ? (
              filteredFactures.map((facture, index) => (
                <tr key={`${facture._id}-${index}`}>
                  <td>{facture.reference}</td>
                  <td>{facture.societe}</td>
                  <td style={{ width: 99 }}>
                    {new Date(facture.date).toLocaleDateString("fr-CA")}
                  </td>
                  <td>{facture.categorie}</td>
                  <td>{facture.fournisseur}</td>
                  <td>{facture.quantite}</td>
                  <td>
                    {typeof facture.prix === "string"
                      ? parseFloat(facture.prix).toLocaleString("fr-FR", {
                          minimumFractionDigits: 3,
                        })
                      : facture.prix.toLocaleString("fr-FR", {
                          minimumFractionDigits: 3,
                        })}
                  </td>
                  <td>{facture.etat}</td>
                  <td>{renderArticles(facture)}</td>
                  <td style={{ textAlign: "center" }}>
                    <ButtonGroup>
                      <Link to={`/articlestable/${facture._id}`}>
                        <Button
                          style={{
                            height: 50,
                            width: 60,
                            backgroundColor: "#217575",
                            borderRadius: 5,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ height: 25, color: "yellow" }}
                          />
                        </Button>
                      </Link>
                      <FactureEdit
                        facture={facture}
                        refresh={() => getFactures(null, setFactures)}
                      />

                      <FactureDelete
                        facture={facture}
                        refresh={() => getFactures(null, setFactures)}
                      />
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center p-5">
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
  );
};

export default FacturesTable;
