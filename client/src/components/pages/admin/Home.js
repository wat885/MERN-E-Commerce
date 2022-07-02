import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";

//fuction
import { listProduct } from "../../functions/product";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    loadData(2);
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
          {JSON.stringify(product)}

        </div>
      </div>
    </div>
  );
};

export default Home;
