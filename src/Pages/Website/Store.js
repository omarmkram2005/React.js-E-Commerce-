import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { PRO } from "../../Api/Api";
import PaginatedItems from "../Dashboard/Pagination/Pagination";
import DealProducts from "./DealProducts";
import LoadingSupmit from "../../Components/Loading/Loading";

export default function Store() {
  const limite = 12;
  const [page, setPage] = useState(1);

  const [pro, setPro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    Axios.get(`/${PRO}?limit=${limite}&page=${page}`)
      .then((res) => {
        setPro(res.data.data);
        setTotal(res.data.total);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limite, page]);
  console.log(total);
  console.log(pro);
  useEffect(() => {
    setMoved((prev) => !prev);
  }, [page]);
  const dataShow = pro?.map((item, key) => {
    console.log(item.id);
    return (
      <DealProducts
        data={item}
        id={item.id}
        title={item.title}
        img={item.images[0].image}
        price={item.price}
        discount={item.discount}
        rate={item.rating}
        key={key}
        page={page}
      />
    );
  });
  return (
    <>
      {loading ? (
        <LoadingSupmit />
      ) : (
        <Container style={{ marginTop: "140px" }}>
          <Container className="d-flex flex-wrap gap-2 justify-content-center">
            {dataShow}
          </Container>
          <div className="mt-5">
            <PaginatedItems
              itemsPerPage={limite}
              data={pro}
              setpage={setPage}
              total={total}
              moved={moved}
            />
          </div>
        </Container>
      )}
    </>
  );
}
