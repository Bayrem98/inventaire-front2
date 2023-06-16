import React, { ChangeEvent, useState, useEffect } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import User from "../../@types/User";
import { getUsers } from "../../actions/user/action";
import Inscription from "./users/Inscription";

function Login() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    getUsers(setUsers); // aka setUsers(data)
  }, []);

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
        console.log(data);
      })
      .catch((event) => {
        console.log(event.response.data.message);
      });
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
      <div>
        <Inscription refresh={() => getUsers(setUsers)} />
      </div>
    </div>
  );
}

export default Login;
