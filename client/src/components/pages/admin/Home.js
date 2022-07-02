import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";

//fuction
import { listProduct } from "../../functions/product";
import AdminProductCard from "../../card/AdminProductCard";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    loadData(5);
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
                <AdminProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
