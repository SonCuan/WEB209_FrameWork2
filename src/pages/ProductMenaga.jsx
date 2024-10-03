import React from 'react';
import { Space, Table, Tag, Image, Spin, Typography, Button } from 'antd';
import api from '../servis/axios';
import { useQuery } from '@tanstack/react-query';

const { Title } = Typography;

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
       <Button type="primary">Edit</Button>
       <Button danger>Delete</Button>
      </Space>
    ),
  },
];

const ProductMenaga = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(`/products`);
      return response.data.map((product) => ({ ...product, key: product.id }));
    },
  });

  if (isLoading) return <Spin />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title level={1}>Danh sach san pham</Title>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ProductMenaga;
