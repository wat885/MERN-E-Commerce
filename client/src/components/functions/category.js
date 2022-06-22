import axios from "axios";

export const createCategory = async (value) => {
  return await axios.post(process.env.REACT_APP_API + "/category", value);
};

export const listCategory = async () =>
  await axios.get(process.env.REACT_APP_API + "/category");
