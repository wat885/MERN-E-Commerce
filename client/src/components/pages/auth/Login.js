import React, { useState } from "react";
// fuction
import { login } from "../../functions/auth";
// redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Spin } from 'antd';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false)

  // ตรวจ role แล้ว redirect ไปตาม role
  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };

  const handleChange = (e) => {
    //เอาค่ามาจาก form โดย use state เก็บไว้ใน object value รอส่ง
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true)

    e.preventDefault(); // ไม่ refresh
    console.log("Submit", value);

    // ไปตรวจสอบที่หลังบ้าน
    login(value)
      .then((res) => {
        setLoading(false)
        // console.log('res',res.data);
        // alert(res.data);
        toast.success(res.data.payload.user.username+ ' Login Success');

        // ส่งค่าไปที่ store
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });
        // console.log(res.data.payload.user.role); //role

        // เก็บ token ที่ localStorage
        localStorage.setItem("token", res.data.token);

        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading
          ? <h1>loading... <Spin/></h1>
          : <h1>Login page</h1>
          }


          

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="text"
                name="password"
                onChange={handleChange}
              />
            </div>

            <br />

            <button className="btn btn-success">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
