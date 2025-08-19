import {Comment} from "../../schemas/commentSchema.js";
import mongoose from "mongoose"

export const addReply = async (req, res) => {
  try {
    const {commentId} = req.params
    const {reply} = req.body
    const userId = req.user._id

    if (!reply) {
      return res.status(400).json({message: "field cannot be empty"})
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
      return res.status(400).json({message: "comment not found"})
    }

    comment.replies.push({
      userId,
      body: reply
    })
    await comment.save()
    res.status(200).json({message: "Reply added succesfully"})

  } catch (error) {
    console.log(error)
  }
}

export const editReply = async (req, res) => {
  try {
    const {commentId, replyId} = req.params
    const {reply} = req.body
    const userId = req.user._id

    if (!reply)
      return res.status(400).json({message: "Reply field cannot be empty"})

    const comment = await Comment.findById(commentId)
    if (!comment)
      return res.status(400).json({message: "comment not found"})

    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return res.status(400).json({message: "invalid reply ID"})
    }

  const existingReply = comment.replies.id(replyId)
  if (!existingReply) {
    return res.status(404).json({message: "Reply not found"})
  }

  if (existingReply.userId.toString() !== userId.toString()) {
    return res.status (403).json({message: "You cannot edit this reply"})
  }

  existingReply.body = reply
  await comment.save()
  res.status(200).json({message: "Reply updated successfully", reply: existingReply})

  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

export const deleteReply = async (req, res) => {
  try {
  const {commentId, replyId} = req.params
  const userId = req.user._id

  const comment = await Comment.findById(commentId)
  if (!comment) {
    return res.status(404).json({message: "comment not found"})
  }
  const reply = comment.replies.id(replyId)

  if (!reply) {
    return res.status(404).json({message: "Reply not found"})
  }

  if (reply.userId.toString() !== userId.toString()) {
    return res.status(403).json({message: "You cannot delete this reply"})
  }

  reply.deleteOne()
    await comment.save()
    res.status(200).json({message: "Reply Deleted successfully", replies: comment.replies})

  } catch (error) {
     console.log(error)
     res.status(500).json({error})
  }
}