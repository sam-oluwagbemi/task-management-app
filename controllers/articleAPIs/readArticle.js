import {Article} from "../../schemas/articleSchema.js"
import {Comment} from "../../schemas/commentSchema.js"

export const getuserArticles = async (req, res) => {
  const {userId} = req.params
  try {
      const articles = await Article.find({userId})
    res.status(200).json(articles)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('userId').select("-password")
    res.status(200).json(articles)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAnArticle = async (req, res) => {
  const {id} = req.params

  try {
    const article = await Article.findById(id).populate("userId", "userName email")
    const comments = await Comment
      .find({articleId: id})
      .populate("userId", "userName email")
      .sort({createdAt: -1})

    res.status(200).json({article, comments})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getByqueryParams = async (req, res) => {
  const {title, subheader, body, } = req.query
  const filter = {}

  if (title) filter.title = title
  if (subheader) filter.subheader = subheader
  if (body) filter.body = body

  try {
    const article = await Article.find(filter)
    res.status(200).json(article)
  } catch (error) {
    res.status(200).json(error)
  }
}