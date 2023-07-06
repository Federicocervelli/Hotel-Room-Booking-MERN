import React from "react";

function Room({ room }) {
  return (
    <div>
      <div className="row bs">
        <div className="col-md-4">
          <img src={room.urlimmagini[0]} className="smallimg" />
        </div>
        <div className="col-md-7">
          <h1>{room.nome}</h1>
          <b>
            <p>Capienza: {room.capienza}</p>
            <p>Tipo: {room.tipo}</p>
            <p>Costo: {room.costo}</p>
          </b>

          <div style={{ float: "right" }}>
            <button className="btn btn-primary">Dettagli</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
