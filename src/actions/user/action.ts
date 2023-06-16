import axios from "axios";
import User from "../../@types/User";

export function getUsers(callback: (data: User[]) => void) {
  axios
    .get("http://localhost:5000/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((e) => {
      console.error(e);
    });
}

export function addUser(user: User, callback: () => void) {
  axios
    .post("http://localhost:5000/user", user)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}

export function editUsers(user: User, callback: () => void) {
  axios
    .put(`http://localhost:5000/user/${user._id}`, user)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}

export function deleteUsers(user: User, callback: () => void) {
  axios
    .delete(`http://localhost:5000/user/${user._id}`)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}
