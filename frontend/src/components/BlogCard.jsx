import React from "react";

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content ? blog.content.slice(0, 150) : "No content"}...</p>
      <div className="blog-footer">
        <span>By {blog.author?.name || "Unknown"}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
