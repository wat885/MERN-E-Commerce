import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";

//functions
import { createCategory } from "../../functions/category";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
  });

  const handleChangeCategory = (e) => {
    // console.log(e.target.value);
    //เก็บค่า
    setValues({ ...values, name: e.target.value });
    // console.log(values.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values.name)
    createCategory(values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
