import { faPen } from "@fortawesome/free-solid-svg-icons";
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
  ModalHeader,
} from "reactstrap";
import User from "../../../@types/User";
import { editUsers } from "../../../actions/user/action";

interface UserEditPropsType {
  user: User;
  refresh: () => void;
}

const UserEdit = ({ user, refresh }: UserEditPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // form states

  const [username, setUsername] = useState<string>(user.username);
  const [password, setPassword] = useState<string>(user.password);

  const submit = () => {
    const newUser = {
      _id: user._id,
      username,
      password,
    };
    editUsers(newUser, () => {
      refresh();
      setIsOpened(false);
      reset(newUser);
    });
  };

  const reset = (user: User) => {
    setUsername(user.username);
    setPassword(user.password);
  };

  return (
    <>
      <Button color="primary" onClick={() => setIsOpened(true)}>
        <FontAwesomeIcon icon={faPen} />
      </Button>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader className="bg-primary" toggle={() => setIsOpened(false)}>
          <FormattedMessage id="users.edit.dialog.title" />
        </ModalHeader>
        <ModalBody>
          <Form inline>
            <FormGroup floating>
              <Input
                value={username}
                id="username"
                name="username"
                type="text"
                onChange={(event) => setUsername(event.target.value)}
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
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Label for="password">
                <FormattedMessage id="user.password" />
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit}>
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

export default UserEdit;
