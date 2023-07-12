import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
//import 'antd/dist/antd.less';
import Error from "../components/Error";
import { DatePicker, Space } from 'antd';
import moment from 'moment'


const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const[fromDate, setFromDate] = useState()
  const[toDate, setToDate] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("api/rooms/getallrooms")).data;
        console.log(data)
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates)
  {
    setFromDate(moment(dates[0].$d).format('DD-MM-YYYY'))
    setToDate(moment(dates[1].$d).format('DD-MM-YYYY'))
  }

  return (
    <div className="container">


      <div className="row mt-5">
        <div className="col-md-5">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) : rooms.length>1 ? (
          rooms.map((room) => {
              return <div className="col-md-9 mt-3">
                <Room room={room} fromDate = {fromDate} toDate={toDate}/>
              </div>
          })          
        ) : (
          <Error/>
        )}
      </div>
    </div>
  )
}

export default Homescreen;
