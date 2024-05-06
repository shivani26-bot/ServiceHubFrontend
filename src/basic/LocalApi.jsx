import axios from "axios";
const BASE_URL = "http://localhost:9000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
// POST request
export const createPost = (postData) => {
  return axiosInstance.post("/service-provider/sign-up", postData);
};
