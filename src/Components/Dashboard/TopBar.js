import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { Navigate } from "react-router-dom";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const cookie = Cookie();
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setUsername(data.data.name);
      })
      .catch(() => {
        Navigate("/login", { replace: true });
      });
  }, []);
  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-bar w-100 d-flex align-items-center justify-content-between">
      <div className="d-flex w-100 align-items-center justify-content-between ">
        <div className="d-flex gap-4 align-items-center justify-content-between ">
          <div>
            <a href="/">
              <img
                height={"50px"}
                src={require("../../Assits/Orange Black Online Shopping Logo (1).png")}
                alt="logo"
              />
            </a>
          </div>
          <h3
            onClick={() => setIsOpen((prev) => !prev)}
            style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </h3>
        </div>
        <div className="d-flex align-items-center justify-content-between ">
          <p className="m-0"> {username}</p>
          <button
            style={{ marginLeft: "20px" }}
            className="base-btn border-0 d-block"
            onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}
