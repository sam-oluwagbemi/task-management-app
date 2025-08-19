import {Router} from "express"
import {createArticle, getuserArticles, getAllArticles, getAnArticle, editArticle, deleteArticle, getByqueryParams} from "../controllers/articleAPIs/barrel.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {upload} from "../middlewares/fileUploadMiddleware.js"

export const articleRouter = Router()

articleRouter
  .post('/article/create', authMiddleware, upload.single('image'), createArticle) //POST REQ
  .get('/articles/articleByQuery', getByqueryParams)
  .get('/articles/:userId', getuserArticles) //GET REQ
  .get('/articles', getAllArticles) //GET REQ
  .get('/article/:id', getAnArticle) //GET REQ
  .put('/article/update/:id', authMiddleware, upload.single('image'), editArticle) //PUT REQ
  .delete('/article/delete/:id', authMiddleware, deleteArticle) //DELETE REQ 