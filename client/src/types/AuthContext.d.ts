import { UserType } from "./User";

export interface LoginProps {
  email: string;
  password: string;
}

export type Login = ({ email, password }: LoginProps) => Promise<string>;
export type Signup = ({
  name,
  email,
  dob,
  gender,
  password,
}: UserType) => Promise;
export interface AuthContextType {
  user: User | null;
  login: Login;
  signup: Signup;
}

export interface AuthResponse {
  success: boolean;
  user?: UserType;
  acccessToken?: string;
  error?: object;
}
