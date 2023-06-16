import React, { ChangeEvent, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLogin = (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", { username, password })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        window.location.reload();
        navigateto();
        console.log(data);
      })
      .catch((event) => {
        console.log(event.response.data.message);
      });
  };

  const navigateto = () => {
    window.location.replace("/facture");
  };

  const eye = <FontAwesomeIcon icon={faEye} />;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div
      style={{
        paddingTop: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "#217575", width: 500, borderRadius: 50 }}>
        <h2 style={{ color: "yellow", textAlign: "center" }}>Connecter</h2>
        <Form onSubmit={(event) => handleLogin(event)}>
          <FormGroup style={{ paddingLeft: 95 }}>
            <Label style={{ color: "white" }}>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              style={{ width: 300 }}
            />
          </FormGroup>
          <FormGroup style={{ paddingLeft: 95 }}>
            <Label style={{ color: "white" }}>Password</Label>
            <Input
              value={password}
              onChange={handlePasswordChange}
              type={passwordShown ? "text" : "password"}
              style={{ width: 300 }}
            />
            <i
              style={{
                color: "yellow",
                cursor: "pointer",
                position: "absolute",
                left: 792,
                top: 500,
              }}
              onClick={togglePasswordVisiblity}
            >
              {eye}
            </i>
          </FormGroup>
          <FormGroup style={{ textAlign: "center" }}>
            <Button
              size="lg"
              style={{ backgroundColor: "yellow", cursor: "pointer" }}
              type="submit"
              disabled={!username || !password}
            >
              <span style={{ color: "#217575" }}>Submit</span>
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default Login;
