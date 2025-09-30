import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog/my-blogs"); 
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>My Blogs</h2>
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </>
  );
}

export default MyBlogs;
