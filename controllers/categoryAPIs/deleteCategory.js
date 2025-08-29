import {Category} from "../../schemas/categorySchema.js"

export const deleteCategory = async (req, res) => {
    const {id} = req.params
    const {user} = req.user._id

  try {
    const category = await Category.findOne({_id: id, user})
    if (!category) {
      return res.status(404).json({message: "Category not found"})
    }

    if (category.Default) {
      return res.status(403).json({message: "Defaault categories cannot be deleted"})
    }

    await Category.deleteOne()
    res.status(200).json({message: "Category Deleted"})
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}