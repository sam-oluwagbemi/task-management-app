import { Article } from "../../schemas/articleSchema.js"

export const createArticle = async (req, res) => {
  const {title, subheader, body} = req.body 
  const imgUrl = req.file ? `/uploads/images/${req.file.filename}` : null
  const {id} = req.user
  if (!title || !subheader || !body || !imgUrl ) {
    res.status(400).json({message: "Please provide all fields"})
    return
  }
  try {
    const article = new Article({title, subheader, body, imgUrl, userId: id})
    await article.save()
    res.status(201).json({message: "New Article posted Successfully"})
  } catch (error) {
    res.status(500).json(error)
  }
}