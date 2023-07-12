import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment'

function Bookingscreen() {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let { roomid, fromDate, toDate } = useParams();
  let formattedFromDate = moment(fromDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
  let formattedToDate = moment(toDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

  const totalDays = moment(formattedToDate, 'DD-MM-YYYY').diff(moment(formattedFromDate, 'DD-MM-YYYY'), 'days') + 1;
  
  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchdata();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader/>
      ) : room ? (
        <div className="m-5">
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.nome}</h1>
              <img src={room.urlimmagini[0]} className="bigimg" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Dettagli prenotazione</h1>
                <hr />
                <b>
                  <p>Nome: </p>
                  <p>Da: {fromDate}</p>
                  <p>A: {toDate}</p>
                  <p>Capienza: {room.capienza}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Resoconto</h1>
                <hr />
                <b>
                  <p>Giorni totali: {totalDays} </p>
                  <p>Affitto giornaliero: {room.costo}</p>
                  <p>Totale: {}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Paga ora</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
