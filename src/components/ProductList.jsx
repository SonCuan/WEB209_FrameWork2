import React from 'react';
import { QueryClient, useQuery } from "@tanstack/react-query";
import api from '../servis/axios';
import { Link, useNavigate } from 'react-router-dom';


const ProductList = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
   const {isLoading , isError , data , error}= useQuery({
    queryKey : ['products'],
    queryFn : async () => {
        const res = await api.get('/products');
        return res.data;
    },
   });
   const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`); 
  };
  const handleDelete = async (id) => {
    try {
      if(confirm("Are you suer")){
        const res = await api.delete(`/products/${id}`);
       
      }   
    } catch (error) {
      console.log(error);
    }
  }
   if(isLoading) return <div>Loading...</div>;
   if(isError) return <div>Error: {error.message}</div>;
  return (
    <div>
         <h1>Danh sach san pham</h1>
    <Link to ="/products/add"><button className="btn btn-primary">Add</button></Link>
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Descripton</th>
          <th>Available</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} >
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
            <td>{item.category}</td>
            <td>
              <button className="btn btn-primary" onClick={() => {handleEdit(item.id)}}>Edit</button>
              <button className="btn btn-danger" onClick={() => {handleDelete(item.id)}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default ProductList;