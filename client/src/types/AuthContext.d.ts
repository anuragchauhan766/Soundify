import { LoginDataType, SignupDataType, UserDataType } from "./User";

export type Login = ({ email, password }: LoginDataType) => Promise<string>;
export type Signup = ({
  name,
  email,
  dob,
  gender,
  password,
}: SignupDataType) => Promise;
export interface AuthContextType {
  user?: Partial<UserDataType>;
  login: Login;
  signup: Signup;
}

export interface AuthResponse {
  success: boolean;
  user?: Partial<UserDataType>;
  accessToken?: string;
  error?: object;
}
