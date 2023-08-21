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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { editedArticle } from "../../../actions/article/action";
import { useParams } from "react-router-dom";
import { Article } from "../../../@types/Article";

interface ArticleEditPropsType {
  article: Article;
  refresh: () => void;
}

const ArticleEdit = ({ article, refresh }: ArticleEditPropsType) => {
  let { articleId } = useParams<{ articleId?: string }>();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [designation, setDesignation] = useState<string>(article.designation);
  const [marque, setMarque] = useState<string>(article.marque);
  const [numserie, setNumserie] = useState<any>(article.numserie);
  const [observation, setObservation] = useState<any>(article.observation);
  const [code, setCode] = useState<any>(article.code);
  const [affectation, setAffectation] = useState<any>(article.affectation);
  const [prixut, setPrixut] = useState<number>(article.prixut);
  const [qc, setQc] = useState<number>(article.qc);
  const [qi, setQi] = useState<any>(article.qi);
  const [ecart, setEcart] = useState<any>(article.ecart);

  const submit = () => {
    const artId = articleId;
    const editArticle: Article = {
      // Ajouter le type d'objet Article à editArticle
      _id: article._id,
      designation,
      marque,
      numserie,
      observation,
      code,
      affectation,
      prixut,
      qc,
      qi,
      ecart,
    };
    console.log(editArticle);
    if (article._id) {
      editedArticle(editArticle, artId!, () => {
        setIsOpened(false);
        reset();
      });
    }
  };

  const reset = () => {
    setDesignation(article.designation);
    setMarque(article.marque);
    setNumserie(article.numserie);
    setObservation(article.observation);
    setCode(article.code);
    setAffectation(article.affectation);
    setPrixut(article.prixut);
    setQc(article.qc);
    setQi(article.qi);
    setEcart(article.ecart);
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
          <span>Modifier Article</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="designation">Désignation</Label>
              <Input
                value={designation || ""}
                id="designation"
                name="designation"
                type="text"
                onChange={(event) => setDesignation(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="marque">Marque</Label>
              <Input
                value={marque || ""}
                id="marque"
                name="marque"
                type="text"
                onChange={(event) => setMarque(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numserie">Numsérie</Label>
              <Input
                value={numserie || ""}
                id="numserie"
                name="numserie"
                type="text"
                onChange={(event) => setNumserie(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="observation">Observation</Label>
              <Input
                value={observation || ""}
                id="observation"
                name="observation"
                type="text"
                onChange={(event) => setObservation(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="code">Code</Label>
              <Input
                value={code || ""}
                id="code"
                name="code"
                type="text"
                onChange={(event) => setCode(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="affectation">Affectation</Label>
              <Input
                value={affectation || ""}
                id="affectation"
                name="affectation"
                type="text"
                onChange={(event) => setAffectation(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="prixut">PrixUT</Label>
              <Input
                value={prixut || ""}
                id="prixut"
                name="prixut"
                type="number"
                onChange={(event) => setPrixut(parseFloat(event.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="qc">Qc</Label>
              <Input
                value={qc || ""}
                id="qc"
                name="qc"
                type="number"
                onChange={(event) => setQc(parseInt(event.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="qi">Qi</Label>
              <Input
                value={qi || 0}
                id="qi"
                name="qi"
                type="number"
                onChange={(event) => setQi(parseInt(event.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ecart">Ecart</Label>
              <Input
                value={ecart || 0}
                id="ecart"
                name="ecart"
                type="number"
                onChange={(event) => setEcart(parseInt(event.target.value))}
              />
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

export default ArticleEdit;
