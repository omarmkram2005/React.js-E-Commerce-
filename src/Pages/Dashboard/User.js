import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setDisable(false);
        setLoading(false);
      })
      .catch((err) => {
        nav("/dashboard/users/page/404", { replace: true });
        console.log(err);
      });
  }, []);
  async function HandelSubmit(e) {
    e.preventDefault();
    try {
      Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {loading && <LoadingSupmit />}
      <Form className="w-100 bg-white mx-2 p-3" onSubmit={HandelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="1995">Admin</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option>
            <option value="2001">User</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
