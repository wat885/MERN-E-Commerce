import axios from "axios";

export const createProduct = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/product", value, {
    headers: {
      authtoken,
    },
  });
};

export const listProduct = async (count) => {
  return await axios.get(process.env.REACT_APP_API + "/product/" + count);
};

export const removeProduct = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/product/" + id, {
    headers: {
      authtoken,
    },
  });
};
