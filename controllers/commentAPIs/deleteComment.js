import {Comment} from "../../schemas/commentSchema.js"
import {Article} from "../../schemas/articleSchema.js"

export const deleteComment = async (req, res) => {
  try {
    const {articleId, id} = req.params
    const userId = req.user._id

    const comment = await Comment.findById(id)
    if (!comment) {
      return res.status(404).json({message: "comment not found"})
    }

    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({message: "You are not authorized to delete this comment"})
    }

    await Comment.findByIdAndDelete(id)
    res.status(201).json({message: "comment deleted"})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: error.message, stack: error.stack})
  }
}