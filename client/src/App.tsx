import Signin from "./components/Auth/Signin";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
