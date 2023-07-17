import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment'
import Swal from "sweetalert2";

function Bookingscreen() {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let { roomid, fromDate, toDate } = useParams();
  let formattedFromDate = moment(fromDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
  let formattedToDate = moment(toDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

  const totalDays = moment(formattedToDate, 'DD-MM-YYYY').diff(moment(formattedFromDate, 'DD-MM-YYYY'), 'days') + 1;
  const [totalAmount, setTotalAmount] = useState();
  
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
    async function fetchdata() {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;
        setTotalAmount(data.costo * totalDays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchdata();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate: fromDate,
      todate: toDate,
      totalamount: totalAmount,
      totaldays: totalDays,

    };
    console.log("bookingDetails");
    console.log(bookingDetails);

    try {
      const data = await axios.post("/api/bookings/bookroom", bookingDetails);
      Swal.fire("Congratulazioni", "Prenotazione effettuata con successo", "success").then(result => {
        window.location.href = '/profile'
      })

      
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Qualcosa è andato storto", "error").then(result => {
        window.location.href = '/'
      }
      )
    }
  }

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
                  <p>Nome: {JSON.parse(localStorage.getItem('currentUser')).nome}</p>
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
                  <p>Totale: {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>Paga ora</button>
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
