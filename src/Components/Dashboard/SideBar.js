import { Navigate, NavLink } from "react-router-dom";
import "./bars.css";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { links } from "./Navlinks";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";

export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowSize = useContext(WindowSize);
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => {
        <Navigate path="/login" replace={true} />;
      });
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          backgroundColor: "black",
          opacity: "0.4",
          display: windowSize.windowSize < "768" && isOpen ? "block" : "none",
        }}></div>
      <div
        className="side-bar pt-3 "
        style={{
          width: isOpen ? "220px" : "fit-content",
          height: "117vh",
          left: windowSize.windowSize < "768" ? (isOpen ? "0" : "-100%") : "0",
          position: windowSize.windowSize < "768" ? "fixed" : "sticky",
        }}>
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 16px" }}
                className="d-flex align-items-center gap-2 side-bar-link">
                <p className="m-0" style={{ fontWeight: "bold" }}>
                  {link.icon}
                </p>
                <p
                  className="m-0"
                  style={{ display: isOpen ? "block" : "none" }}>
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
