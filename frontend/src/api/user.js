import axios from "axios";

import { BACKEND_URL } from "../constants";

const signUp = async (name, email, password) => {
  try {
    const fullUrl = `${BACKEND_URL}/users`;
    const response = await axios.post(fullUrl, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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

export { signUp, verifyLogin };
