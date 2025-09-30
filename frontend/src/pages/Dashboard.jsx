import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Dashboard.css";

export default function ModernDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch user & blogs
  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await axios.get("/auth/getOne", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data.data || userRes.data);

        const blogsRes = await axios.get("/blog/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blogsSummary = (blogsRes.data.blogs || []).map((b) => ({
          _id: b._id,
          title: b.title,
          description:
            b.description.length > 80
              ? b.description.slice(0, 80) + "..."
              : b.description,
        }));
        setBlogs(blogsSummary);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // Add / Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.content.value,
    };
    try {
      if (editBlog) {
        const res = await axios.put(`/blog/${editBlog._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updated = res.data.blog || res.data;
        setBlogs(
          blogs.map((b) =>
            b._id === editBlog._id
              ? {
                  ...b,
                  title: updated.title,
                  description:
                    updated.description.length > 80
                      ? updated.description.slice(0, 80) + "..."
                      : updated.description,
                }
              : b
          )
        );
      } else {
        const res = await axios.post("/blog/create", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newBlog = res.data.blog || res.data;
        setBlogs([
          {
            _id: newBlog._id,
            title: newBlog.title,
            description:
              newBlog.description.length > 80
                ? newBlog.description.slice(0, 80) + "..."
                : newBlog.description,
          },
          ...blogs,
        ]);
      }
      setShowForm(false);
      setEditBlog(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to add/update blog");
    }
  };

  // Delete blog 
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    try {
      await axios.delete(`/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  // View blog
  const handleView = async (id) => {
    try {
      const res = await axios.get(`/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blogData = res.data.data || res.data.blog || res.data;
      setViewBlog({
        title: blogData.title,
        description: blogData.description,
        author: blogData.author || {},
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch blog details");
    }
  };

  return (
    <div className="modern-dashboard">
      <header className="header">
        <h1>Blog Dashboard</h1>
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="content">
        {/* Profile */}
        {user && (
          <div className="profile-card card3d">
            <h2>Profile</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        {/* Blogs */}
        <div className="blogs-container">
          <div className="blogs-header">
            <h2>My Blogs</h2>
            <button
              className="btn add"
              onClick={() => {
                setShowForm(true);
                setEditBlog(null);
              }}
            >
              + Create
            </button>
          </div>

          {/* Blog Form */}
          {showForm && (
            <form className="blog-form card3d" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                defaultValue={editBlog?.title || ""}
                placeholder="Blog Title"
                required
              />
              <textarea
                name="content"
                defaultValue={editBlog?.description || ""}
                placeholder="Blog Content"
                rows="5"
                required
              />
              <div className="form-actions">
                <button type="submit" className="btn submit">
                  {editBlog ? "Update" : "Add"} Blog
                </button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => {
                    setShowForm(false);
                    setEditBlog(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Blog List */}
          <div className="blogs-list">
            {loading ? (
              <p>Loading blogs...</p>
            ) : blogs.length ? (
              blogs.map((blog) => (
                <div key={blog._id} className="blog-card card3d">
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <div className="blog-actions">
                    <button
                      className="btn view"
                      onClick={() => handleView(blog._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn edit"
                      onClick={() => {
                        setEditBlog(blog);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs yet. Create one!</p>
            )}
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      {viewBlog && (
        <div className="modal-overlay" onClick={() => setViewBlog(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{viewBlog.title}</h2>
            <p>
              <strong>Description:</strong> {viewBlog.description}
            </p>
            <p>
              <strong>Author:</strong> {viewBlog.author?.name || "Unknown"}
            </p>
            <p>
              <strong>Email:</strong> {viewBlog.author?.email || "N/A"}
            </p>
            <button
              className="btn close-btn"
              onClick={() => setViewBlog(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
