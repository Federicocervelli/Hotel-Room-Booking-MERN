import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";
import Room from "../components/Room";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
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

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading....</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => {
              return <div className="col-md-9 mt-2">
                <Room room={room}/>
              </div>
          })
        )}
      </div>
    </div>
  )
}

export default Homescreen;
