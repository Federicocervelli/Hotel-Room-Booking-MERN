import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import Swal from "sweetalert2";


function Addroom() {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState();
  
    const [nome, setnome] = useState("");
    const [tipo, settipo] = useState("Standard");
    const [costo, setcosto] = useState("");
    const [capienza, setcapienza] = useState("");
    const [descrizione, setdescrizione] = useState("");
    const [immagine1, setimmagine1] = useState("");
    const [immagine2, setimmagine2] = useState("");
    const [immagine3, setimmagine3] = useState("");
  
    async function addroom() {
      const newroom = {
        nome,
        tipo : tipo,
        costo,
        capienza,
        descrizione,
        urlimmagini: [immagine1, immagine2, immagine3],
      };
      try {
        setloading(true);
        console.log(newroom);
        const result = await axios.post("/api/rooms/addroom", newroom).data;
        console.log(result);
        setloading(false);
        Swal.fire("Fatto!", "Stanza aggiunta con successo!", "success").then(
          () => {
            window.location.reload();
          }
        );
      } catch (error) {
        setloading(false);
        console.log(error);
        Swal.fire("Errore!", "Qualcosa è andato storto!", "error");
      }
    }
  
    return (
      <div className="row">
        {loading && <Loader />}
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="nome stanza"
            value={nome}
            onChange={(e) => {
              setnome(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="costo giornaliero"
            value={costo}
            onChange={(e) => {
              setcosto(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="capacità"
            value={capienza}
            onChange={(e) => {
              setcapienza(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="descrizione"
            value={descrizione}
            onChange={(e) => {
              setdescrizione(e.target.value);
            }}
          />
        </div>
        <div className="col-md-5">
          <select
            type="text"
            className="form-control"
            onChange={(e) => {
              settipo(e.target.value);
            }}
          >
            <option value="Standard">Standard</option>
            <option value="Lussosa">Lussuosa</option>
            <option value="Economica">Economica</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="URL Immagine 1"
            value={immagine1}
            onChange={(e) => {
              setimmagine1(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="URL Immagine 2"
            value={immagine2}
            onChange={(e) => {
              setimmagine2(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="URL Immagine 3"
            value={immagine3}
            onChange={(e) => {
              setimmagine3(e.target.value);
            }}
          />
  
          <div className="text-end">
            <button className="btn btn-primary mt-3" onClick={addroom}>
              Aggiungi
            </button>
          </div>
        </div>
      </div>
    );
  }

export default Addroom;