import React, { useState, useEffect } from "react";
import { Tabs, Icon } from "antd";
import {
  FileAddOutlined,
  BookOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Rooms from "../components/admin/Rooms";
import Users from "../components/admin/Users";
import Bookings from "../components/admin/Bookings";
import Addroom from "../components/admin/AddRoom";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (
      !localStorage.getItem("currentUser") ||
      !JSON.parse(localStorage.getItem("currentUser")).isAdmin
    ) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="mt-3 ms-3 me-3 bs">
      <h2 className="text-center" style={{ fontSize: "35px" }}>
        Pannello di controllo
      </h2>
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