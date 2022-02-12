const express = require("express");
const {
  getBlog,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
// const { createBlog } = require("../middlewares/authMiddleware");

const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/blogs").get(getBlog);
router.route("/createblog").post(createBlog);
router
  .route("/blog/:id")
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlog);
module.exports = router;
