
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Switch , Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import api from './../servis/axios';

const ProductEdit = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [form] = Form.useForm();
  const [imageUrl , setImageUrl] = useState('');

  const {data : product } = useQuery({
    queryKey: ["product", id],
    queryFn : async () => { 
        const res = await api.get(`/products/${id}`);
        return res.data
    }
  })
  useEffect(()=> { 
    if(product){
        form.setFieldsValue({
            name: product.name,
            price : product.price,
            imageUrl : product.imageUrl,
            description : product.description,
            category : product.category,
        });
        setImageUrl(product.imageUrl);
    }
  },[product, form])
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await api.patch(`http://localhost:3000/products/${id}`, product);
    },
    onSuccess: () => {
      message.success("Sua san pham thanh cong");
      navigate("/admin/products");
    },
  });
  const onUploadChange = (info) => { 
    if(info.file.status == "done") { 
      setImageUrl(info.file.response.secure_url);
      // console.log(info); hiện ra url để xem nó trả về cái gì 
    }
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values) => {
    mutate({...values, imageUrl });
  };
  return (
    <div>
      <h1 className="text-4xl my-8">Sửa sản phẩm</h1>
      <Form 
        form={form}
        name="add-form"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá sản phẩm",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="https://api.cloudinary.com/v1_1/dejxivptm/image/upload" listType="picture-card" 
          onChange={onUploadChange}  
          data={{upload_preset : 'upload_react'}} 
          defaultFileList={[{
            uid: '-1',
            name:  imageUrl ,  
            status: 'done', 
            url: imageUrl, 
          }]}
        >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Trạng thái" name="available" initialValue={false}>
          <Switch />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Danh mục" name="category">
          <Select>
            <Select.Option value="Quan bo nam">Quan bo nam </Select.Option>
            <Select.Option value="Ao khoac nam">Ao khoac nam</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;