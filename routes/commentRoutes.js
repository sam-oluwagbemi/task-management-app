import {Router} from "express"
import {addComment, editComment, getAComment, getCommentsByArticle, deleteComment} from "../controllers/commentAPIs/barrel.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {addReply, deleteReply, editReply} from "../controllers/commentAPIs/reply.js"

export const commentRouter = Router()

commentRouter
  .post ('/article/:id/comment/create', authMiddleware, addComment)
  .put ('/article/:id/comment/update/:id', authMiddleware, editComment)
  .get ('/article/:articleId/comments', getCommentsByArticle)
  .get ('/article/:articleId/comment/:id', getAComment)
  .delete ('/article/:articleId/comment/delete/:id', authMiddleware, deleteComment)
  .post ('/article/:articleId/comment/:commentId/reply', authMiddleware, addReply)
  .put ('/article/:articleId/comment/:commentId/reply/edit/:replyId', authMiddleware, editReply)
  .delete ('/article/:articleId/comment/:commentId/reply/delete/:replyId', authMiddleware, deleteReply)