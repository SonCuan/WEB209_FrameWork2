import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import api from "../servis/axios";

const AuthForm = ({isRegister}) => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: async (data) => {
      const islogin = isRegister ? "/register" : "/login";
      const res = await api.post(`${islogin}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      if (isRegister) {
        alert("Dang ky thanh cong");
        nav("/login");
      } else {
        alert("Dang nhap thanh cong");
        nav("/products");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? "Dang ky" : "Dang nhap"}</h2>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
