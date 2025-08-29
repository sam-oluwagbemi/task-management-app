import {Task} from "../../schemas/taskSchema.js"

export const getTasks = async (req, res) => {
  const {id} = req.user
  const {status, favorite, categoryId} = req.query

  let filter = {user: id}

  if (status === "completed") filter.isCompleted = true
  if (status === "pending") filter.isCompleted = false

  if (favorite === "true") filter.favorite = true

  if(categoryId) filter.category = categoryId

  try {
    const tasks = await Task.find(filter).populate("category", "name Default")
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getCompletedTasks = async (req, res) => {
  req.query.status = "completed"
  return getTasks(req, res)
}

export const getPendingTasks = async (req, res) => {
  req.query.status = "pending"
  return getTasks(req, res)
}

export const getFavoriteTasks = async (req, res) => {
  req.query.favorite = "true"
  return getTasks(req, res)
}