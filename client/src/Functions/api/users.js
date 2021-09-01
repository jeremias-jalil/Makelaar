import axios from 'axios'
require('dotenv').config()
const BACK_SERVER = process.env.REACT_APP_BACK_SERVER

export async function getAllUserApi() {
    try {
        const allUsers = await axios.get(`${BACK_SERVER}/users/AllUsers`).data
        return allUsers
    } catch (err) {
        throw err
    }
}
