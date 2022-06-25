import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

//fuction
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

const initialstate = {
  title: "Notebook",
  description: "DES",
  categories: [],
  category: "",
  price: "100",
  quantity: "5",
  images: [],
};

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  // console.log('user' , user)

  useEffect(() => {
    //
    loadData(user.token);
  }, []);

  const loadData = (authtokken) => {
    listCategory(authtokken)
      .then((res) => {
        // console.log(res.data);
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("values", values);

  const handleChange = (e) => {
    // console.log(e.target.name,e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value });
    //      มาจาก input      name="xxxx"      value={xxxxx}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success("Insert " + res.data.title + " Success!!");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Insert Error " + err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>Create Product Page</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className="btn btn-primary ">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
