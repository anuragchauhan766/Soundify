import React, { useState } from "react";
import logo from "../../assets/appLogo.svg";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="w-full  flex  justify-center bg-gradient-to-r from-neutral-800 to-neutral-900 p-8">
      <div className="w-full max-w-3xl  bg-black rounded-xl text-white p-2 sm:p-20">
        <div className="w-full flex items-center justify-center my-10">
          <img src={logo} alt="soundify-logo" className="w-24 sm:w-60" />
        </div>
        <hr className="w-full  border-t-2 border-t-orange-200 my-10" />

        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Password Reset
        </h1>
        <p className="px-5 sm:px-32 text-center font-medium text-lg my-10">
          Enter Your{" "}
          <span className="text-ctc">
            <b>Email address</b>
          </span>{" "}
          that you used to register. We'll send you an email with your name and
          a link to reset your password.
        </p>
        <form
          className="flex flex-col shrink w-full items-center space-y-10 px-4 sm:p-0 my-10"
          onSubmit={handlesubmit}
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

          <div className="w-full sm:w-1/2 ">
            <button
              type="submit"
              className="border-none rounded-full bg-ctc p-3 text-lg font-bold w-full  hover:scale-110"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
