import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bookingscreen() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [room, setRoom] = useState();

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
    fetchdata()}, []);

  return (
    <div>
        <h1>{roomid}</h1>
    </div>
  );
}

export default Bookingscreen;