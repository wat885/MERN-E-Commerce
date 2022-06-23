import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//fuction
import { EditCategory, ReadCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
//      พารา        ใช้กลับไปหน้าเดิม
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const param = useParams();
  // console.log(param.id)

  const [name, setName] = useState("");
  useEffect(() => {
    //
    loadData(user.token, param.id);
  }, []);

  const loadData = (authtoken, id) => {
    ReadCategory(authtoken, id)
      .then((res) => {
        // console.log(res.data.name);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(name);
  // console.log(param.id)

  const handleSubmit = (e) => {
    console.log(name);
    e.preventDefault();
    EditCategory(user.token, param.id, { name })
      .then((res) => {
        navigate("/admin/create-category");
        toast.success("Update " + res.data.name + " Success!!");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>Hello Update Page</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Update Category</label>
              <input
                className="form-control"
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-outline-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
