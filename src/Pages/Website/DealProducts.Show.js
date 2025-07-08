import "../../Css/productsDeals.css";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { latestSale } from "../../Api/Api";
import DealProducts from "./DealProducts";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export default function DealProductsShow() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${latestSale}`).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);
  const productShow = products.map(
    (pro, key) =>
      key < 4 && (
        <DealProducts
          title={pro.title}
          img={pro.images[0].image}
          price={pro.price}
          discount={pro.discount}
          rate={pro.rating}
          id={pro.id}
        />
      )
  );
  return (
    <>
      <h1
        style={{ marginLeft: "18px", marginTop: "25px" }}
        className="text-center">
        Top Sail Products
      </h1>
      <Container className="d-flex gap-2 justify-content-center flex-wrap my-5">
        {loading ? (
          <Container className="d-flex gap-2  justify-content-center flex-wrap my-5">
            <div>
              <Skeleton height="500px" width="300px" />
            </div>{" "}
            <div>
              <Skeleton height="500px" width="300px" />
            </div>{" "}
            <div>
              <Skeleton height="500px" width="300px" />
            </div>{" "}
            <div>
              <Skeleton height="500px" width="300px" />
            </div>{" "}
          </Container>
        ) : (
          productShow
        )}
      </Container>
    </>
  );
}
