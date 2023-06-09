import Signin from "./pages/Auth/Signin";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Profile from "./components/Profile/Profile";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import Resetpassword from "./pages/Auth/Resetpassword";
import EmailVerfication from "./pages/Auth/EmailVerfication";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="w-full h-auto pt-[72px]">
        <Outlet />
      </div>
    </>
  );
}
function App() {
  return (
    <div className="w-full h-full ">
      <Routes>
        // with navbar pages
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Profile />}></Route>
        </Route>
        // without navbar pages
        <Route path="/auth/signin" element={<Signin />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/auth/resetpassword" element={<Resetpassword />}></Route>
        <Route
          path="/auth/emailverification"
          element={<EmailVerfication />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
