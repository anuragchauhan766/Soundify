import { authHttpClient } from "@config/axiosConfig";
import { useEffect, useState } from "react";

function Userdatatest() {
  const [userdata, setuserdata] = useState("");
  async function getuserdata() {
    try {
      const res = await authHttpClient.get("/user");
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
