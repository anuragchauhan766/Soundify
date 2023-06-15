import { getAccessToken, setAccesstoken } from "@src/helper/accesstoken";
import { AuthResponse } from "@src/types/AuthContext";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { redirect } from "react-router-dom";
// Set the default base URL for all axios requests

const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const authHttpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    const response = await httpClient.get<AuthResponse>("/auth/refresh");
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    redirect("/auth/signin");
    console.log(error);
  }
};

authHttpClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    let accessToken = getAccessToken();
    console.log("accesstoken", accessToken);
    if (!accessToken) {
      accessToken = (await refreshAccessToken()) as string;
      setAccesstoken(accessToken);
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

authHttpClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<AuthResponse>) => {
    console.log(error);
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      error.response.data.error?.name === "TokenExpiredError"
    ) {
      try {
        const accessToken = (await refreshAccessToken()) as string;
        setAccesstoken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authHttpClient.request(originalRequest);
      } catch (error) {
        redirect("/auth/signin");
        console.log(error);
      }
    }
  }
);

export { httpClient, authHttpClient };
