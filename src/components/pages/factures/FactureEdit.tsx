import { useState } from "react";
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
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Facture from "../../../@types/Facture";
import { editFacture } from "../../../actions/facture/action";

interface FactureEditPropsType {
  facture: Facture;
  refresh: () => void;
}

const fields = [
  { key: "En Cours", name: "En Cours" },
  { key: "Cloturé", name: "Cloturé" },
];

const FactureEdit = ({ facture, refresh }: FactureEditPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [reference, setReference] = useState<string>(facture.reference);
  const [societe, setSociete] = useState<string>(facture.societe);
  const [date, setDate] = useState<any>(facture.date);
  const [categorie, setCategorie] = useState<string>(facture.categorie);
  const [fournisseur, setFournisseur] = useState<string>(facture.fournisseur);
  const [quantite, setQuantite] = useState<number>(facture.quantite);
  const [prix, setPrix] = useState<number>(facture.prix);
  const [etat, setEtat] = useState<string>(facture.etat);
  const [articles, setArticles] = useState<any>(facture.articles);

  const submit = () => {
    const editedFacture = {
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
    console.log(editedFacture);

    if (facture._id) {
      editFacture(facture._id, editedFacture, () => {
        refresh();
        setIsOpened(false);
        reset();
      });
    }
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

  return (
    <>
      <Button
        style={{ height: 50, width: 50 }}
        color="warning"
        onClick={() => setIsOpened(true)}
      >
        <FontAwesomeIcon icon={faPen} />
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
          <span>Modifier l'etat de la Facture</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="etat">Etat</Label>
              <Input
                value={etat}
                id="etat"
                name="etat"
                type="select"
                onChange={(event) => setEtat(event.target.value)}
              >
                {fields.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.name}
                  </option>
                ))}
              </Input>
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

export default FactureEdit;
