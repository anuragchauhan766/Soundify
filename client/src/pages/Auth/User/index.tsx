import httpClient from "@config/axiosConfig";
import { useEffect, useState } from "react";

function Userdatatest() {
  const [userdata, setuserdata] = useState("");
  async function getuserdata() {
    try {
      const res = await httpClient.get("/auth/refresh");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getuserdata();
  }, [userdata]);

  return <div>Userdatatest</div>;
}

export default Userdatatest;
