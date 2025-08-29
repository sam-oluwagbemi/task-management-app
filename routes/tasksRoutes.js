import {Router} from "express"
import {createTask, getTasks, getCompletedTasks, getFavoriteTasks, getPendingTasks, editTask, deleteTask} from "../controllers/taskAPIs/barrel.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

export const taskRouter = Router()

taskRouter
  .post('/tasks/create', authMiddleware, createTask)
  .get('/tasks', authMiddleware, getTasks)
  .get('/tasks/completed', authMiddleware, getCompletedTasks)
  .get('/tasks/pending', authMiddleware, getPendingTasks)
  .get('/tasks/favorites', authMiddleware, getFavoriteTasks)
  .put('/tasks/edit/:id', authMiddleware, editTask)
  .delete('/tasks/delete/:id', authMiddleware, deleteTask)