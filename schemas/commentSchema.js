import mongoose from 'mongoose'

const replySchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    body: {type: String, required: true},
  },
  {timestamps: true}
)

export const commentSchema = new mongoose.Schema(
  {
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  
    body: {type: String, required: true},
    replies: [replySchema],
  },
  {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema)