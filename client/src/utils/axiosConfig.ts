
import axios from "axios";
// Set the default base URL for all axios requests
axios.defaults.baseURL = "http://localhost:3000/api";

// Set the default headers for all axios requests
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
