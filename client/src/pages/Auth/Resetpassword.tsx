import React, { useState } from "react";
import logo from "../../assets/appLogo.svg";
import PasswordField from "../../components/Form/PasswordField";

function Resetpassword() {
  const [password, setPassword] = useState<string>("");
  const [Cpassword, setCPassword] = useState<string>("");

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(password, Cpassword);
  };
  return (
    <div className="w-full  flex  justify-center bg-gradient-to-r from-neutral-800 to-neutral-900 p-8">
      <div className="w-full max-w-3xl  bg-black rounded-xl text-white p-2 sm:p-20 sm:pt-0">
        <div className="w-full flex items-center justify-center my-10">
          <img src={logo} alt="soundify-logo" className="w-24 sm:w-60" />
        </div>
        <hr className="w-full  border-t-2 border-t-orange-200 my-10" />

        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Password Reset
        </h1>
        <form
          className="flex flex-col shrink w-full items-center space-y-10 px-4 sm:p-0 my-10"
          onSubmit={handlesubmit}
        >
          <div className="flex flex-col w-full sm:w-1/2 flex-1 space-y-2">
            <label htmlFor="password" className="text-xl font-bold">
              New Password
            </label>
            <PasswordField password={password} setPassword={setPassword} />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 flex-1 space-y-2">
            <label htmlFor="cpassword" className="text-xl font-bold">
              Confirm New Password
            </label>
            <PasswordField password={Cpassword} setPassword={setCPassword} />
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

export default Resetpassword;
