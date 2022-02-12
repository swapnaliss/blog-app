const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.find();
  res.json(blog);
});

//Creating API for CreateBlog

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const note = new Blog({title, content, category });

    const createdBlog = await note.save();

    res.status(201).json(createdBlog);
  }
});

//Creating API for view BY ID

const getBlogById = asyncHandler(async (req, res) => {
  const blogById = await Blog.findById(req.params.id);

  if (blogById) {
    res.json(blogById);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});

//Creating API for UpdateBlog

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const blog = await Blog.findById(req.params.id);

  // if (Blog.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (blog) {
    blog.title = title;
    blog.content = content;
    blog.category = category;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

//Creating API for DeleteBlog
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  // if (blog.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (blog) {
    await blog.remove();
    res.json({ message: "Blog Removed" });
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});
module.exports = { getBlog, createBlog, getBlogById, updateBlog, deleteBlog };
