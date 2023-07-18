import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="row bs">
        <div className="col-md-4">
          <img src={room.urlimmagini[0]} className="smallimg" />
        </div>
        <div className="col-md-7">
          <h1><b>{room.nome}</b></h1>
          <div>Ospiti massimi: <b>{room.capienza}</b></div>
          <div>{room.tipo}</div>
          <div>{room.costo}€ al giorno</div>
          <div className="float-end float-bottom">

            {(fromDate && toDate) &&(
              <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                <button className="btn btn-primary me-2" >Prenota Ora</button>
              </Link>
            )}
            
            <button className="btn btn-primary" onClick={handleShow}>
              Dettagli
            </button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header>
            <Modal.Title>{room.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {room.urlimmagini.map((url) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <p>{room.descrizione}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Room;
