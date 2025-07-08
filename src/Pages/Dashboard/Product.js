import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { CAT, Pro } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Product() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const nav = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [deleteImagesFromServer, setDeleteImagesFromServer] = useState([]);

  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const { id } = useParams();
  const focus = useRef(null);
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);
  useEffect(() => {
    focus.current.focus();
  }, []);
  useEffect(() => {
    Axios.get(`/${Pro}/${id}`)
      .then((res) => {
        console.log(res);
        setForm(res.data[0]);
        setImagesFromServer(res.data[0].images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleOpenImage() {
    openImage.current.click();
  }
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((res) => {
        setCat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  async function HandelEdit(e) {
    e.preventDefault();

    for (let i = 0; i < deleteImagesFromServer.length; i++) {
      try {
        const res = await Axios.delete(
          `product-img/${deleteImagesFromServer[i]}`
        );
      } catch (err) {
        console.log(err);
      }
    }
    try {
      Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashboard/products");
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const j = useRef(-1);
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;

    const data = new FormData();

    for (let i = 0; i < imagesAsFiles.length; i++) {
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      j.current++;

      try {
        const res = await Axios.post("product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total) + "%";
            progress.current[j.current].style.width = percent;
            progress.current[j.current].setAttribute("percent", percent);
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleImageDelete(id, img) {
    const findId = ids.current[id];

    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((deleId) => deleId !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete(id) {
    setDeleteImagesFromServer((prev) => [...prev, id]);
    document.getElementById(id).remove();
  }
  const catShow = cat.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((image, key) => (
    <div key={key} className=" w-100 p-2 border">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="  d-flex justify-content-start align-items-center gap-2 ">
          <img width={"80px"} src={URL.createObjectURL(image)} alt="err" />
          <div>
            <p className="mb-1">{image.name}</p>
            <p>
              {image.size / 1024 < 1000
                ? (image.size / 1024).toFixed(2) + "KB"
                : (image.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button
          style={{ backgroundColor: "red", fontWeight: "bold" }}
          onClick={(e) => {
            handleImageDelete(key, image);
          }}
          variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-2">
        <span
          className="inner-progress"
          percent="0%"
          ref={(e) => {
            progress.current[key] = e;
          }}></span>
      </div>
    </div>
  ));

  const imagesShowFromServer = imagesFromServer.map((image, key) => (
    <div
      key={key}
      id={image.id}
      className="  p-2 border col-2 position-relative">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="  d-flex justify-content-start align-items-center gap-2 ">
          <img width={"80px"} src={image.image} alt="err" />
        </div>
        <div
          style={{ cursor: "pointer" }}
          className=" position-absolute top-0 end-0 bg-danger rounded text-white ">
          <p
            className="py-1 px-2 m-0 "
            onClick={() => {
              handleDelete(image.id);
            }}>
            X
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <LoadingSupmit />}
      <Form className="w-100 bg-white mx-2 p-3" onSubmit={HandelEdit}>
        <Form.Group className="mb-3" controlId="formBasicCatrgory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={form.category}
            name="category"
            onChange={handleChange}
            placeholder="Category..."
            ref={focus}>
            <option disabled>Select Category</option>
            {catShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasictitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Title..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicdescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={form.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
            placeholder="Description..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={form.price}
            onChange={handleChange}
            type="numper"
            placeholder="Price..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicdiscount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            name="discount"
            value={form.discount}
            onChange={handleChange}
            type="numper"
            placeholder="Discount..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAbout">
          <Form.Label>About</Form.Label>
          <Form.Control
            name="About"
            value={form.About}
            onChange={handleChange}
            type="text"
            placeholder="About..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicimages">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          style={{
            border: "2px dashed #0086fa",
            cursor: "pointer",
          }}
          className="d-flex align-items-center justify-content-center rounded mb-2 gap-2 py-3 w-100 flex-column ">
          <img
            width={"100px"}
            src={require("../../Assits/cloud-2044823_1280.webp")}
            alt="Upload Here"
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fa" }}>
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-wrap gap-2 ">
          {imagesShowFromServer}
        </div>
        <div className="d-flex align-items-start flex-column gap-2 ">
          {imagesShow}
        </div>
        <button
          disabled={form.title.length > 1 ? false : true}
          className="base-btn ">
          Save
        </button>
      </Form>
    </>
  );
}
