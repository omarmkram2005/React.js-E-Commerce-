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
  // console.log(products);
  const productShow = products.map((pro, key) => (
    <div key={key}>
      <DealProducts
        title={pro.title}
        img={pro.images[0].image}
        price={pro.price}
        discount={pro.discount}
        rate={pro.rating}
        id={pro.id}
      />
    </div>
  ));
  return (
    <Container className="d-flex  justify-content-center flex-wrap my-5">
      {loading ? (
        <>
          <div className="mx-2">
            <Skeleton height="500px" width="300px" />
          </div>{" "}
          <div className="mx-2">
            <Skeleton height="500px" width="300px" />
          </div>{" "}
          <div className="mx-2">
            <Skeleton height="500px" width="300px" />
          </div>{" "}
          <div className="mx-2">
            <Skeleton height="500px" width="300px" />
          </div>{" "}
        </>
      ) : (
        productShow
      )}
    </Container>
  );
}
