import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { CAT, Cat } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setDisable(false);
        setLoading(false);
      })
      .catch((err) => {
        nav("/dashboard/category/page/404", { replace: true });
        console.log(err);
      });
  }, []);
  async function HandelSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      Axios.post(`${Cat}/edit/${id}`, form);
      nav("/dashboard/categories");
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
          <Form.Label>title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
            size="sm"
          />
        </Form.Group>
        <button disabled={disable} className="base-btn ">
          Save
        </button>
      </Form>
    </>
  );
}
