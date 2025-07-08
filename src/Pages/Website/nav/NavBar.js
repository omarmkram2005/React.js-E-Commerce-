import { Form } from "react-bootstrap";
import "./nav.css";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CAT } from "../../../Api/Api";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Cart from "../Cart";
import { openCart } from "../../../Context/CartContext";
import Skeleton from "react-loading-skeleton";
export default function NavBar() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsCountNow, setItemsCountNow] = useState(0);
  const { isOpen, setIsOpen } = useContext(openCart);
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => {
        setCats(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  setInterval(() => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart"));
    const itemsCount = cartItems?.reduce(
      (total, item) => total + item.count,
      0
    );
    setItemsCountNow(itemsCount);
  }, 1000);

  const catsToShow = cats.slice(-5, cats.length);
  return (
    <div className="nav">
      <Container className="things-container">
        <div>
          <Link to="/">
            <img
              width={"150px"}
              src={require("../../../Assits/Orange Black Online Shopping Logo (1).png")}
              alt="logo"
            />
          </Link>
        </div>
        <Form.Control
          name="search"
          width={"150px"}
          className="search-nav"
          type="search"
          placeholder="search..."></Form.Control>
        <div className="icons-nav d-flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 448 512">
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
          </svg>
          <div className="position-relative">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {itemsCountNow}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 16 16"
              onClick={() => setIsOpen(true)}
              id="cart">
              <path
                fill="#444"
                d="M14 13.1V12H4.6l.6-1.1 9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5 5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4zM4 5h10.7l-1.1 4-8.4.9L4 5z"></path>
            </svg>
          </div>
        </div>
      </Container>
      <div className="cats-nav w-100 d-flex justify-content-center align-items-center gap-2">
        {loading ? (
          <>
            <Skeleton width={75} height={25} />
            <Skeleton width={75} height={25} />
            <Skeleton width={75} height={25} />
            <Skeleton width={75} height={25} />
            <Skeleton width={75} height={25} />
          </>
        ) : (
          catsToShow.map((cat, key) => (
            <a
              className="text-decoration-none text-black text-truncate"
              style={{ width: "75px" }}
              key={key}
              href="/">
              {cat.title}
            </a>
          ))
        )}
        <Link to="/categories" className="m-0">
          Show More
        </Link>
      </div>
      {openCart ? <Cart /> : ""}
    </div>
  );
}
