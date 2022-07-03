import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  //   console.log(product);
  const { _id, title, description, images } = product;
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
      actions={[
        <Link to={"/admin/update-product/" + _id}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(_id)}
        />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
