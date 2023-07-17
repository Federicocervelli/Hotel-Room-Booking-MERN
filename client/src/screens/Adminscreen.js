import React, { useState, useEffect } from "react";
import { Tabs, Icon } from 'antd';
import { FileAddOutlined, BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { set } from "mongoose";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {
        if (!localStorage.getItem("currentUser") || !JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <div className="mt-3 ms-3 me-3 bs">
            <h2 className="text-center" style={{ fontSize: '35px' }}>Pannello di controllo</h2>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <BookOutlined />
                            Bookings
                        </span>
                    }
                    key="1"
                >
                    <Bookings />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <HomeOutlined />
                            Rooms
                        </span>
                    }
                    key="2"
                >
                    <Rooms />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FileAddOutlined />
                            Add Room
                        </span>
                    }
                    key="3"
                >
                    <Addroom />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UserOutlined />
                            Users
                        </span>
                    }
                    key="4"
                >
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;

export function Bookings() {

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
                {loading && (<Loader />)}
                {bookings.length && (<h1>Ci sono {bookings.length} prenotazioni.</h1>)}
                <table className="table table-bordered table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export function Rooms() {

    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchRooms() {
            try {
                const data = (await axios.get("/api/rooms/getallrooms")).data;
                setrooms(data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                setError(error);
            }
        }
        fetchRooms();
    }, []);


    return (
        <div className="row">
            <div className="col-md-10">

                {loading && (<Loader />)}
                {rooms.length && (<h1>Ci sono {rooms.length} stanze.</h1>)}
                <table className="table table-bordered table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Room ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Costo giornaliero</th>
                            <th>Capacità</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.nome}</td>
                                <td>{room.tipo}</td>
                                <td>{room.costo}</td>
                                <td>{room.capienza}</td>
                            </tr>
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export function Users() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = (await axios.get("/api/users/getallusers")).data;
                setusers(data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                setError(error);
            }
        }
        fetchUsers();
    }, []);


    return (
        <div className="row">
            <div className="col-md-10">
                {loading && (<Loader />)}
                {users.length && (<h1>Ci sono {users.length} utenti.</h1>)}
                <table className="table table-bordered table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>User ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length && users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "SI" : "NO"}</td>
                            </tr>
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export function Addroom() {


    const [loading, setloading] = useState(false);
    const [error, setError] = useState();

    const [nome, setnome] = useState("");
    const [tipo, settipo] = useState("");
    const [costo, setcosto] = useState("");
    const [capienza, setcapienza] = useState("");
    const [descrizione, setdescrizione] = useState("");
    const [immagine1, setimmagine1] = useState("");
    const [immagine2, setimmagine2] = useState("");
    const [immagine3, setimmagine3] = useState("");

    async function addroom() {
        const newroom = {
            nome,
            tipo,
            costo,
            capienza,
            descrizione,
            urlimmagini: [immagine1, immagine2, immagine3]
        }
        try{
            setloading(true);
            const result = await axios.post("/api/rooms/addroom", newroom).data;
            console.log(result);
            setloading(false);
            Swal.fire("Fatto!", "Stanza aggiunta con successo!", "success").then(()=>{window.location.reload()});
        } catch(error) {
            setloading(false);
            console.log(error);
            Swal.fire("Errore!", "Qualcosa è andato storto!", "error")
        }

    }

    return (
        <div className="row">
            {loading && (<Loader />)}
            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="nome stanza" value={nome} onChange={(e)=>{setnome(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="costo giornaliero" value={costo} onChange={(e)=>{setcosto(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="capacità" value={capienza} onChange={(e)=>{setcapienza(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="descrizione" value={descrizione} onChange={(e)=>{setdescrizione(e.target.value)}}/>
            </div>
            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="tipo" value={tipo} onChange={(e)=>{settipo(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="URL Immagine 1" value={immagine1} onChange={(e)=>{setimmagine1(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="URL Immagine 2" value={immagine2} onChange={(e)=>{setimmagine2(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="URL Immagine 3" value={immagine3} onChange={(e)=>{setimmagine3(e.target.value)}}/>

                <div className="text-end">
                    <button className="btn btn-primary mt-3" onClick={addroom}>Aggiungi</button>
                </div>
            </div>
        </div>
    );
}