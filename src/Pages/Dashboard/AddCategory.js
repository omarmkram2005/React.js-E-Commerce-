import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const focus = useRef(null);

  useEffect(() => {
    focus.current.focus();
  }, []);

  async function HandelSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      Axios.post(`${Cat}/add`, form);
      nav("/dashboard/categories");
      setLoading(true);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  return (
    <>
      {loading && <LoadingSupmit />}
      <Form className="w-100 bg-white mx-2 p-3" onSubmit={HandelSubmit}>
        <Form.Group className="mb-3" controlId="formBasictitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
            ref={focus}
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
        <button disabled={title.length > 1 ? false : true} className="base-btn">
          Save
        </button>
      </Form>
    </>
  );
}
