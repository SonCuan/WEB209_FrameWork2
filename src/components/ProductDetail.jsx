import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin, Typography, Modal, Image } from 'antd';
import api from '../servis/axios';
import { useQuery } from '@tanstack/react-query';

const { Title } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
  });

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setVisible(true);
  };

  if (isLoading) return <Spin />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Title level={2}>{data.name}</Title>
      <Descriptions title="Thông tin sản phẩm" bordered>
        <Descriptions.Item label="Giá">{data.price}</Descriptions.Item>
        <Descriptions.Item label="Hình ảnh">
          <Image
            src={data.imageUrl}
            alt={data.name}
            style={{ width: 100, cursor: 'pointer' }}
            onClick={() => handleImageClick(data.imageUrl)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả">{data.description}</Descriptions.Item>
        <Descriptions.Item label="Danh mục">{data.category}</Descriptions.Item>
        <Descriptions.Item label="Tình trạng">
          {data.available ? 'Còn hàng' : 'Hết hàng'}
        </Descriptions.Item>
      </Descriptions>

      {/* Modal để hiển thị ảnh lớn
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        title="Xem ảnh sản phẩm"
      >
        <img src={selectedImage} alt="Product" style={{ width: '100%' }} />
      </Modal> */}
    </div>
  );
};

export default ProductDetail;
