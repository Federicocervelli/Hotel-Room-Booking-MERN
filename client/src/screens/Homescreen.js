import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Button, DatePicker, Space } from 'antd';
import moment from 'moment'


const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [duplicateRooms, setDuplicateRooms] = useState([])

  const [searchKey, setSearchKey] = useState('')
  const [type, setType] = useState('Tutte')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("api/rooms/getallrooms")).data;
        console.log(data)
        setRooms(data);
        setDuplicateRooms(data)
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  function filterUnified() {
    //first filter by search
    var tempRooms = duplicateRooms.filter(room => room.nome.toLowerCase().includes(searchKey.toLowerCase()))

    // Then filter by type
    if (type !== 'Tutte') {
      var tempRoomsByType = tempRooms.filter(room =>
        room.tipo.toLowerCase() === type.toLowerCase()
      );
      tempRooms = tempRoomsByType;
    }

    // Then filter by date
    const tempRoomsByDate = tempRooms.filter(room => {
      if (room.prenotazioni_attuali.length === 0) {
        return true; // Room is available if no bookings
      }

      for (const booking of room.prenotazioni_attuali) {
        const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
        const bookingToDate = moment(booking.todate, "DD-MM-YYYY");
        const fromDateMoment = moment(fromDate, "DD-MM-YYYY");
        const toDateMoment = moment(toDate, "DD-MM-YYYY");


        //console.log(`${room.nome}: Booking from ${bookingFromDate} to ${bookingToDate}`);
        //console.log(`${room.nome}: Selected from ${fromDateMoment} to ${toDateMoment}`);

        const isOverlapping =
          bookingFromDate.isBetween(fromDateMoment, toDateMoment) ||
          bookingToDate.isBetween(fromDateMoment, toDateMoment) ||
          fromDateMoment.isBetween(bookingFromDate, bookingToDate) ||
          toDateMoment.isBetween(bookingFromDate, bookingToDate) ||
          fromDateMoment.isSame(bookingFromDate) ||
          toDateMoment.isSame(bookingToDate) ||
          fromDateMoment.isSame(bookingToDate) ||
          toDateMoment.isSame(bookingFromDate);

        if (isOverlapping) {
          //console.log(`Room ${room} is booked during the selected dates`);
          return false; // Room is booked during the selected dates
        }
      }

      return true; // Room is available for the selected dates
    });

    setRooms(tempRoomsByDate);


  }

  function filterByDate(dates) {
    //from date
    console.log(dates[0].format("DD-MM-YYYY"));
    setFromDate(dates[0].format("DD-MM-YYYY"));
    //to date
    console.log(dates[1].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-5">
          <RangePicker allowClear={false} format='DD-MM-YYYY' onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Cerca stanze"
            value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }}
          />
        </div>

        <div className="col-md-2">
          <select className="form-control" value={type} onChange={(e) => { setType(e.target.value)}}>
            <option value='Tutte'>Tutte</option>
            <option value='Standard'>Standard</option>
            <option value='Lussuosa'>Lussuosa</option>
            <option value='Economica'>Economica</option>
          </select>
        </div>
        
        <div className="mt-2">
          <div className="col-md-12">
            <Button className="btn btn-primary" style={{width: "100%"}} onClick={filterUnified}>Filtra</Button>
          </div>
        </div>
      </div>



      <div className="row justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return <div className="col-md-12 mt-3">
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          })
        )}
      </div>
    </div>
  )
}

export default Homescreen;
