import {Category} from "../../schemas/categorySchema.js"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({user: req.user._id})
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
}