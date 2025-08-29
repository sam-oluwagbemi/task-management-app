import {Task} from "../../schemas/taskSchema.js"

export const deleteTask = async (req, res) => {
  const {id} = req.params
  const {userId} = req.user.id
  try {
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({message: "Task not found"})
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({message: "You are not authorized to delete this task"})
    }

    await task.deleteOne()
    res.status(200).json({message: "Task deleted"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}