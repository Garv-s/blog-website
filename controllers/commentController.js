import db from "../DB/db.js";

const writeComment = async (req, res) => {
  try {
    const user = req.user;
    const { post_id, comment } = req.body;
    if (!post_id || !comment) {
      return res.status(400).json("post_id and comment are required!");
    }
    const post = await db("blogs").where({ post_id }).first();

    if (!post) {
      return res.status(404).json("blog not found!");
    }
    const result = await db("comments")
      .insert({ post_id, user_id: user.user_id, comment })
      .returning(["post_id", "user_id", "comment", "created_at"]);
    return res.status(200).json({
      result,
      message: "comment successfully posted",
    });
  } catch (error) {
    console.error("Error in write comment:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const user = req.user;
    const { comment_id, comment } = req.body;
    if (!comment || !comment_id) {
      return res
        .status(400)
        .json({ error: "comment_id and comment are required!" });
    }

    const old_comment = await db("comments").where({ comment_id }).first();
    if (!old_comment) {
      return res.status(404).json({ error: "comment not found" });
    }
    if (old_comment.user_id != user.user_id) {
      return res.status(403).json({ error: "Unauthorised!" });
    }
    const result = await db("comments")
      .update({
        user_id: user.user_id,
        comment,
        updated_at: db.fn.now(),
      })
      .where({ comment_id })
      .returning(["post_id", "user_id", "comment", "created_at"]);
    return res.status(200).json({
      result,
      message: "comment successfully updated",
    });
  } catch (error) {
    console.error("Error in update comment:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const { post_id } = req.query;
    if (!post_id) {
      return res.status(400).json("post_id is required");
    }
    const post = await db("blogs").where({ post_id }).first();
    if (!post) {
      return res.status(404).json("blog not found!");
    }
    const comments = await db("comments").where({ post_id });
    if (comments.length === 0) {
      return res.status(404).json("No comments on this blog yet!");
    }
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error in get comments:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const user = req.user;
    const { comment_id } = req.body;
    if (!comment_id) {
      return res.status(400).json({ error: "comment_id is required" });
    }

    const comment = await db("comments").where({ comment_id }).first();
    if (!comment) {
      return res.status(404).json({ eror: "comment_id does not exist" });
    }
    if (comment.user_id != user.user_id) {
      return res.status(403).json({ error: "Unauthorised!" });
    }
    await db("comments").delete().where({ comment_id });
    return res.status(200).json({
      message: "comment successfully deleted",
    });
  } catch (error) {
    console.error("Error in delete comment:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { writeComment, updateComment, getAllComments, deleteComment };
