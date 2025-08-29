import {Category} from "../../schemas/categorySchema.js"

export const createCategory = async (req, res) => {
  try {
    const {name} = req.body
    const userId = req.user._id
    
    if (!name) {
      return res.status(400).json({message: "Category name is required"})
    }

    const existingCategory = await Category.findOne({name, user: userId})
    if (!existingCategory) {
      return res.status(400).json({message: "Category already exists"})
    }

    const category = await new Category({name, user: userId})
    await category.save()

    console.log('new category created')
    res.status(201).json(category)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}