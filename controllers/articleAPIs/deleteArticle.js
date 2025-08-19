import {Article} from "../../schemas/articleSchema.js"

export const deleteArticle = async (req, res) => {
  const {id} = req.params
  try {
    const article = await Article.findByIdAndDelete(id)
    res.status(200).json({message: "Article deleted successfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}