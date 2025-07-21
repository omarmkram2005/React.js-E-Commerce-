import axios from "axios";
import { useEffect } from "react";
import { baseURL, GOOGLE_CALLBACK } from "../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallback() {
  const location = useLocation();
  const cookie = Cookie();
  console.log(location.search);
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALLBACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
        window.location.pathname = "/";
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
  return <h1>hi</h1>;
}
