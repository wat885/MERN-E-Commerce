import { Card } from "antd";
import React from "react";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  //   console.log(product);
  const { title, description, images } = product;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          alt="example"
          src={images && images.length ? images[0].url : ""}
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
