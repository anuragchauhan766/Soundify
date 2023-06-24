// import { authHttpClient } from "@config/axiosConfig";
import useAuthHttpClient from "@src/hooks/useAuthHttpClient";
import { isAxiosError } from "axios";

import { useEffect, useState } from "react";

function Userdatatest() {
  // const [userdata, setuserdata] = useState("");
  const authHttpClient = useAuthHttpClient();
  async function getuserdata() {
    try {
      const res = await authHttpClient.get("/user");
      console.log(res);
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
    }
  }

  useEffect(() => {
    getuserdata();
  }, []);

  return <div>Userdatatest</div>;
}

export default Userdatatest;
