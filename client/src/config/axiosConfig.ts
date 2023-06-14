import axios from "axios";
// Set the default base URL for all axios requests

const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAccesstoken = (token: string) => {
  console.log(token);
  httpClient.defaults.headers.common["Authorization"] = "";
  delete httpClient.defaults.headers.common["Authorization"];
  if (token) {
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
export default httpClient;
