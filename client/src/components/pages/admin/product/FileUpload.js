import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";

const FileUpload = () => {
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
            console.log(uri);
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
