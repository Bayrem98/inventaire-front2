import { useState } from "react";
import Facture from "../../../@types/Facture";
import { deleteFacture } from "../../../actions/facture/action";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface FactureDeletePropsType {
  facture: Facture;
  refresh: () => void;
}

const FactureDelete = ({ facture, refresh }: FactureDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const submit = () => {
    deleteFacture(facture, () => {
      refresh();
      setIsOpened(false);
    });
  };

  return (
    <>
      <Button
        style={{ height: 50, width: 50, borderRadius: 5 }}
        color="danger"
        onClick={() => setIsOpened(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader
          className="bg-danger text-white"
          toggle={() => setIsOpened(!isOpened)}
        >
          Supprimer Facture
        </ModalHeader>
        <ModalBody>
          Voulez-vous supprimer la facture {""}
          {facture.reference} ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={submit}>
            Valider
          </Button>{" "}
          <Button onClick={() => setIsOpened(false)}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FactureDelete;
