import React from 'react';
import { Space, Table, Tag, Image, Spin, Typography, Button , Modal, Popconfirm, message } from 'antd';
import api from '../servis/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ProductMenaga = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const {mutate} = useMutation({
    mutationFn : async (id) => {
      await api.delete(`/products/${id}`)
    },
    onSuccess: () => {
      message.open({
      type: "success",
      content: "Xoa thanh cong",
     });
     queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      message.open({
        type: "error",
        content: "Xoá thất baị, vui lòng thử lại sau",
      });
    },
  })
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
  const handleDetail = (id) => {
    nav(`/admin/products/detail/${id}`);
  }

  // Định nghĩa hàm handleDelete trước khi sử dụng
  // const handleDelete = async (id) => { 
  //   Modal.confirm({
  //     title: "Xoa san pham",
  //     content: "Ban co muon xoa san pham nay khong?",
  //     okText : "Xoa",
  //     cancelText: "Huy",
  //     onOk : async() => { 
  //       try {
  //         const res = api.delete(`/products/${id}`);
  //         queryClient.invalidateQueries(["products"]);
  //         alert("Xoa san pham thanh cong");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   })
  // };
  
  

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
      render: (_, item) => (
        <div>
          <Popconfirm 
            title= " Xoa san pham?"
            description = "Ban co muon xoa san pham nay khong?"
            onConfirm={() => mutate(item.id)}
            onCancel={() => {}}
            okText = "Xoa"
            cancelText = "Huy"
          >
            <Button danger>Xoa</Button>    
          </Popconfirm>
          <Button type="primary" style={{marginLeft: 10}} onClick={() => handleEdit(item.id)}>Sua</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={() => handleDetail(item.id)}>Chi tiet</Button>
        </div>
      ),
    },  
  ];

  if (isLoading) return <Spin />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title level={1}>Danh sách sản phẩm</Title>
      <Button type="primary" onClick={handleProductAdd} >Thêm sản phẩm</Button>
      <Table  columns={columns} dataSource={data} rowKey="key" />
      
    </>
  );
};

export default ProductMenaga;
