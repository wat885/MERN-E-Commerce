import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//functions
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const {user} =  useSelector((state)=>({... state}))

  console.log('state user ', user.token)

  const [values, setValues] = useState({
    name: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("data category", category);

  const handleRemove = (id) => {
    deleteCategory(user.token , id)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success('Remove Data'+ res.data.name + " Success!!!")
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error! Remove Data')
      });
  };

  const handleChangeCategory = (e) => {
    // console.log(e.target.value);
    //เก็บค่า
    setValues({ ...values, name: e.target.value });
    // console.log(values.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values.name)
    createCategory(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success('Inser Data'+ res.data.name + " Success!!!")
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error! Inser Data')
      });

    // setValues({ ...values, name: "" });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>Create Category</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สิ่นค้า</label>
              <input
                type="text"
                name="name"
                value={values.name}
                className="form-control"
                onChange={handleChangeCategory}
              />
              <button className="btn btn-outline-primary">เพิ่ม</button>
            </div>
          </form>

          <hr />

          <ul className="list-group">
            {category.map((item) => (
              <li className="list-group-item">
                {item.name}
                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                  onClick={() => handleRemove(item._id)}
                >
                  x
                </span>
                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                >
                  {/* <Link to={`/admin/update-category/${item._id}`}> */}
                  <Link to={"/admin/update-category/" + item._id}>
                    {/* tag a  */}
                    Edit
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
