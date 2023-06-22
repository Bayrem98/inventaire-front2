import { useEffect, useState } from "react";
import { ButtonGroup, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/user/action";
import Inscription from "./Inscription";
import UserDelete from "./UserDelete";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface Props {}

const UsersTable = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers(setUsers); // aka setUsers(data)
  }, []);

  return (
    <div>
      <div
        className="d-flex justify-content-between"
        style={{ paddingTop: 80 }}
      >
        <Avatar
          style={{ backgroundColor: "#217575" }}
          icon={<UserOutlined />}
        />
        <h1>Tableau des Utilisateurs</h1>
        <Inscription refresh={() => getUsers(setUsers)} />
      </div>
      <br />
      <div style={{ paddingLeft: 200, paddingRight: 200 }}>
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th style={{ color: "#0e0e0ee7", backgroundColor: "lightgray" }}>
                Nom d'utilisateur
              </th>
              <th
                style={{
                  color: "#0e0e0ee7",
                  backgroundColor: "lightgray",
                  textAlign: "center",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td
                    style={{
                      color: "#0e0e0ee7",
                      fontSize: 18,
                    }}
                  >
                    {user.username}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <ButtonGroup>
                      <UserDelete
                        user={user}
                        refresh={() => getUsers(setUsers)}
                      />
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-5"
                  style={{ color: "#0e0e0ee7" }}
                >
                  <FontAwesomeIcon icon={faBoxOpen} size="4x" />
                  <br />
                  Pas des données...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
