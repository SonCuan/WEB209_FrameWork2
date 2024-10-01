import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import api from '../servis/axios';

const ProductEdit = () => {
    const queryClient = useQueryClient();
    const {isLoading, isError, data, error} = useQuery({
        queryKey : ['products'],
        queryFn : async() => { 
            const res = await api.get('/products');
            return res.data;
        }
    })
    const [product , setProduct] = useState({
        name: '',
        price : '',
        imageUrl : '',
        description : '',
        available : false,
        category : ''
    })
    useEffect(()=> {
        if(data && data[0]) { 
            setProduct(data[0]);
        }
    }, [data]);
    const handleChange = (e) => { 
        const {name, value, checked, type} = e.target;
        setProduct((prev) => ({
            ...prev, 
            [name] : type === 'checkbox' ? checked : value,
        }));
    };
    const mutation = useMutation({
        mutationFn: async (updateProduct) => {
            const res = await api.patch(`/products/${product.id}` , updateProduct);
            return res.data;
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['products']);
            queryClient.invalidateQueries(['product', product.id]);
        },
        onError : (error) => {
            console.log(error);
        }    
    })
    const handleEdit = (e) => { 
        e.preventDefault();
        mutation.mutate(product);
    }
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error: {error.message}</div>
  return (
    <div>
    <form onSubmit={handleEdit}>
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
  )
}

export default ProductEdit;