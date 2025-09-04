import db from "../DB/db.js";

const react = async (req, res) => {
  try {
    const user = req.user;
    const { post_id, reaction } = req.body;
    if (!post_id || !reaction) {
      return res.status(400).json("post_id and reaction are required!");
    }
    if (reaction!='like' && reaction!='dislike') {
        return res
        .status(500)
        .json({ error: "Invalid reaction" });
    }
    const post = await db("blogs").where({ post_id }).first();

    if (!post) {
      return res.status(404).json("blog not found!");
    }
    const exist = await db('reactions').where({post_id,user_id:user.user_id});
    if (exist.length>0) {
        return res.json({message:'you have already reacted to this post'});
    }
    const result = await db("reactions")
      .insert({ post_id, user_id: user.user_id, type:reaction })
      .returning(["post_id", "user_id", "type", "created_at"]);
    return res.status(200).json({
      result,
      message: "successfully reacted to blog",
    });
  } catch (error) {
    console.error("Error in react:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateReaction = async (req, res) => {
  try {
    const user = req.user;
    const { reaction_id,reaction } = req.body;
    if (!reaction || !reaction_id ) {
      return res
        .status(400)
        .json({ error: "reaction_id and reaction are required!" });
    }
    if (reaction!='like' && reaction!='dislike') {
        return res
        .status(500)
        .json({ error: "Invalid reaction" });
    }

    const old_reaction = await db("reactions").where({ reaction_id }).first();
    if (!old_reaction) {
      return res.status(404).json({ error: "reaction not found" });
    }
    if (old_reaction.user_id != user.user_id) {
      return res.status(403).json({ error: "Unauthorised!" });
    }
    const result = await db("reactions")
      .update({
        user_id: user.user_id,
        type:reaction,
        updated_at: db.fn.now(),
      })
      .where({ reaction_id:reaction_id })
      .returning(["post_id", "user_id", "type", "created_at"]);
    return res.status(200).json({
      result,
      message: "reaction successfully updated",
    });
  } catch (error) {
    console.error("Error in update reaction:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReactions = async (req, res) => {
  try {
    const { post_id } = req.query;
    if (!post_id) {
      return res.status(400).json("post_id is required");
    }
    const post = await db("blogs").where({ post_id }).first();
    if (!post) {
      return res.status(404).json("blog not found!");
    }
    const reactions = await db("reactions").where({ post_id });
    let like_count=0;
    let dislike_count=0;
    let total_count=reactions.length;
    if (reactions && reactions.length != 0 ) {
      for (let index = 0; index < reactions.length; index++) {
            if (reactions[index].type=='like') {
                like_count++;
            }
            else{
                dislike_count++;
            }
            
        }}

    return res.status(200).json({
        total_reactions:total_count,
        likes:like_count,
        dislike:dislike_count,
    });
  } catch (error) {
    console.error("Error in get reactions:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const user = req.user;
    const { reaction_id } = req.body;
    if (!reaction_id) {
      return res.status(400).json({ error: "reaction_id is required" });
    }

    const exist = await db("reactions").where({ reaction_id }).first();
    if (!exist) {
      return res.status(404).json({ eror: "reaction_id does not exist" });
    }
    if (exist.user_id != user.user_id) {
      return res.status(403).json({ error: "Unauthorised!" });
    }
    await db("reactions").delete().where({ reaction_id });
    return res.status(200).json({
      message: "reaction successfully deleted",
    });
  } catch (error) {
    console.error("Error in delete reaction:", error);
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { react, updateReaction, getAllReactions, deleteReaction };
