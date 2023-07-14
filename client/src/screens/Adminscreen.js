import React , {useState, useEffect} from "react";
import { Tabs, Icon } from 'antd';
import { FileAddOutlined, BookOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
    return (
        <div className="mt-3 ms-3 me-3 bs">
            <h2 className="text-center" style={{fontSize:'35px'}}>Pannello di controllo</h2>
            <Tabs defaultActiveKey="2">
                <TabPane
                    tab={
                        <span>
                            <BookOutlined />
                            Bookings
                        </span>
                    }
                    key="1"
                >
                    <Bookings/>
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
                    <h1>Rooms</h1>
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
                    <h1>Add Room</h1>
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
                    <h1>Users</h1>
                </TabPane>
            </Tabs>,
        </div>
    );
}

export default Adminscreen;

export function Bookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState();

    useEffect(async() => {
        try {
            const data = (await axios.get("/api/bookings/getallbookings")).data;
            setbookings(data);
            setloading(false);
        } catch (error) {
            console.log(error);
            setloading(false);
            setError(true);
        }
    }, []);


    return (
        <div className="row">
            <div className="col-md-10">
                {loading && (<Loader/>)}
                
                <h1>Bookings</h1>
            </div>
        </div>
    );
}