import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import { openCart } from "../../Context/CartContext";
export default function Cart() {
  const cartItems = JSON.parse(window.localStorage.getItem("cart"));
  const { isOpen, setIsOpen } = useContext(openCart);
  const [deleted, setDeleted] = useState(false);
  const handleDelete = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    setDeleted((prev) => !prev);
  };
  const dataShow = cartItems?.map((product, key) => (
    <div key={key} id={product.id}>
      <div
        style={{ borderBottom: "1px solid gray" }}
        className="d-flex flex-wrap my-2 py-1 ">
        <div className="col-4">
          <img width={"150px"} alt="" src={product.images[0].image} />
          {}
        </div>
        <div className="col-7 d-flex align-items-start">
          <div className="ms-5">
            <h1 style={{ fontSize: "25px" }}>{product.title}</h1>
            {/* <h3 style={{ fontSize: "15px", color: "gray" }}>{product.About}</h3> */}
            <p style={{ fontSize: "15px", marginBottom: "5px" }}>
              {product.description}
            </p>

            <div className="price">
              <span style={{ fontSize: "18px" }}>
                {product.discount}
                <span>$</span>
              </span>

              <span className="discount  ">
                {product.price}
                <span>$</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-1 d-flex flex-wrap">
          <span>x {product.count}</span>
          <span
            onClick={() => handleDelete(product.id)}
            style={{ cursor: "pointer" }}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0,0,256,256">
              <g
                fill="#e82c2c"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}>
                <g transform="scale(5.12,5.12)">
                  <path d="M42,5h-10v-2c0,-1.65234 -1.34766,-3 -3,-3h-8c-1.65234,0 -3,1.34766 -3,3v2h-10c-0.55078,0 -1,0.44922 -1,1c0,0.55078 0.44922,1 1,1h1.08594l3.60938,40.51563c0.125,1.39063 1.30859,2.48438 2.69531,2.48438h19.21484c1.38672,0 2.57031,-1.09375 2.69531,-2.48437l3.61328,-40.51562h1.08594c0.55469,0 1,-0.44922 1,-1c0,-0.55078 -0.44531,-1 -1,-1zM20,44c0,0.55469 -0.44922,1 -1,1c-0.55078,0 -1,-0.44531 -1,-1v-33c0,-0.55078 0.44922,-1 1,-1c0.55078,0 1,0.44922 1,1zM20,3c0,-0.55078 0.44922,-1 1,-1h8c0.55078,0 1,0.44922 1,1v2h-10zM26,44c0,0.55469 -0.44922,1 -1,1c-0.55078,0 -1,-0.44531 -1,-1v-33c0,-0.55078 0.44922,-1 1,-1c0.55078,0 1,0.44922 1,1zM32,44c0,0.55469 -0.44531,1 -1,1c-0.55469,0 -1,-0.44531 -1,-1v-33c0,-0.55078 0.44531,-1 1,-1c0.55469,0 1,0.44922 1,1z"></path>
                </g>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  ));
  // <div
  //   style={{
  //     position: "absolute",
  //     top: "50%",
  //     left: "50%",
  //     backgroundColor: "#f4f4f4",
  //     width: "400px",
  //     height: "fit-content",
  //     transform: "translate(-50%,-50%)",
  //     padding: "10px 15px",
  //     borderRadius: "5px",
  //     zIndex: "6",
  //     boxShadow: "black 0 0 5px 0px",
  //   }}>
  //   {dataShow}
  // </div>

  return (
    <Modal
      size="lg"
      show={isOpen}
      onHide={() => setIsOpen(false)}
      aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>{dataShow}</Modal.Body>
    </Modal>
  );
}
