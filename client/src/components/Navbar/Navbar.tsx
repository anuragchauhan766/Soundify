import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/appLogo.svg";
import AccountMenu from "./AccountMenu";
function Navbar() {
  return (
    <nav className="flex items-center justify-center w-full h-[72px] bg-primary-main z-[10] border-b-2 border-b-primary-light fixed">
      <ul className="flex items-center justify-around w-full h-full cursor-pointer list-none justify-items-start max-w-[1600px] ms-auto me-auto pe-6">
        <li className="grow basis-auto shrink-0 pe-5">
          <Link to="/" className="" component={RouterNavLink}>
            <img src={logo} alt="soundify-logo" className="w-24 sm:w-32" />
          </Link>
        </li>
        <li className="grow-0 basis-auto shrink-0 me-5 p-3">
          <Link
            to="/Home"
            className="flex items-center text-white text-xl space-x-2"
            component={RouterNavLink}
          >
            <HomeIcon
              sx={{
                fontSize: 30,
              }}
            />
            <span className="hidden lg:inline-block">HOME</span>
          </Link>
        </li>
        <li className="grow-0 basis-auto shrink-0 p-3 me-5">
          <Link
            to="/"
            className="flex items-center text-white text-xl space-x-2"
            component={RouterNavLink}
          >
            <ExploreIcon
              sx={{
                fontSize: 30,
              }}
            />
            <span className="hidden lg:inline-block ">EXPLORE</span>
          </Link>
        </li>
        <div className="flex relative shrink w-auto sm:w-full h-full ">
          <form autoComplete="off">
            <input
              type="search"
              placeholder="search.."
              className="text-base appearance-none cursor-pointer hidden sm:block absolute top-0 bottom-0 ps-10 pe-14 rounded-3xl border-none outline-none w-64 h-9 m-auto focus:w-full focus:h-12 transition-all ease-in-out duration-100 end-0"
            />
          </form>
          <div className="hidden sm:flex absolute h-full items-center end-[22px]">
            <SearchIcon
              sx={{
                fontSize: 25,
              }}
            />
          </div>
          <div className="flex sm:hidden w-auto h-full items-center me-5">
            <Link to="/search" component={RouterNavLink}>
              <SearchIcon
                sx={{
                  fontSize: 30,
                  color: "ctc.main",
                }}
              />
            </Link>
          </div>
        </div>
        <li className="grow-0 basis-auto shrink-0">
          <AccountMenu />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
