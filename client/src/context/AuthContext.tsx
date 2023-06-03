import { ReactNode, createContext, useContext, useState } from "react";
import {
  AuthContextType,
  AuthResponse,
  Login,
  Signup,
  UserType,
} from "../types/AuthContext";
import axios from "../utils/axiosConfig";
import { isAxiosError } from "axios";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login: Login = async ({ email, password }) => {
    let err = "";
    setIsLoading(true);
    try {
      const { data, status } = await axios.post<AuthResponse>(
        "/auth/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (status === 200) {
        setUser(data.user);
        setIsLoading(false);
        err = "";
      }
    } catch (error) {
      if (isAxiosError(error)) {
        err = error.response?.data.error.message;
      } else {
        err = "Opps! Something Unexpected happens";
      }
    }

    setIsLoading(false);

    return err;
  };
  const signup: Signup = () => {
    return "helo";
  };

  const value = {
    user,
    login,
    signup,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
