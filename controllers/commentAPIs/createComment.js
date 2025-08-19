import {Comment} from "../../schemas/commentSchema.js"
import {Article} from "../../schemas/articleSchema.js"

export const addComment = async (req, res) => {
  try {
    const {id: articleId} = req.params
    const {comment} = req.body
    const userId = req.user._id
    
    if (!comment) {
      return res.status(400).json({message: "please write a comment"})
    }

    const article = await Article.findById(articleId)
    if (!article) {
      return res.status(404).json({message: "Article not found"})
    }

    const newComment = await Comment.create({
      articleId, 
      userId, 
      body: comment
    })

    console.log('comment posted successfully')
    res.status(201).json(newComment)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: error.message, stack: error.stack})
  }
}