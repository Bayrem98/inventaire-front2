import React, { ChangeEvent, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

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
    <div style={{ paddingTop: 100 }}>
      <div>
        <h2>Login</h2>
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              value={password}
              onChange={handlePasswordChange}
              type={passwordShown ? "text" : "password"}
            />
            <i
              style={{
                color: "#b79e56",
                height: 20,
                width: 20,
                cursor: "pointer",
              }}
              onClick={togglePasswordVisiblity}
            >
              {eye}
            </i>
          </div>
          <button type="submit" disabled={!username || !password}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
