import Signin from "./components/Auth/Signin";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Profile from "./components/Profile/Profile";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App() {
  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
