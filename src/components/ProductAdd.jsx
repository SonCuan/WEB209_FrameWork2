import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import api from '../servis/axios';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
    const nav = useNavigate();
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await api.get('/products');
            return res.data;
        },
    });

    const queryClient = useQueryClient();

    // Sử dụng useState để quản lý form input
    const [product, setProduct] = useState({
        name: '',
        price: '',
        imageUrl: '',
        description: '',
        available: false,
        category: '',
    });

    // Hàm handleChange không thay đổi giữa các render, nên không có vấn đề về thứ tự hook
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Sử dụng useMutation ở cấp cao nhất, không nằm trong điều kiện
    const mutation = useMutation({
        mutationFn: async (product) => {
            const res = await api.post('/products', product);
            return res.data;
        },
        onSuccess: () => {
            // Làm mới lại danh sách sản phẩm khi thêm thành công
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            console.error('Failed to add product: ', error);
        },
    });

    // Hàm xử lý form submit, không thay đổi số hooks trong mỗi lần render
    const handleAdd = (e) => {
        e.preventDefault();
        mutation.mutate(product); // Sử dụng mutation thay vì gọi API trực tiếp
        nav('/products');
    };

    // Hiển thị loading, error hoặc form
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
          
            <form onSubmit={handleAdd}>
                <h1>Them san pham</h1>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Available</label>
                    <input
                        type="checkbox"
                        name="available"
                        checked={product.available}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Category</label>
                    <select
                        name="category"
                        className="form-control"
                        value={product.category}
                        onChange={handleChange}
                    >
                        <option value="">--Category--</option>
                        <option value="1">Danh mục 1</option>
                        <option value="2">Danh mục 2</option>
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary w-100">Submit</button>
                {mutation.isLoading && <p>Adding product...</p>}
                {mutation.isError && <p>Error: {mutation.error.message}</p>}
                {mutation.isSuccess && <p>Product added successfully!</p>}
            </form>
        </div>
    );
};

export default ProductAdd;
