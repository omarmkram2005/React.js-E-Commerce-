import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import HomePage from "./Pages/Website/HomePage";
import Users from "./Pages/Dashboard/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleCallback from "./Pages/Auth/GoogleCallback";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ReqiureAuth from "./Pages/Auth/ReqiureAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Err404 from "./Pages/Auth/Err404";
import ReqiureBack from "./Pages/Auth/ReqiureBack";
import Catigories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import Category from "./Pages/Dashboard/Category";
import Products from "./Pages/Dashboard/Products";
import AddProduct from "./Pages/Dashboard/AddProduct";
import Product from "./Pages/Dashboard/Product";
import ShowAllCats from "./Pages/Website/ShowAllCats";
import Website from "./Pages/Website/Website";
import ProductPage from "./Components/ProductPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<Website />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/categories" element={<ShowAllCats />}></Route>
        </Route>
        <Route element={<ReqiureBack />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route
          path="/auth/google/callback"
          element={<GoogleCallback />}></Route>
        <Route element={<Err404 />} path="/*"></Route>

        <Route element={<ReqiureAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<ReqiureAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="users/:id" element={<User />}></Route>
              <Route path="user/add" element={<AddUser />}></Route>
            </Route>
            <Route element={<ReqiureAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Catigories />}></Route>
              <Route path="categories/:id" element={<Category />}></Route>
              <Route path="category/add" element={<AddCategory />}></Route>

              <Route path="products" element={<Products />}></Route>
              <Route path="products/:id" element={<Product />}></Route>
              <Route path="product/add" element={<AddProduct />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
