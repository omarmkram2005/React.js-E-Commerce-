import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { Axios } from "../Api/axios";
import { useParams } from "react-router-dom";
import { CART, Pro } from "../Api/Api";
import Skeleton from "react-loading-skeleton";
import { Alert } from "react-bootstrap";
export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(0);
  const [loadingCart, setloadingCart] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    Axios.get(`${Pro}/${id}`).then((res) => {
      setProduct(res.data[0]);
      setProductImages(res.data[0].images);
      setLoading(false);
    });
  }, []);

  const checkstock = async () => {
    try {
      setloadingCart(true);
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productInCart = cart.filter((item) => item.id === product.id)[0]
        ?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productInCart || 0),
      });
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
  const images = productImages?.map((image, key) => {
    return {
      original:
        "https://e-commerce-backend-production-1346.up.railway.app" +
        image.image,
      thumbnail:
        "https://e-commerce-backend-production-1346.up.railway.app" +
        image.image,
      originalClass: "custom-image-style",
    };
  });

  const roundedRate = Math.round(product.rating);
  const dummyArray = [0, 0, 0, 0, 0];
  const rate = dummyArray.map((star, ind) =>
    ind < roundedRate ? (
      <svg
        key={ind}
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="#ffb514"
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

  async function addToCart() {
    const check = await checkstock();
    if (check) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productInCart = cart.find((item) => item.id === product.id);

      if (productInCart) {
        productInCart.count = (productInCart.count || 0) + count;
      } else {
        cart.push({ ...product, count: count });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setError(0);
    }, 2000);
  }, [error]);
  return (
    <>
      <Container style={{ marginTop: "140px" }}>
        {loading ? (
          <>
            <div className="d-flex row-gap-2 align-items-start justify-content-between flex-wrap">
              <div
                style={{ width: "390px" }}
                className="col-lg-5 col-md-5 col-12 bg-gray">
                <Skeleton height="370px" width="390px" />
                <div
                  style={{ width: "390px" }}
                  className="d-flex align-items-center justify-content-between ">
                  <Skeleton height="90px" width="90px" />
                  <Skeleton height="90px" width="90px" />
                  <Skeleton height="90px" width="90px" />
                  <Skeleton height="90px" width="90px" />
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-12"></div>
              <div className="col-lg-6 col-md-6 col-12 d-flex align-items-start ">
                <div className=" d-flex flex-wrap">
                  <Skeleton height="50px" width="300px" />
                  <Skeleton height="40px" width="250px" />

                  <Skeleton height="50px" width="300px" />

                  <Skeleton height="25px" width="200px" className=" me-3" />
                  <br />
                  <Skeleton height="25px" width="150px" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex row-gap-2 align-items-start justify-content-between flex-wrap">
            <div
              style={{ maxHeighteight: "540px" }}
              className="col-lg-5 col-md-6 col-12 bg-gray">
              {<ImageGallery items={images} />}
            </div>
            <div className="col-lg-1 col-md-1 col-12"></div>
            <div className="col-lg-6 col-md-5 col-12 d-flex align-items-start">
              <div>
                <h1 style={{ fontSize: "35px" }}>{product.title}</h1>
                <h3 style={{ fontSize: "15px", color: "gray" }}>
                  {product.About}
                </h3>
                <p style={{ fontSize: "18px" }}>{product.description}</p>
                {rate}
                <div className="price">
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: " #4063fc",
                    }}>
                    {product.discount}
                    <span>$</span>
                  </span>

                  <span className="discount  ">
                    {product.price}
                    <span>$</span>
                  </span>
                </div>
                {error === 0 ? (
                  ""
                ) : error === 2 ? (
                  <Alert
                    className="  position-absolute"
                    style={{ top: "110px", right: "10px" }}
                    variant="danger">
                    Sorry, this quantity is not available.
                  </Alert>
                ) : (
                  error === 1 && (
                    <Alert
                      className="  position-absolute"
                      style={{ top: "110px", right: "10px" }}
                      variant="success">
                      Added successfully!
                    </Alert>
                  )
                )}
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center ">
                    <button
                      style={{ height: "30px", backgroundColor: "tomato" }}
                      onClick={() => count > 1 && setCount((prev) => prev - 1)}
                      className="d-flex new-btn align-items-center juastify-content-center">
                      <svg
                        width={20}
                        height={20}
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        {/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                      </svg>
                    </button>
                    <input
                      style={{ width: "100px", margin: "0 10px" }}
                      type="number"
                      height={50}
                      className="text-center "
                      disabled
                      value={count}
                    />
                    <button
                      style={{ height: "30px", backgroundColor: "#30f630e0" }}
                      onClick={() => count < 10 && setCount((prev) => prev + 1)}
                      className="d-flex new-btn align-items-center juastify-content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="white"
                        viewBox="0 0 448 512">
                        {/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                      </svg>
                    </button>{" "}
                  </div>
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
          </div>
        )}
      </Container>
    </>
  );
}
