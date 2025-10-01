const Blog = require("../models/blogModel");
const apiError = require("../utils/ApiError");

module.exports.createBlog = async function (req, res, next) {
  try {
    const { title, description } = req.body;
     const id = req.user.id
     console.log("id",id)
    if (!title || !description) {
      throw new apiError("Title and description are required", 400);
    }

    const blog = await Blog.create({
      title,
      description,
      author: id 
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    next(err);
  }
};


module.exports.getAllBlogs = async function (req, res, next) {
  try {
     const userId = req.user.id; 
    const blogs = await Blog.find({ author: userId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.json({ success: true, blogs });
  } catch (err) {
    next(err);
  }
};

module.exports.getBlogById = async function (req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!blog) throw new apiError("Blog not found", 404);

    return res.json({ 
        success: true,
        data: blog
     });
  } catch (err) {
    next(err);
  }
};


module.exports.updateBlog = async function (req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        throw new apiError("Blog not found", 404);
    }
    if (blog.author.toString() !== req.user.id.toString()) {
      throw new apiError("Not authorized to update this blog", 403);
    }

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    await blog.save();
    return res.json({
        success: true,
         message: "Blog updated",
         blog 
        });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBlog = async function (req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new apiError("Blog not found", 404);

    if (blog.author.toString() !== req.user.id.toString()) {
      throw new apiError("Not authorized to delete this blog", 403);
    }

    await blog.deleteOne();
    return res.json(
        { success: true,
        message: "Blog deleted" 
        });
  } catch (err) {
    next(err);
  }
};
