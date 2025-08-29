import mongoose from 'mongoose'

export const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},  
    Default: {type: Boolean, default: false}
  })

export const Category = mongoose.model("Category", categorySchema)