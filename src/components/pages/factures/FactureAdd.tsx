import { useState } from "react";
import Article from "../../../@types/Article";
import { addFacture } from "../../../actions/facture/action";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

interface FactureAddPropsType {
  refresh: () => void;
}

const fields = [
  { key: "En Cours", name: "En Cours" },
  { key: "Cloturé", name: "Cloturé" },
];

const FactureAdd = (props: FactureAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [reference, setReference] = useState<string>("");
  const [societe, setSociete] = useState<string>("");
  const [date, setDate] = useState<any>("");
  const [categorie, setCategorie] = useState<string>("");
  const [fournisseur, setFournisseur] = useState<string>("");
  const [quantite, setQuantite] = useState<number>(0);
  const [prix, setPrix] = useState<number>(0);
  const [etat, setEtat] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);

  const submit = () => {
    const newFacture = {
      reference,
      societe,
      date,
      categorie,
      fournisseur,
      quantite,
      prix,
      etat,
      articles,
    };
    console.log(newFacture);

    addFacture(newFacture, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setReference("");
    setSociete("");
    setDate("");
    setCategorie("");
    setFournisseur("");
    setQuantite(0);
    setPrix(0);
    setEtat("");
    setArticles([]);
  };

  // const handleQuantiteChange = (event: any) => {
  // const value = parseInt(event.target.value);

  // if (isNaN(value)) {
  //   setQuantite(1);
  //  } else {
  //  setQuantite(value);
  //  }
  // };

  // const handlePrixChange = (event: any) => {
  //  const value = parseInt(event.target.value);

  //  if (isNaN(value)) {
  //    setPrix(1);
  //  } else {
  //    setPrix(value);
  //  }
  // };

  const handleDeleteArticle = (index: any) => {
    setArticles([...articles.slice(0, index), ...articles.slice(index + 1)]);
  };

  return (
    <>
      <Button
        className="mb-2"
        onClick={() => setIsOpened(true)}
        style={{ backgroundColor: "#217575", borderRadius: 10 }}
      >
        <span style={{ color: "yellow" }}>Ajouter Facture</span>
        <FontAwesomeIcon color="yellow" icon={faAdd} />
      </Button>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader
          style={{
            backgroundColor: "#217575",
            color: "yellow",
          }}
          toggle={() => setIsOpened(!isOpened)}
        >
          <span>Facture Ajouter</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="reference">Référence</Label>
              <Input
                value={reference}
                id="reference"
                name="reference"
                type="text"
                onChange={(e) => setReference(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="societe">Société</Label>
              <Input
                value={societe}
                id="societe"
                name="societe"
                type="text"
                onChange={(e) => setSociete(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                value={date}
                id="date"
                name="date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categorie">Catégorie</Label>
              <Input
                value={categorie}
                id="categorie"
                name="categorie"
                type="text"
                onChange={(e) => setCategorie(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fournisseur">Fournisseur</Label>
              <Input
                value={fournisseur}
                id="fournisseur"
                name="fournisseur"
                type="text"
                onChange={(e) => setFournisseur(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantite">Quantité</Label>
              <Input
                value={quantite}
                id="quantite"
                name="quantite"
                type="number"
                onChange={(e) => setQuantite(parseFloat(e.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="prix">Prix</Label>
              <Input
                value={prix}
                id="prix"
                name="prix"
                type="number"
                onChange={(e) => setPrix(parseFloat(e.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="etat">Etat</Label>
              <Input
                value={etat}
                id="etat"
                name="etat"
                type="select"
                onChange={(e) => setEtat(e.target.value)}
              >
                {fields.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            {articles.map((article, index) => (
              <div key={`${article._id}-${index}`}>
                {Object.values(article).every((val) => val == null) ? null : (
                  <div key={`${article._id}-${index}`}>
                    <FormGroup>
                      <Label>Désignation</Label>
                      <Input
                        value={article?.designation || ""}
                        onChange={(e) =>
                          setArticles([
                            ...articles.slice(0, index),
                            { ...article, designation: e.target.value },
                            ...articles.slice(index + 1),
                          ])
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Marque</Label>
                      <Input
                        type="text"
                        value={article?.marque || ""}
                        onChange={(e) =>
                          setArticles([
                            ...articles.slice(0, index),
                            { ...article, marque: e.target.value },
                            ...articles.slice(index + 1),
                          ])
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Quantité</Label>
                      <Input
                        type="number"
                        value={article?.qc || ""}
                        onChange={(e) =>
                          setArticles([
                            ...articles.slice(0, index),
                            { ...article, qc: parseInt(e.target.value) },
                            ...articles.slice(index + 1),
                          ])
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>PrixUT</Label>
                      <Input
                        type="number"
                        value={article?.prixut || ""}
                        onChange={(e) =>
                          setArticles([
                            ...articles.slice(0, index),
                            { ...article, prixut: parseFloat(e.target.value) },
                            ...articles.slice(index + 1),
                          ])
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: 10,
                        }}
                        onClick={() => handleDeleteArticle(index)}
                      >
                       <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </FormGroup>
                  </div>
                )}
              </div>
            ))}
            <FormGroup>
              <Button
                style={{
                  backgroundColor: "#217575",
                  color: "yellow",
                  borderRadius: 10,
                }}
                onClick={() =>
                  setArticles([
                    ...articles,
                    {
                      _id: uuidv4(),
                      designation: "",
                      marque: "",
                      prixut: 0,
                      qc: 0,
                    },
                  ])
                }
              >
                Ajouter Article
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{
              backgroundColor: "#217575",
              border: 0,
              color: "yellow",
              borderRadius: 10,
            }}
            onClick={submit}
          >
            Valider
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "lightgray",
              border: 0,
              borderRadius: 10,
            }}
            onClick={() => setIsOpened(false)}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FactureAdd;
