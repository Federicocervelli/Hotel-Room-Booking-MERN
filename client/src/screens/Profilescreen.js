import react, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import { set } from 'mongoose';
import Loader from '../components/Loader';
import Error from '../components/Error';

const onChange = (key) => {
    console.log(key);
}

const items = [
    {
        key: '1',
        label: `Profile`,
        children: <MyProfile />,
    },
    {
        key: '2',
        label: `Bookings`,
        children: <MyBookings />,
    },
];

function Profilescreen() {



    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])


    return (
        <div className='ms-3 mt-3'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}

export default Profilescreen

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(() => {
        async function fetchBookings() {
            try {
                setloading(true)
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchBookings()
    }, [])

    return (
        <div>
            <div className="row ">
                <div className="col-md-6">
                    {loading && (<Loader />)}
                    {bookings && bookings.map(booking => {
                        return (
                        <div className="bs">
                                <h2>{booking.room}</h2>
                                <p><b>Check In:</b> {booking.fromdate}</p>
                                <p><b>Check Out</b>: {booking.todate}</p>
                                <p><b>Stato</b>: {booking.status == 'booked' ? 'Confermato' : 'Annullato'}</p>
                                <p><b>Prezzo totale</b>: {booking.totalamount}</p>
                                <div className='text-end'>
                                    <button className="btn btn-primary">Annulla</button>
                                </div>
                        </div>
                        )

                    })}
                </div>
            </div>
        </div>
    )
}

export function MyProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return (
        <div>
            <h1>My Profile</h1>
            <br />
            <h1><b>Nome</b>: {user.nome}</h1>
            <h1><b>Email</b>: {user.email}</h1>
            <h1>{user.isAdmin ? 'ADMIN ACCOUNT' : ''}</h1>

        </div>
    )
}