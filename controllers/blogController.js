import db from "../DB/db.js";
import logger from "../utils/logger.js";
const writeBlog = async (req, res) => {
  try {
    const user = req.user;
    const { title, description, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({error:"tile and content are required"});
    }
    const user_id = user.user_id;
    const result = await db("blogs")
      .insert({ user_id, title, description, content })
      .returning([
        "post_id",
        "user_id",
        "title",
        "description",
        "content",
        "created_at",
      ]);
    logger.info("Blog created successfully", {
      user_id,
      post_id: result.post_id,
    });
    return res.status(200).json({
      message: "Blog created successfully",
      blog: result,
    });
  } catch (err) {
    //console.error("Error in write blog:", error);
    // console.error(error);
    const error = new Error(err);
    error.status = 500;
    throw error;
    //res.status(500).json({ message: "Server error" });
  }
};

const readBlog = async (req, res) => {
  try {
    const { id } = req.query;

    const blog = await db("blogs").where({ post_id: id }).first();

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.json(blog);
  } catch (error) {
    console.error("Error in write blog:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const user = req.user;
    const { id, title, description, content } = req.body;
    if (!id) {
      return res.status(400).json("Blog id is required");
    }
    const blog = await db("blogs")
      .select("user_id")
      .where({ post_id: id })
      .first();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const user_id = user.user_id;
    if (user_id != blog.user_id) {
      // console.log(user_id);
      // console.log(blog.user_id);
      return res
        .status(403)
        .json("You are not authorized to update this blog.");
    }
    const result = await db("blogs")
      .update({ title, description, content, updated_at: db.fn.now() })
      .where({ post_id: id })
      .returning([
        "post_id",
        "user_id",
        "title",
        "description",
        "content",
        "created_at",
      ]);
    return res.status(200).json({
      message: "Blog updated successfully",
      blog: result,
    });
  } catch (error) {
    console.error("Error in update blog:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.body;
    if (!id) {
      return res.status(400).json("Blog id is required");
    }
    const blog = await db("blogs")
      .select("user_id")
      .where({ post_id: id })
      .first();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const user_id = user.user_id;
    if (user_id != blog.user_id) {
      // console.log(user_id);
      // console.log(blog.user_id);
      return res
        .status(403)
        .json("You are not authorized to delete this blog.");
    }
    await db("blogs").delete().where({ post_id: id });
    await db("comments").delete().where({ post_id: id });
    await db("reactions").delete().where({ post_id: id });
    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error in delete blog:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export { writeBlog, readBlog, updateBlog, deleteBlog };
