import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setForm({ name: "", email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <h1>Welcome to Our App 🚀</h1>
        <p>Track your Blogs, manage your blogs, and grow your writing skills and reach.</p>
      </div>

      <div className="register-right">
        <div className="register-card">
          <h2>Create Account</h2>
          <p className="text-muted">Sign up to get started</p>

          {error && <div className="custom-error">{error}</div>}

          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="form-control"
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
              autoComplete="off"
              required
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
              autoComplete="new-password"
              required
            />

            <button type="submit" className="btn">
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-light">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
