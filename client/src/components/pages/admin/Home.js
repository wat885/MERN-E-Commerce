import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";

//fuction
import { listProduct, removeProduct } from "../../functions/product";
import AdminProductCard from "../../card/AdminProductCard";

// notify
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [product, setProduct] = useState([]);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    loadData(100);
  }, []);

  const loadData = (count) => {
    setLoding(true);
    listProduct(count)
      .then((res) => {
        setLoding(false);
        // console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoding(false);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    // console.log(id);
    if (window.confirm("Delete ?")) {
      removeProduct(user.token, id)
        .then((res) => {
          toast.success("Deleted " + res.data.title);
          console.log(res);
          loadData(100);
        })
        .catch((err) => {
          toast.error("Remove Error");
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          {loading ? <h1>Loading...</h1> : <h1>Home Admin</h1>}
          {/* {JSON.stringify(product)} */}

          <div className="row">
            {product.map((item) => (
              <div key={item._id} className="col-md-4 pb-3">
                <AdminProductCard product={item} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
