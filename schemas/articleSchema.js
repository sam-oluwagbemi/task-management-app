import mongoose from 'mongoose'

export const articleSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  
    title: {type: String, required: true},
    subheader: {type: String, required: true},
    body: {type: String, required: true},
    imgUrl: {type: String},
  },
  {timestamps: true});

export const Article = mongoose.model("Article", articleSchema)