import React from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from '../servis/axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Sử dụng useQueryClient để lấy QueryClient

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const mutation = useMutation({
    mutationFn: async (productId) => {
      if (confirm("Bạn có muốn xóa không?")) {
        await api.delete(`/products/${productId}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='m-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Danh sach san pham</h1>
        <Link to="/products/add" className="btn btn-primary">
          Add
        </Link>
      </div>
      <table className="table table-bordered table-hover p-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>Available</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                />
              </td>
              <td>{item.description}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.available}
                  readOnly
                />
              </td>
              <td>{item.category}</td>
              <td>
                <button className="btn btn-warning w-100" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn btn-danger w-100" onClick={() => mutation.mutate(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
