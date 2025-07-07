import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { Axios } from "../Api/axios";
import { useParams } from "react-router-dom";
import { CART, Pro } from "../Api/Api";
import Skeleton from "react-loading-skeleton";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
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
      console.log(productInCart);
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productInCart || 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setloadingCart(false);
    }
  };
  const images = productImages.map((image, key) => {
    return {
      original: image.image,
      thumbnail: image.image,
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
  return (
    <>
      <Container className="mt-5">
        {loading ? (
          <>
            <div className="d-flex align-items-start justify-content-between flex-wrap">
              <div
                style={{ width: "390px" }}
                className="col-lg-5 col-md-6 col-12 bg-gray">
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
              <div className="col-lg-6 col-md-6 col-12 d-flex align-items-start ">
                <div className="ms-5 d-flex gap-3 flex-wrap">
                  <Skeleton height="50px" width="300px" />
                  <Skeleton height="40px" width="250px" />

                  <Skeleton height="50px" width="300px" />

                  <Skeleton height="25px" width="200px" className=" me-5" />
                  <br />
                  <Skeleton height="25px" width="150px" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-start justify-content-between flex-wrap">
            <div className="col-lg-5 col-md-6 col-12 bg-gray">
              {<ImageGallery additionalClass="" items={images} />}
            </div>
            <div className="col-lg-6 col-md-6 col-12 d-flex align-items-start">
              <div className="ms-5">
                <h1 style={{ fontSize: "35px" }}>{product.title}</h1>
                <h3 style={{ fontSize: "15px", color: "gray" }}>
                  {product.About}
                </h3>
                <p style={{ fontSize: "18px" }}>{product.description}</p>
                {rate}
                <div className="price">
                  <span style={{ fontSize: "22px" }}>
                    {product.discount}
                    <span>$</span>
                  </span>

                  <span className="discount  ">
                    {product.price}
                    <span>$</span>
                  </span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="1"
                  className="quantity"
                  onChange={(e) => setCount(Number(e.target.value))}
                />
                <button className="btn btn-primary" onClick={() => addToCart()}>
                  {loadingCart ? <Spinner animation="border" /> : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
