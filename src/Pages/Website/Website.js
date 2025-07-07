import { Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";
import CartContext from "../../Context/CartContext";

export default function Website() {
  return (
    <>
      <CartContext>
        <NavBar />
      </CartContext>
      <Outlet />
    </>
  );
}
