import DealProductsShow from "./DealProducts.Show";
import LatestProducts from "./LatestProducts";
import "./nav/nav.css";
import TopProducts from "./TopProducts";
import { Container } from "react-bootstrap";
export default function HomePage() {
  return (
    <>
      <conta className="home overflow-hidden w-100">
        <div className=" position-relative bg-main w-100 d-flex justify-content-between align-items-center gap-4">
          <div style={{ top: "20%" }} className="p-3 position-absolute left-10">
            <h1 style={{ fontSize: "65px" }} className="text-white ">
              Nice Shampoo
            </h1>
            <p className="text-white " style={{ fontSize: "25px" }}>
              Great Shampoo
            </p>
          </div>
        </div>
      </conta>
      <div>
        <h1
          style={{ marginLeft: "18px", marginTop: "25px" }}
          className="text-center">
          {" "}
          Top Products
        </h1>
        <DealProductsShow />
        <Container className=" d-flex justify-content-center gap-5 align-items-center flex-wrap">
          <TopProducts />
          <LatestProducts />
        </Container>
      </div>
    </>
  );
}
