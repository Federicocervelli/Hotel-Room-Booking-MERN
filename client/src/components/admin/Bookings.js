import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import Swal from "sweetalert2";

function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        setError(error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        {loading && <Loader />}
        {bookings.length && <h1>Ci sono {bookings.length} prenotazioni.</h1>}
        <table className="table table-bordered table-dark">
          <thead className="thead-dark">
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => cancelBooking(booking._id, booking.roomid)}
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

export default Bookings;

async function cancelBooking(bookingid, roomid) {
  try {
      const result = await axios.post('/api/bookings/cancelbooking', { bookingid, roomid }).data
      Swal.fire('Congratulazioni', 'Prenotazione annullata con successo', 'success').then(result => {
          window.location.reload()
      })
  } catch (error) {
      console.log(error)
      Swal.fire('Oops...', 'Qualcosa è andato storto!', 'error')
  }
}
