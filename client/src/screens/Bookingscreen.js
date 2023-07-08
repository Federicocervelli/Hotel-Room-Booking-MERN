import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bookingscreen() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let {roomid} = useParams();

  useEffect(() => {
    async function fetchdata() {
        try {
            setLoading(true);
            const data = (await axios.post("/api/rooms/getroombyid", {roomid : roomid})).data;
            setRoom(data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setError(true);
          }
    } 
    fetchdata()
  });
  return (
    <div>
      {room ? (
        <div className="m-5">

        <div className="row justify-content-center mt-5 bs">

          <div className="col-md-6">
            <h1>{room.nome}</h1>
            <img src={room.urlimmagini[0]} className="bigimg" />
          </div>

          <div className="col-md-6">
            <div style={{textAlign: 'right'}}>
              <h1>Dettagli prenotazione</h1>
              <hr/>
              <b>
              <p>Nome: </p>
              <p>Da: </p>
              <p>A: </p>
              <p>Capienza: {room.capienza}</p>
              </b>
            </div>
            <div style={{textAlign: 'right'}}>
              <h1>Resoconto</h1>
              <hr/>
              <b>
              <p>Giorni totali: 2 </p>
              <p>Affitto giornaliero: {room.costo}</p>
              <p>Totale: {}</p>
              </b>
            </div>
            <div style={{float: 'right'}}>
              <button className="btn btn-primary">Paga ora</button>
            </div>
          </div>

        </div>

      </div>
        ) 
        : loading ? (<h1>Loading....</h1>)
        : (<h1>Error: {error}</h1>)
      }
    </div>
  );
}

export default Bookingscreen;