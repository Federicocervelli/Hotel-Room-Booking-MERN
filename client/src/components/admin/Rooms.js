import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import Swal from "sweetalert2";
import { Modal } from "antd";

function Rooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();

  const [editRoomNome, seteditRoomNome] = useState("");
  const [editRoomId, setEditRoomId] = useState("");
  const [editRoomTipo, setEditRoomTipo] = useState("");
  const [editRoomCosto, setEditRoomCosto] = useState("");
  const [editRoomCapienza, setEditRoomCapienza] = useState("");
  const [editRoomDescrizione, setEditRoomDescrizione] = useState("");
  const [editRoomImmagine1, setEditRoomImmagine1] = useState("");
  const [editRoomImmagine2, setEditRoomImmagine2] = useState("");
  const [editRoomImmagine3, setEditRoomImmagine3] = useState("");

  const showModal = (nome) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newroom = {
      nome: editRoomNome,
      tipo: editRoomTipo,
      costo: editRoomCosto,
      capienza: editRoomCapienza,
      descrizione: editRoomDescrizione,
      urlimmagini: [editRoomImmagine1, editRoomImmagine2, editRoomImmagine3],
    };

    try {
      axios.put("/api/rooms/updateroom/" + editRoomId, newroom);
      Swal.fire("Fatto!", "Stanza modificata con successo!", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Errore!", "Qualcosa è andato storto!", "error");
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleEditClick(
    nome,
    id,
    tipo,
    costo,
    capienza,
    descrizione,
    immagine1,
    immagine2,
    immagine3
  ) {
    showModal();
    seteditRoomNome(nome);
    setEditRoomId(id);
    setEditRoomTipo(tipo);
    setEditRoomCosto(costo);
    setEditRoomCapienza(capienza);
    setEditRoomDescrizione(descrizione);
    setEditRoomImmagine1(immagine1);
    setEditRoomImmagine2(immagine2);
    setEditRoomImmagine3(immagine3);
  }

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        setError(error);
      }
    }
    fetchRooms();
  }, []);

  return (
    <div className="row">
      <Modal
        title={"Modifica: " + editRoomNome}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="row">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="nome stanza"
              value={editRoomNome}
              onChange={(e) => seteditRoomNome(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="costo giornaliero"
              value={editRoomCosto}
              onChange={(e) => setEditRoomCosto(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="capienza"
              value={editRoomCapienza}
              onChange={(e) => setEditRoomCapienza(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="descrizione"
              value={editRoomDescrizione}
              onChange={(e) => setEditRoomDescrizione(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <select
              type="text"
              className="form-control"
              value={editRoomTipo}
              onChange={(e) => setEditRoomTipo(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Lussuosa">Lussuosa</option>
              <option value="Economica">Economica</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="URL Immagine 1"
              value={editRoomImmagine1}
              onChange={(e) => setEditRoomImmagine1(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="URL Immagine 2"
              value={editRoomImmagine2}
              onChange={(e) => setEditRoomImmagine2(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="URL Immagine 3"
              value={editRoomImmagine3}
              onChange={(e) => setEditRoomImmagine3(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      <div className="col-md-10">
        {loading && <Loader />}
        {rooms.length && <h1>Ci sono {rooms.length} stanze.</h1>}
        <table className="table table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              <th>Room ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Costo giornaliero</th>
              <th>Capacità</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.nome}</td>
                    <td>{room.tipo}</td>
                    <td>{room.costo}</td>
                    <td>{room.capienza}</td>
                    <td>
                      <button
                        className="btn btn-info me-2"
                        onClick={() =>
                          handleEditClick(
                            room.nome,
                            room._id,
                            room.tipo,
                            room.costo,
                            room.capienza,
                            room.descrizione,
                            room.urlimmagini[0],
                            room.urlimmagini[1],
                            room.urlimmagini[2]
                          )
                        }
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteRoom(room._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
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

function deleteRoom(id) {
  return async function () {
    try {
      const result = await axios.delete(`/api/rooms/deleteroom/${id}`).data;
      console.log(result);
      Swal.fire("Fatto!", "Stanza eliminata con successo!", "success").then(
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

export default Rooms;
