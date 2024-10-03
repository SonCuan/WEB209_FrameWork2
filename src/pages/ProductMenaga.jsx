import React from 'react';
import { Space, Table, Tag, Image, Spin, Typography, Button } from 'antd';
import api from '../servis/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ProductMenaga = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(`/products`);
      return response.data.map((product) => ({ ...product, key: product.id }));
      
    },
  });
  const handleProductAdd = () => {
    nav('/admin/products/add'); 
  };
  const handleEdit = (id) => {
    nav(`/admin/products/edit/${id}`);
  }

  // Định nghĩa hàm handleDelete trước khi sử dụng
  const handleDelete = async (id) => { 
    try {
      if(confirm("Bạn có muốn xóa không?")) {
        await api.delete(`/products/${id}`);
        queryClient.invalidateQueries(['products']);
        alert("Xóa thành công");
      }
    } catch (error) {
      console.log(error);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };
  

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => <Image width={100} src={imageUrl} />,
    },
    {
      title: 'Tình trạng',
      key: 'available',
      dataIndex: 'available',
      render: (available) => (
        <Tag color={available ? 'green' : 'volcano'}>
          {available ? 'Còn hàng' : 'Hết hàng'}
        </Tag>
      ),
    },
    {
      title: 'Danh mục',
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title level={1}>Danh sách sản phẩm</Title>
      <Button type="primary" onClick={handleProductAdd} >Thêm sản phẩm</Button>
      <Table columns={columns} dataSource={data} rowKey="key" />
    </>
  );
};

export default ProductMenaga;
