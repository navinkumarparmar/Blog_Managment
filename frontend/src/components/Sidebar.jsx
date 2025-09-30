import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar">{user.name?.charAt(0)}</div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <nav className="sidebar-nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard Home</button>
        <button onClick={() => navigate("/dashboard/blogs")}>My Blogs</button>
        <button onClick={() => navigate("/dashboard/create")}>Create Blog</button>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}
