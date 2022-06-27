import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));

  // console.log("values in fileupload", values);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    // console.log(e.target.files);
    if (files) {
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
                // console.log(res);
                allfileUpload.push(res.data);
                console.log("allfileupload in then", allfileUpload);
                setValues({...values, images:allfileUpload})
              })
              .catch((err) => console.log(err));
          },
          "base64"
        );
      }
    }
  };
  return (
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
  );
};

export default FileUpload;
