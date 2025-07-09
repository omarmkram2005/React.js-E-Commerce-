import Footer from "../../Components/Footer";
import DealProductsShow from "./DealProducts.Show";
import LatestProducts from "./LatestProducts";
import "./nav/nav.css";
import TopProducts from "./TopProducts";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function HomePage() {
  console.log(window.innerWidth);
  return (
    <>
      <div className="home overflow-hidden w-100 mt-5">
        <div className=" position-relative bg-main w-100 d-flex  align-items-start ">
          <Container className="p-3 mt-5">
            <h1 style={{ fontSize: "65px" }} className="text-white ">
              Nice Laptop
            </h1>
            <p
              className=" "
              style={{
                fontSize: "20px",
                color: "lightgray",
                width: window.innerWidth > 570 ? "50%" : "100%",
              }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              reprehenderit commodi fuga nam quos sequi asperiores iste odit
              nemo deserunt ipsum voluptate, blanditiis atque fugiat incidunt,
              nihil expedita architecto adipisci.
            </p>
            <button className="base-btn white-btn">
              {
                <NavLink className={"white-btn"} to="/store">
                  Shop Now
                </NavLink>
              }
            </button>
          </Container>
        </div>
      </div>

      <Container className=" d-flex justify-content-center gap-5 align-items-center flex-wrap">
        <DealProductsShow />
        <LatestProducts />
        <TopProducts />
      </Container>
      <Footer />
    </>
  );
}
