import { NavLink } from "react-router-dom";
export default function DealProducts(props) {
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

  return (
    <NavLink to={`/product/${props.id}`}>
      <div className="Product-card">
        <div className="product-img">
          {props.discount && <span className="sail">SALE</span>}
          <img src={props.img} alt="" />
        </div>
        <div className="card-bordy">
          <h1 className="title text-truncate">{props.title}</h1>
          <div className="rate">{rateShow}</div>
          <div className="price">
            <span style={{ fontSize: "22px" }}>
              {props.discount}
              <span>$</span>
            </span>

            <span className="discount  ">
              {props.price}
              <span>$</span>
            </span>
          </div>
        </div>

        <div className="add-to-cart">
          <button>Add To Cart</button>
        </div>
      </div>
    </NavLink>
  );
}
