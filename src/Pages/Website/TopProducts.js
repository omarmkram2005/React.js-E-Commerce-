import { useEffect, useState } from "react";
import { topRated } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import Skeleton from "react-loading-skeleton";
import { Container } from "react-bootstrap";
import DealProducts from "./DealProducts";
export default function TopProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`/${topRated}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);
  const dataShow = data
    .slice(0, 3)
    .map((pro, key) => (
      <DealProducts
        data={pro}
        title={pro.title}
        price={pro.price}
        img={pro.images[0].image}
        discount={pro.discount}
        rate={pro.rating}
        id={pro.id}
        key={key}
      />
    ));

  return (
    <>
      <div className=" w-100 h-auto ">
        <h1
          style={{ marginLeft: "18px", marginTop: "25px" }}
          className="text-center">
          Top Rated
        </h1>
      </div>
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
          </Container>
        ) : (
          dataShow
        )}
      </Container>
    </>
  );
}
