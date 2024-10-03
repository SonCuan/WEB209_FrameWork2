import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../servis/axios';

const ProductEdit = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    const { id } = useParams();
    
    // Khai báo state product trước khi sử dụng
    const [product, setProduct] = useState({
        name: '',
        price: '',
        imageUrl: '',
        description: '',
        available: false,
        category: ''
    });

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await api.get(`/products/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (data) {
            setProduct(data); // Cập nhật product từ data
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct((prev) => ({
                    ...prev,
                    imageUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const mutation = useMutation({
        mutationFn: async (updateProduct) => {
            const res = await api.patch(`/products/${id}`, updateProduct);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            queryClient.invalidateQueries(['product', id]);
            alert("Sua san pham thanh cong");
            nav('/admin/products');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleEdit = (e) => {
        e.preventDefault();
        mutation.mutate(product);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <form onSubmit={handleEdit}>
                <h1>Edit Product</h1>
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
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                    {product.imageUrl && (
                        <img
                            src={product.imageUrl}
                            width={100}
                            height={100}
                            style={{ marginTop: '10px' }}
                        />
                    )}
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
            </form>
        </div>
    );
}

export default ProductEdit;
