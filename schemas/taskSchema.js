import mongoose from 'mongoose'

export const taskSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},  
    title: {type: String, required: true},
    description: {type: String},
    deadline: {type: Date},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    favorite: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false}
  }, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema)