import React, { ChangeEvent, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Alert } from "antd";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message); // Mise à jour du message d'erreur
        } else {
          setErrorMessage("Une erreur s'est produite. Veuillez réessayer."); // Message d'erreur par défaut
        }
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
        paddingTop: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{ backgroundColor: "#217575", width: 500, borderRadius: 20 }}
      >
        <br />
        {errorMessage && (
          <Alert message="" description={errorMessage} type="error" showIcon />
        )}

        <h2 style={{ color: "yellow", textAlign: "center" }}>Connectez-vous</h2>
        <Form onSubmit={(event) => handleLogin(event)}>
          <FormGroup style={{ paddingLeft: 95 }}>
            <Label style={{ color: "white" }}>Nom d'utilisateur</Label>
            <div className="d-flex justify-content-between">
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              style={{ width: 300 }}
            />
            </div>
          </FormGroup>
          <FormGroup style={{ paddingLeft: 95 }}>
            <Label style={{ color: "white" }}>Mot de passe</Label>
            <div className="d-flex justify-content-between">
              <Input
                value={password}
                onChange={handlePasswordChange}
                type={passwordShown ? "text" : "password"}
                style={{ width: 300 }}
              />
              <Button
                style={{
                  color: "yellow",
                  cursor: "pointer",
                  position: "relative",
                  right: 60,
                  backgroundColor: "#217575",
                  border: 0,
                }}
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </Button>
            </div>
          </FormGroup>
          <FormGroup style={{ textAlign: "center" }}>
            <Button
              size="lg"
              style={{ backgroundColor: "yellow", cursor: "pointer" }}
              type="submit"
              disabled={!username || !password}
            >
              <span style={{ color: "#217575" }}>Valider</span>
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default Login;
