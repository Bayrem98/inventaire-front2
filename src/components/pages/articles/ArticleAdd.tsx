import { useState } from "react";
import { addArticle } from "../../../actions/article/action";
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
import { faAdd } from "@fortawesome/free-solid-svg-icons";

interface ArticleAddPropsType {
  refresh: () => void;
}
const ArticleAdd = (props: ArticleAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [designation, setDesignation] = useState<string>("");
  const [marque, setMarque] = useState<string>("");
  const [numserie, setNumserie] = useState<string>("");
  const [observation, setObservation] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [affectation, setAffectation] = useState<string>("");
  const [prixut, setPrixut] = useState<number>(0);
  const [qc, setQc] = useState<number>(0);
  const [qi, setQi] = useState<number>(0);
  const [ecart, setEcart] = useState<number>(0);

  const submit = () => {
    const newArticle = {
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

    addArticle(newArticle, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setDesignation("");
    setMarque("");
    setNumserie("");
    setObservation("");
    setCode("");
    setAffectation("");
    setPrixut(0);
    setQc(0);
    setQi(0);
    setEcart(0);
  };

  return (
    <>
      <Button
        color="success"
        size="lg"
        className="mb-2"
        onClick={() => setIsOpened(true)}
      >
        Ajouter Article
        <FontAwesomeIcon icon={faAdd} />
      </Button>
      <Modal
        style={{ paddingLeft: 450 }}
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader toggle={() => setIsOpened(!isOpened)}>
          <span>Article Ajouter</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                value={designation}
                id="designation"
                name="designation"
                type="text"
                onChange={(e) => setDesignation(e.target.value)}
              />
              <Label for="designation">Désignation</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={marque}
                id="marque"
                name="marque"
                type="text"
                onChange={(e) => setMarque(e.target.value)}
              />
              <Label for="marque">Marque</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={numserie}
                id="numserie"
                name="numserie"
                type="text"
                onChange={(e) => setNumserie(e.target.value)}
              />
              <Label for="numserie">Numsérie</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={observation}
                id="observation"
                name="observation"
                type="text"
                onChange={(e) => setObservation(e.target.value)}
              />
              <Label for="observation">Observation</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={code}
                id="code"
                name="code"
                type="text"
                onChange={(e) => setCode(e.target.value)}
              />
              <Label for="code">Code</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={affectation}
                id="affectation"
                name="affectation"
                type="text"
                onChange={(e) => setAffectation(e.target.value)}
              />
              <Label for="affectation">Affectation</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={prixut}
                id="prixut"
                name="prixut"
                type="number"
                onChange={(event) => setPrixut(parseInt(event.target.value))}
              />
              <Label for="prixut">PrixUT</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={qc}
                id="qc"
                name="qc"
                type="number"
                onChange={(event) => setQc(parseInt(event.target.value))}
              />
              <Label for="qc">Qc</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={qi}
                id="qi"
                name="qi"
                type="number"
                onChange={(event) => setQi(parseInt(event.target.value))}
              />
              <Label for="qi">Qi</Label>
            </FormGroup>
            <FormGroup>
              <Input
                value={ecart}
                id="ecart"
                name="ecart"
                type="number"
                onChange={(event) => setEcart(parseInt(event.target.value))}
              />
              <Label for="ecart">Ecart</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{
              backgroundColor: "lightgray",
              border: 0,
            }}
            onClick={submit}
          >
            Valider
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "lightgray",
              border: 0,
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

export default ArticleAdd;
