import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { CAT, Pro } from "../../Api/Api";
import LoadingSupmit from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
    rating: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 22,
    discount: 0,
    About: "dummy",
    stock: 5,
    rating: 2,
  };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState("");
  const nav = useNavigate();
  const focus = useRef(null);
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);
  useEffect(() => {
    focus.current.focus();
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

    for (let i = 0; i < images.length; i++) {}
    try {
      Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashboard/products");
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFormSubmit() {
    try {
      const res = await Axios.post(`${Pro}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (sent !== true) {
      handleFormSubmit();
    }
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
      await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((deleId) => deleId !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }
  const catShow = cat?.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images?.map((image, key) => (
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
          style={{ backgroundColor: "red" }}
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
            disabled={!sent}
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
            disabled={!sent}
            placeholder="Description..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={form.price > 0 ? form.price : 0}
            onChange={handleChange}
            type="number"
            disabled={!sent}
            placeholder="Price..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicdiscount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            name="discount"
            value={form.discount > 0 ? form.discount : 0}
            onChange={handleChange}
            type="number"
            disabled={!sent}
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
            disabled={!sent}
            placeholder="About..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            name="stock"
            value={form.stock > 0 ? form.stock : 0}
            onChange={handleChange}
            type="number"
            disabled={!sent}
            placeholder="Stock..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
          <Form.Label>Rate</Form.Label>
          <Form.Control
            name="rating"
            value={form.rating > 0 ? form.rating : 0}
            onChange={handleChange}
            type="number"
            disabled={!sent}
            placeholder="Rate..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicimages">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            disabled={!sent}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fa",
            cursor: "pointer",
          }}
          className="d-flex align-items-center justify-content-center rounded mb-2 gap-2 py-3 w-100 flex-column ">
          <img
            width={"100px"}
            style={{ filter: !sent && "grayscale(1)" }}
            src={require("../../Assits/cloud-2044823_1280.webp")}
            alt="Upload Here"
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#0086fa" }}>
            Upload Images
          </p>
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
