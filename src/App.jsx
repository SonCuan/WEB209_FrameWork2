import { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import api from "./servis/axios";
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
function App() {
  // const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({
  //   name : "", 
  //   price: "", 
  //   imageUrl: "",
  //   description: "",
  //   available: true,
  //   category: ""
  // }); 
  // const [edit , setEdit ] = useState(null);

  // useEffect(() => {
  //   (async () => { 
  //     try {
  //       const res = await api.get("/products");
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()
  // }, []);
  // const handleDelete = async (id) => {
  //   try {
  //     if(confirm("Ban co muon xoa khong?")) {
  //       await api.delete(`/products/${id}`);
  //     setProducts(products.filter((item) => item.id !== id));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } 
  // }
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const newProduct = { ...product, [name]: value };
  //   // computed property name
  //   setProduct(newProduct);
  // };
  // const handleAdd = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if(edit) {
  //       const res = await api.put(`/products/${edit}`, product);
  //       setProducts(products.map((item) => item.id === edit ? res.data : item));
  //       setEdit(null);
  //       alert("Sua thanh cong");
  //     }
  //     else { 
  //       const res = await api.get("/products", product);
  //       setProducts([...products, res.data]);
  //       alert("Them thanh cong");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const handleEdit = async (id) => {
  //   try {
  //     const res = await api.get(`/products/${id}`);
  //     setProduct(res.data);
  //     setEdit(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <Routes>
        <Route path="/" element ={<h1>Trang chu </h1>}/>
        <Route path="products/add" element ={<ProductAdd/>}/>
        <Route path="/products" element = {<ProductList />}/>
        <Route path="/products/edit/:id" element = {<ProductEdit  />}/>
      </Routes>
   
    </>
  );
}

export default App;
