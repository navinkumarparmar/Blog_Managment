import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog"); 
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
        <h2>All Blogs</h2>
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </>
  );
}

export default AllBlogs;
