import { useEffect, useState } from "react";
import "./App.css";
import {  Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import AuthForm from "./pages/AuthForm";
import LayoutsAdmin from "./layouts/LayoutsAdmin";
import ProductMenaga from "./pages/ProductMenaga";
import Dashboard from "./pages/Dashboard";
function App() {


  return (
    <>
      <Routes>
        {/* <Route path="/" element ={<h1>Trang chu </h1>}/>
        <Route path="products/add" element ={<ProductAdd/>}/>
        <Route path="/products" element = {<ProductList />}/>
        <Route path="/products/edit/:id" element = {<ProductEdit />}/>
        <Route path="/login" element = {<AuthForm/>} />
        <Route path="/register" element = {<AuthForm isRegister />} /> */}
          <Route path="/admin" element={<LayoutsAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductMenaga />} />
        </Route>
      </Routes>
   
    </>
  );
}

export default App;
