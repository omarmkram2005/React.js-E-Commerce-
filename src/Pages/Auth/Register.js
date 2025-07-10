import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL, REGISTER } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import NavBar from "../Website/nav/NavBar";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const cookie = Cookie();

  const focus = useRef(null);

  useEffect(() => {
    focus.current.focus();
  }, []);

  function handelForm(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handelSupmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      setLoading(false);

      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);

      if (err.response.status === 422) {
        setErr("The Email is already been taken");
      } else {
        setErr("internal server err");
      }
    }
  }
  return (
    <>
      {loading && <LoadingSupmit />}
      <NavBar />
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form onSubmit={handelSupmit} className="form">
            <div className="custom-form">
              <h1 className="mb-5">Register Now</h1>
              <Form.Group className="form-custom" controlId="formBasicName">
                <Form.Control
                  type="text"
                  value={form.name}
                  name="name"
                  onChange={handelForm}
                  placeholder="Enter Your Name..."
                  required
                  ref={focus}
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  value={form.email}
                  name="email"
                  onChange={handelForm}
                  placeholder="Enter Your Email..."
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handelForm}
                  placeholder="Enter Your Password..."
                  required
                  minLength={6}
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <button className="base-btn">Register</button>
              {err !== "" && <span className="error">{err}</span>}
            </div>
            <a
              style={{ width: "200px", display: "block" }}
              href="http://127.0.0.1:8000/login-google">
              <div className="mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width={50}
                  height={50}
                  viewBox="0 0 48 48">
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
              </div>
            </a>
          </Form>
        </div>
      </div>
    </>
  );
}
