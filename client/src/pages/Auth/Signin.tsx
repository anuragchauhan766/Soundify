import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import React, { useState } from "react";

import { useAuth } from "@src/context/AuthContext";
import PasswordField from "@components/Form/PasswordField";

function Signin() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = await login({ email, password });
    console.log(err);
  };

  return (
    <div className="w-full  flex  justify-center bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 ">
      <div className="w-full max-w-3xl  bg-black rounded-xl text-white p-2 sm:p-20">
        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Sign in to Soundify
        </h1>
        <hr className="w-full  border-t-2 border-t-orange-200 my-16" />

        <form
          className="flex flex-col shrink w-full items-center space-y-7 px-4 sm:p-0"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col w-full sm:w-1/2 flex-1 space-y-2">
            <label htmlFor="email" className="text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full text-white text-base font-semibold p-2 rounded-md outline-none border-none appearance-none  bg-[#121212] hover:outline-1 hover:outline-teal-50 shadow-slate-300/40 focus:border-5 focus:border-white"
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 flex-1 space-y-2">
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <PasswordField password={password} setPassword={setPassword} />
          </div>
          <div className="w-full sm:w-1/2">
            <button
              type="submit"
              className="border-none rounded-full bg-ctc p-3 text-lg font-bold w-full  hover:scale-110"
            >
              Sign In
            </button>
          </div>
          <div className="text-sm">
            <Link
              to="/auth/forgotpassword"
              component={RouterNavLink}
              className="text-white underline hover:text-ctc"
            >
              <span>Forgot Your Password?</span>
            </Link>
          </div>
        </form>

        <hr className="w-full  border-t-2 border-t-orange-200 my-10" />
        <div className="text-sm w-full text-center my-10">
          <span>Don't have an account? </span>
          <Link
            to="/auth/signup"
            component={RouterNavLink}
            className="text-white  hover:text-ctc"
          >
            <span>Sign up for Soundify</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
