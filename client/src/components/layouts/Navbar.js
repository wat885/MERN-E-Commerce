import React from "react";

import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  DownSquareOutlined,
} from "@ant-design/icons";

//Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { SubMenu } = Menu;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  console.log("user Navbar", user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    // redirect ไป home
    navigate("/");
  };

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
        {/* to="/login"มาจากที่ตั้งใน Route */}
      </Menu.Item>

      {/* ถ้ามี user */}
      {user && (
        <>
          {/* {user.username} */}

          {/* <Menu.Item
            key="Logout"
            style={{ float: "right" }}
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            Logout
          </Menu.Item> */}

          <SubMenu
            style={{ float: "right" }}
            key="Logout"
            icon={<LogoutOutlined />}
            title={user.username}
          >
            <Menu.Item
              key="setting:1"
              onClick={logout}
              icon={<DownSquareOutlined />}
            >
              Logout
            </Menu.Item>
          </SubMenu>
        </>
      )}

      {/* ถ้าไม่มี user */}
      {!user && (
        <>
          <Menu.Item
            key="mail"
            style={{ float: "right" }}
            icon={<LoginOutlined />}
          >
            <Link to="/login">Login</Link>
            {/* to="/login"มาจากที่ตั้งใน Route */}
          </Menu.Item>

          <Menu.Item
            key="register"
            style={{ float: "right" }}
            icon={<UserAddOutlined />}
          >
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
