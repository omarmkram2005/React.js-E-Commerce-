import { useEffect, useState } from "react";
import { Pro, PRO } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import LoadingSupmit from "../../Components/Loading/Loading";
import TapleShow from "./Table";
export default function Products() {
  const limite = 5;
  const [page, setPage] = useState(1);

  const [pro, setPro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

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
  const header = [
    { key: "title", name: "Title" },
    { key: "description", name: "Description" },
    {
      key: "price",
      name: "Price",
    },
    { key: "rating", name: "Rate" },
    { key: "images", name: "Images" },
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
      Axios.delete(`${Pro}/${id}`);
      setPro((prev) => prev.filter((item) => item.id !== id));
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
          <h1>Products Page</h1>
          <Link className="base-btn" to={"/dashboard/product/add"}>
            Add Product
          </Link>
        </div>
        <TapleShow
          header={header}
          limite={limite}
          page={page}
          setpage={setPage}
          data={pro}
          loading={loading}
          delete={handleDelete}
          total={total}
          searchLink={Pro}
          searchFor="title"
        />
      </div>
    </>
  );
}
