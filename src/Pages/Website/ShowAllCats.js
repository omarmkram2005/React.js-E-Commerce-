import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { CAT } from "../../Api/Api";
import { Container } from "react-bootstrap";
export default function ShowAllCats() {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    Axios.get(`/${CAT}`).then((res) => setCat(res.data));
  }, []);
  const catsShow = cat?.map((cat, key) => (
    <div key={key} className="cat-card ">
      <div className="img overflow-hidden">
        <img className="z-1" src={cat.image} alt="" />
      </div>
      <p className="m-0 p-1  text-center text-truncate border-top bg-white z-0">
        {cat.title}
      </p>
    </div>
  ));
  return (
    <>
      <Container style={{ marginTop: "140px" }}>
        <div className="d-flex flex-wrap gap-2">{catsShow}</div>
      </Container>
    </>
  );
}
