import logo from "../../assets/appLogo.svg";
import { NavLink as RouterNavLink } from "react-router-dom";

import { Link } from "@mui/material";
import Signupform from "@components/Form/Signupform";

function Signup() {
  return (
    <div className="w-full  flex  justify-center bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 ">
      <div className="w-full max-w-3xl  bg-black rounded-xl text-white p-2 sm:p-20 sm:pt-0 ">
        <div className="w-full flex items-center justify-center my-10">
          <img src={logo} alt="soundify-logo" className="w-24 sm:w-60" />
        </div>
        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Signup Now
        </h1>
        <hr className="w-full   border-t-2 border-t-orange-200 my-16" />
        <Signupform />
        <div className="text-sm w-full text-center my-10">
          <span>Already have an account? </span>
          <Link to="/auth/signin" component={RouterNavLink}>
            <span className="text-ctc">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
