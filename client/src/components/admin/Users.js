import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import Swal from "sweetalert2";

function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = (await axios.get("/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        setError(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        {loading && <Loader />}
        {users.length && <h1>Ci sono {users.length} utenti.</h1>}
        <table className="table table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              <th>User ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "SI" : "NO"}</td>
                    <td>
                      {user.isAdmin ? null : (
                        <button
                          className="btn primary"
                          onClick={makeAdmin(user._id)}
                        >
                          Rendi admin
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

export function makeAdmin(id) {
  return async function () {
    try {
      const result = await axios.put("/api/users/makeadmin", { id }).data;
      console.log(result);
      Swal.fire("Fatto!", "Utente reso admin con successo!", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Errore!", "Qualcosa è andato storto!", "error");
    }
  };
}

export default Users;
