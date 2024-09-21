import { useEffect, useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import api from "./servis/axios";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => { 
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);
  const handleDelete = async (id) => {
    try {
      if(confirm("Ban co muon xoa khong?")) {
        await api.delete(`/products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    } 
  }
  return (
    <>
           <form>
  <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label className="form-label">Price</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    <h1>Danh sach san pham</h1>
    <Link to="/home/add"><button className="btn btn-success">Add</button></Link>
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Descripton</th>
          <th>Available</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              <img
                src={item.pictureUrl}
                alt={item.name}
                width={100}
                height={100}
              />
            </td>
            <td>{item.description}</td>
            <td>{item.available ? "Co" : "Khong co"}</td>
            <td>
              <Link to={`home/edit/${item.id}`}><button className="btn btn-primary">Edit</button></Link>
              <button className="btn btn-danger" onClick={() => {handleDelete(item.id)}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default App;
