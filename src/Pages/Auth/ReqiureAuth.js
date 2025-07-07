import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import { Axios } from "../../Api/axios";
import Err403 from "./Err403";
export default function ReqiureAuth({ allowedRole }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);
  const cookie = Cookie();

  const token = cookie.get("e-commerce");
  return token ? (
    user === "" ? (
      <LoadingSupmit />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
