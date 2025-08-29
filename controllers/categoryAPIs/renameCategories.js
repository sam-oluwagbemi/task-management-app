import {Category} from "../../schemas/categorySchema.js"

export const renameCategory = async (req, res) => {
  const {id} = req.params
  const {name} = req.body
  const {user} = req.user._id

  try {
    const category = await Category.findOne({_id: id, user})
    if (!category) {
      return res.status(404).json({message: "category not founc"})
    }

    if (category.Default) {
      return res.status(403).json({message: "Default categories cannot be renamed"})
    }

    category.name = name || category.name
    await category.save()

    console.log("category renamed successfully")
    res.status(200).json(category)
  } catch (error) {
    console.log(error)
  }
}