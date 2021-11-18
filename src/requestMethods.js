import axios from "axios";
const BASE_URL = "https://front-test-api.herokuapp.com/api/";
export const request = axios.create({
  baseURL: BASE_URL,
});
