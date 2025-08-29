import {Router} from 'express'
import {createUser, getAUser, getAllUsers, getByqueryParams, editProfile, editUser, deleteUser } from '../controllers/userAPIs/barrel.js'
import {authMiddleware} from "../middlewares/barrel.js"
import {adminMiddleware} from '../middlewares/barrel.js'

export const userRouter = Router()

userRouter
  .post('/user/create', createUser) //POST REQ
  .get('/users', authMiddleware, adminMiddleware, getAllUsers) //GET REQ
  .get('/user/:id', authMiddleware, authMiddleware, getAUser) //GET REQ
  .get('/usersByquery', authMiddleware, getByqueryParams) //GET USER QUERY/SEARCH
  .put('/user/update/:id', authMiddleware, editUser) //EDIT/UPDATE USER
  .delete('/user/delete/:id', authMiddleware, deleteUser) //DELETE REQ