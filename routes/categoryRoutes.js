import {Router} from "express"
import {createCategory, renameCategory, getCategories, deleteCategory} from "../controllers/categoryAPIs/barrel.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

export const categoryRouter = Router()

categoryRouter
  .post ('/category/create', authMiddleware, createCategory)
  .put ('/category/rename/:id', authMiddleware, renameCategory)
  .get ('/categories', getCategories)
  .delete ('/category/delete/:id', authMiddleware, deleteCategory)