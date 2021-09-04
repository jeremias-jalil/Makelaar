import axios from "axios";
require("dotenv").config();
const BACK_SERVER =
  process.env.REACT_APP_BACK_SERVER || "http://localhost:3010";

export async function getAllUserApi() {
  try {
    const allUsers = await axios.get(`${BACK_SERVER}/users/AllUsers`);
    return allUsers.data;
  } catch (err) {
    throw err;
  }
}

export async function registerUser(user) {
  try {
    const response = await axios.post(`${BACK_SERVER}/users/signup`, user);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getUserByIdApi(id) {
    try {
<<<<<<< HEAD
        const userbyid = await axios.get(`${BACK_SERVER}/users/${id}`)
=======
      console.log("ID", id)
        const userbyid = await axios.get(`${BACK_SERVER}/users/${id}`)
        console.log("userId", userbyid)
>>>>>>> dev
        return userbyid.data
    } catch (err) {
        throw err
    }
}