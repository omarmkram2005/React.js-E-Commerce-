import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination";
import { Axios } from "../../Api/axios";
import { useEffect, useState } from "react";
import transDate from "../../helpers/transformDate";
import "./table.css";
export default function TapleShow(props) {
  const currentUser = props.currentUser || { name: "" };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilteresSata] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filteredDataByDate = props.data.filter(
    (item) => date === transDate(item.created_at)
  );

  const filteredSearchByDate = filteredData.filter(
    (item) => date === transDate(item.created_at)
  );

  const showWichData =
    date.length !== 0
      ? search.length > 0
        ? filteredSearchByDate
        : filteredDataByDate
      : search.length > 0
      ? filteredData
      : props.data;
  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?${props.searchFor}=${search}`
      );
      setFilteresSata(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);
  const dataShow = showWichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td
          key={key2}
          className={item2.key === "image" ? "image-gallery-cell" : ""}>
          {item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : currentUser && currentUser.name === item[item2.key] ? (
            item[item2.key] + " (You)"
          ) : item2.key === "image" ? (
            <img style={{ width: "200px" }} alt="err" src={item[item2.key]} />
          ) : item2.key === "images" ? (
            <div className="image-flex-container">
              {item[item2.key].map((image, key) => (
                <img
                  // style={{ maxWidth: "140px", minWidth: "45px" }}
                  key={key}
                  src={image.image}
                  alt="err"
                  className="gallery-image"
                />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            transDate(item[item2.key])
          ) : (
            item[item2.key]
          )}
        </td>
      ))}
      <td>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <Link to={`${item.id}`}>
            <p
              style={{
                fontSize: "21px",
                fontWeight: "bold",
                cursor: "pointer",
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0,0,256,256">
                <g
                  fill="#6494ff"
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
                    <path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path>
                  </g>
                </g>
              </svg>
            </p>
          </Link>
          {currentUser.name !== item.name && (
            <p
              onClick={() => props.delete(item.id)}
              style={{
                fontSize: "21px",
                color: "red",
                fontWeight: "bold",
                cursor: "pointer",
              }}>
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
            </p>
          )}
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <Form.Control
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
          type="search"
          placeholder="Search..."
        />
        <Form.Control
          name="date"
          onChange={(e) => {
            setDate(e.target.value);
            setSearchLoading(true);
          }}
          type="date"
        />
      </div>
      <div className="table-style overflow-x-auto">
        <Table hover className="table-self">
          <thead>
            <tr>
              <th>id</th>
              {headerShow}
              <th className="d-flex justify-content-center align-items-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr className="text-center">
                <td colSpan={12}>Loading</td>
              </tr>
            ) : searchLoading ? (
              <tr className="text-center">
                <td colSpan={12}>Searching</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
      </div>
      {!(search.length > 0) && (
        <PaginatedItems
          itemsPerPage={props.limite}
          data={props.data}
          setpage={props.setpage}
          total={props.total}
        />
      )}
    </>
  );
}
