import mongoose from "mongoose"
import {Article} from "../../schemas/articleSchema.js"
import {Comment} from "../../schemas/commentSchema.js"

export const getCommentsByArticle = async (req, res) => {
  try {
    const {articleId} = req.params

    const comments = await Comment
    .find({articleId: new mongoose.Types.ObjectId(articleId)})
    .populate("userId", "userName email")
    .sort({createdAt: -1})

  res.status(200).json(comments)
  } catch (error) {
    console.log(error)
  }
}

export const getAComment = async (req, res) => {
  try {
    const {articleId, id} = req.params

    const comment = await Comment
      .findOne({_id: id, articleId})
      .populate("userId", "userName email")

    if (!comment) {
      return res.status(404).json({message: "comment not found"})
    }
    
    res.status(200).json(comment)
  } catch (error) {
    console.log(error)
  }
}