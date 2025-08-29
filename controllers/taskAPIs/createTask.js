import {Task} from "../../schemas/taskSchema"
import {Category} from "../../schemas/categorySchema"

export const createTask = async (req, res) => {
  const {title, description, deadline, favorite, categoryId} = req.body 
  const {id} = req.user
  if (!title) {
    res.status(400).json({message: "Please provide a name for your task"})
    return
  }
  try {
    const category = await Category.findOne({_id: categoryId, user: id})
    if (!category) {
      return res.status(404).json({message: "Task category does not exist"})
    }

    const task = new Task({
      title, 
      description, 
      deadline, 
      favorite, 
      user: id,
      category: categoryId
    })

    await task.save()
    res.status(201).json({message: "New Task created", task})
  } catch (error) {
    res.status(500).json(error)
  }
}