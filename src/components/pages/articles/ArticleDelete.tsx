import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Article from "../../../@types/Article";
import { deleteArticle } from "../../../actions/article/action";

interface ArticleDeletePropsType {
  article: Article;
  refresh: () => void;
}

const ArticleDelete = ({ article, refresh }: ArticleDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const submit = () => {
    deleteArticle(article, () => {
      refresh();
      setIsOpened(false);
    });
  };

  return (
    <>
      <Button color="danger" onClick={() => setIsOpened(true)}>
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
          Supprimer Article
        </ModalHeader>
        <ModalBody>
          Voulez-vous supprimer article
          {article.designation}?
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

export default ArticleDelete;
