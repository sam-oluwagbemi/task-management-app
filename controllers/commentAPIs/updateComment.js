import {Article} from "../../schemas/articleSchema.js"
import {Comment} from "../../schemas/commentSchema.js"

export const editComment = async (req, res) => {
  try {
    const {id: commentId} = req.params
    const {comment} = req.body
    const userId = req.user._id

    if (!comment) {
      return res.status(400).json({message: "please write a comment"})
    }

    if (!userId) {
      return res.status(401).json({message: "unauthorized user"})
    }

    const existingComment = await Comment.findById(commentId)
    if (!existingComment) {
      return res.status(404).json({message: "comment not founc"})
    }

    if (existingComment.userId.toString() !== userId.toString()) {
      return res.status(403).json({message: "You cannot edit this comment"})
    }

    existingComment.body = comment
    await existingComment.save()

    console.log("comment updated successfully")
    res.status(200).json(existingComment)
  } catch (error) {
    console.log(error)
  }
}