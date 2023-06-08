import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { addUser } from "../../../actions/user/action";

interface UserAddPropsType {
  refresh: () => void;
}

const UserAdd = (props: UserAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false); // form state for modal.

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

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = <FontAwesomeIcon icon={faEye} />;

  return (
    <>
      <Button
        className="w-[50px] h-[50px] top-[-210px] left-[880px] absolute"
        style={{ backgroundColor: "#b79e56", border: 0 }}
        size="lg"
        onClick={() => setIsOpened(true)}
      >
        <FontAwesomeIcon icon={faAdd} />
      </Button>
      <Modal
        className="font-['Helvetica']"
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <Form onSubmit={(e) => submit()}>
          <ModalBody>
            <p
              style={{
                color: "#b79e56",
                textAlign: "center",
                textDecoration: "underline",
                fontSize: 25,
              }}
            >
              <FormattedMessage id="users.add.dialog.title" />
            </p>
            <span
              onClick={() => setIsOpened(false)}
              style={{
                position: "absolute",
                right: 10,
                top: 2,
                cursor: "pointer",
                color: "gray",
                fontSize: 20,
              }}
            >
              X
            </span>
            <br />
            <FormGroup floating>
              <Input
                value={username}
                id="username"
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Label for="username">
                <FormattedMessage id="user.username" />
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={password}
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className="absolute h-[20px] w-[20px] top-[18px] right-[16px] cursor-pointer"
                style={{ color: "#b79e56" }}
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </i>
              <Label for="password">
                <FormattedMessage id="user.password" />
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{
                backgroundColor: "#b79e56",
                border: 0,
              }}
              type="submit"
              disabled={!username || !password}
            >
              <FormattedMessage id="button.confirm" />
            </Button>{" "}
            <Button
              style={{
                backgroundColor: "lightgray",
                border: 0,
              }}
              onClick={() => setIsOpened(false)}
            >
              <FormattedMessage id="button.cancel" />
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default UserAdd;
