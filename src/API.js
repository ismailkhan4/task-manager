const { default: axios } = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const apiInstanceHouser = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    accept: "application/json",
    "x-user-id": "UniqueUserIdentifier",
    "content-type": "application/json",
    "x-api-key": process.env.PORPERTIES_KEY,
  },
});

apiInstanceHouser.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = { apiInstanceHouser };
