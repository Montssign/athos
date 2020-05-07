import { Router } from 'express'
import multer from 'multer'

import multerConfg from './configs/multer'

import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import NotificationController from './app/controllers/NotificationController'

const routes = Router()
const upload = multer(multerConfg)

routes.get('/', (req, res) => res.json({ message: 'Hello from Athos api' }))

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

routes.get('/files', FileController.index)
routes.post('/files', upload.array('file', 5), FileController.store)

export default routes
