import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import LoadingSupmit from "../../Components/Loading/Loading";
import TapleShow from "./Table";
export default function Users() {
  const [users, setUser] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limite = 3;

  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);
  useEffect(() => {
    Axios.get(`/${USERS}?limit=${limite}&page=${page}`)
      .then((res) => {
        setUser(res.data.data);
        setTotal(res.data.total);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteUser, page, limite]);
  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Last Login",
    },
  ];
  async function handleDelete(id) {
    if (id !== currentUser.id) {
      setLoading(true);
      try {
        Axios.delete(`${USER}/${id}`);
        setUser((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <>
      {loading && <LoadingSupmit />}
      <div className="p-2 w-100">
        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
          <h1>Users Page</h1>
          <Link className="base-btn" to={"/dashboard/user/add"}>
            Add User
          </Link>
        </div>
        <TapleShow
          header={header}
          data={users}
          limite={limite}
          page={page}
          setpage={setPage}
          delete={handleDelete}
          currentUser={currentUser}
          total={total}
        />
      </div>
    </>
  );
}
