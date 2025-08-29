import {Task} from "../../schemas/taskSchema.js"

export const editTask = async (req, res) => {
  const {id} = req.params
  const userId = req.user._id
  
  try {
    const task = await Task.findOne({_id: id, user: userId})
    if (!task) {
      return res.status(404).json({message: "Task not found"})
    }
    
    const updatableFields = ["title", "description", "deadline", "category", "favorite", "isCompleted"]
    
    //CHECK FOR INVALID FIELDS
    const invalidFields = Object.keys(req.body).filter(field => !updatableFields.includes(field))

    if(invalidFields.length > 0) {
      return res.status(400).json({message: "invalid fields provided", invalidFields})
    }

    //UPDATE ONLY ALLOWED FIELDS
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field]
      }
    })

    await task.save()

    //ALTERNATE METHOD
    // const updatableFields = ["title", "description", "deadline", "category", "favorite", "isCompleted"]
    // const updatedFields = {}

    // updatableFields.forEach(field => {
    //   if (req.body[field] !== undefined) {
    //     updatedFields[field] = req.body[field]
    //   }
    // })

    // const task = await Task.findOneAndUpdate(
    //   {_id: id, user: userId},
    //   {$set: updatedFields},
    //   {new: true, runValidators: true}
    // )

    // if (!task) {
    //   return res.status(404).json({message: "Task not found"})
    // }

    res.status(200).json({message: "Task updated sucessfully!"})
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({message: "something went wrong"})
  }
}