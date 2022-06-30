import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  // console.log("values in fileupload", values);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    // console.log(e.target.files);
    if (files) {
      setLoading(true);

      let allfileUpload = values.images; //[]
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                // console.log(res);
                allfileUpload.push(res.data);
                console.log("allfileupload in then", allfileUpload);
                setValues({ ...values, images: allfileUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true)
    // console.log(public_id);
    // const img = values.images
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id  // กรองออก 
        });
        setValues({...values, images: filterImages});
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };
  return (
    <>
      <br />
      {values.images &&
        values.images.map((c) => (
          <span className="avatar-item">
            <Badge
              // key={c.public_id}
              onClick={() => handleRemove(c.public_id)}
              count="X"
              style={{ cursor: "pointer" }}
            >
              <Avatar className="m-3" src={c.url} shape="square" size={120} />
            </Badge>
          </span>
        ))}

      <hr />

      <div className="form-group">
        <label className="btn btn-primary">
          Choose File...
          <input
            onChange={handleChangeFile}
            className="form-control"
            type="file"
            hidden
            multiple
            accept="images/*"
            name="file"
          />
        </label>
      </div>
      <br />
    </>
  );
};

export default FileUpload;
