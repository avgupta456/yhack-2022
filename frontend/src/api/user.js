import axios from "axios";

import { BACKEND_URL } from "../constants";

const verifyLogin = async (email, password) => {
  try {
    const fullUrl = `${BACKEND_URL}/users/login`;
    const response = await axios.post(fullUrl, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { verifyLogin };
