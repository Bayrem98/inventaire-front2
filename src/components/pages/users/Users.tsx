import { useEffect, useState } from "react";
import { ButtonGroup, Container, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import User from "../../../@types/User";
import { getUsers } from "../../../actions/user/action";
import Inscription from "./Inscription";
import UserDelete from "./UserDelete";

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
        style={{ paddingTop: 150 }}
      >
        <h1>Tableau des Utilisateurs</h1>
        <Inscription refresh={() => getUsers(setUsers)} />
      </div>
      <br />
      <Table bordered responsive hover>
        <thead>
          <tr>
            <th
              className="font-['Helvetica']"
              style={{ color: "#0e0e0ee7", backgroundColor: "lightgray" }}
            >
              Username
            </th>
            <th
              className="w-[90px] font-['Helvetica']"
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
                Pas de données...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
