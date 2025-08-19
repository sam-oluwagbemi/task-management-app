import {Article} from "../../schemas/articleSchema.js"

export const editArticle = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  
  try {
    const article = await Article.findOne({_id: id, userId: reqId})
    if (!article) {
      res.status(400).json({message: "Article not found"})
      return
    }
    article.title = req.body.title ?? article.title
    article.subheader = req.body.subheader ?? article.subheader
    article.body = req.body.body ?? article.body

    if (req.file) {
      article.imgUrl = `uploads/images/${req.file.filename}`
    }

    await article.save()

    //ALTERNATE METHOD
    // await article.findByIdAndUpdate(id, {
    //   $set: {
    //     'title': title, 
    //     'subheader': subheader, 
    //     'body': body, 
    //     'imgUrl': imgUrl, 
    // }, {new: true})

    res.status(200).json({message: "Article updated sucessfully!"})
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({message: "something went wrong"})
  }
}