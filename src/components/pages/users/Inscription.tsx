import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { addUser } from "../../../actions/user/action";

interface UserAddPropsType {
  refresh: () => void;
}

const Inscription = (props: UserAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = () => {
    const newUser = {
      username,
      password,
    };
    addUser(newUser, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "#217575", borderRadius: 10 }}
        className="mb-2"
        onClick={() => setIsOpened(true)}
      >
        <span style={{ color: "yellow" }}>Ajouter Utilisateur</span>
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
          <span>Ajouter utilisateur</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Nom d'utilisateur</Label>
              <Input
                value={username}
                id="username"
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Mot de passe</Label>
              <Input
                value={password}
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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

export default Inscription;
