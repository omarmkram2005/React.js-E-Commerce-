import { useEffect, useState } from "react";
import { Cat, CAT } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";

import LoadingSupmit from "../../Components/Loading/Loading";
import TapleShow from "./Table";
export default function Categories() {
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limite = 5;
  useEffect(() => {
    Axios.get(`/${CAT}?limit=${limite}&page=${page}`)
      .then((res) => {
        setTotal(res.data.total);
        setCat(res.data.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [limite, page]);
  const header = [
    { key: "title", name: "Title" },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
  ];
  async function handleDelete(id) {
    setLoading(true);
    try {
      Axios.delete(`${Cat}/${id}`);
      setCat((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingSupmit />}
      <div className="p-2 w-100">
        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
          <h1>Categories Page</h1>
          <Link className="base-btn" to={"/dashboard/category/add"}>
            Add Category
          </Link>
        </div>

        <TapleShow
          header={header}
          limite={limite}
          page={page}
          setpage={setPage}
          data={cat}
          loading={loading}
          delete={handleDelete}
          total={total}
          searchLink={Cat}
          searchFor="title"
        />
      </div>
    </>
  );
}
