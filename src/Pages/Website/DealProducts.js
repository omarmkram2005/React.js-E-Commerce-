import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CART, Pro } from "../../Api/Api";
import { Axios } from "../../Api/axios";
export default function DealProducts(props) {
  const [loadingCart, setloadingCart] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(0);
  const id = props.id;
  useEffect(() => {
    setProduct(props.data);
    console.log(props.data);
  }, [props.page]);
  useEffect(() => {
    setTimeout(() => {
      setError(0);
    }, 2000);
  }, [error]);
  const roundRate = Math.round(props.rate);

  let dumpArray = [0, 0, 0, 0, 0];
  const rateShow = dumpArray.map((d, ind) =>
    ind < roundRate ? (
      <svg
        key={ind}
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
        viewBox="0 0 24 24"
        width={20}
        fill="#ffb514"
        height={20}
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
          fillRule="nonzero"
        />
      </svg>
    ) : (
      <svg
        key={ind}
        width={20}
        height={20}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fillRule="evenodd"
        clipRule="evenodd">
        <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
      </svg>
    )
  );
  const checkstock = async () => {
    console.log("its check function");
    try {
      setloadingCart(true);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productInCart = cart.filter((item) => item.id === product.id)[0]
        ?.count;
      await Axios.post(`${CART}/check`, {
        product_id: id,
        count: 1 + (productInCart || 0),
      });
      console.log("its check function sucsess");
      setError(1);
      return true;
    } catch (err) {
      console.log(err);
      setError(2);
      return false;
    } finally {
      setloadingCart(false);
    }
  };
  async function addToCart() {
    const check = await checkstock();
    if (check) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productInCart = cart.find((item) => item.id === product.id);

      if (productInCart) {
        productInCart.count = (productInCart.count || 0) + 1;
      } else {
        cart.push({ ...product, count: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  return (
    <div className="Product-card ">
      <NavLink to={`/product/${props.id}`} className="product-img">
        {props.discount && <span className="sail">SALE</span>}
        <img loading="lazy" src={props.img} alt="" />
      </NavLink>
      <div className="card-body">
        <h1 className="title text-truncate">
          {(
            <NavLink
              className="title text-truncate"
              to={`/product/${props.id}`}>
              {props.title}
            </NavLink>
          ) || props.title}
        </h1>
        <div className="rate">{rateShow}</div>
        <div className="price d-flex justify-content-between align-items-center">
          <NavLink to={`/product/${props.id}`}>
            <span style={{ fontSize: "22px", fontWeight: "bold" }}>
              {props.discount}
              <span>$</span>
            </span>

            <span className="discount  ">
              {props.price}
              <span>$</span>
            </span>
          </NavLink>
          {error === 0 ? (
            ""
          ) : error === 2 ? (
            <Alert
              style={{
                position: "fixed",
                top: "110px",
                right: "10px",
                width: "fit-content",
              }}
              variant="danger">
              Sorry, this quantity is not available.
            </Alert>
          ) : (
            error === 1 && (
              <Alert
                style={{
                  position: "fixed",
                  top: "110px",
                  right: "10px",
                  width: "fit-content",
                }}
                variant="success">
                Added successfully!
              </Alert>
            )
          )}
          <div className="add-to-cart" onClick={() => addToCart()}>
            {loadingCart ? (
              <Spinner
                animation="border"
                style={{ width: "25px", height: "25px" }}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="#5d5d5d"
                viewBox="0 0 576 512">
                {/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
