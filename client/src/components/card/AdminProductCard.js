import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined className="text-danger" />,
      ]}
    >
      >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
