import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));


  const handleChangeFile = (e) => {
    const files = e.target.files;
    // console.log(e.target.files);
    if (files) {
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
              .then((res) => console.log(res))
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
