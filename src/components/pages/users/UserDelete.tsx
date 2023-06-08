import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FormattedMessage } from "react-intl";
import User from "../../../@types/User";
import { deleteUsers } from "../../../actions/user/action";


interface UserDeletePropsType {
  user: User;
  refresh: () => void;
}

const UserDelete = ({ user, refresh }: UserDeletePropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const submit = () => {
    deleteUsers(user, () => {
      refresh();
      setIsOpened(false);
    });
  };

  return (
    <>
      <Button
        className="btn3-delete"
        color="danger"
        onClick={() => setIsOpened(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Modal
        className="font-['Helvetica']"
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader
          className="bg-danger text-white"
          toggle={() => setIsOpened(!isOpened)}
        >
          <FormattedMessage id="users.delete.dialog.title" />
        </ModalHeader>
        <ModalBody>
          <FormattedMessage id="users.delete.dialog.text" /> {user.username} ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={submit}>
            <FormattedMessage id="button.confirm" />
          </Button>{" "}
          <Button onClick={() => setIsOpened(false)}>
            <FormattedMessage id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserDelete;
