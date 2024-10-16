import { Router } from 'express'
import multer from 'multer'
import multerconfig from './config/multer'
import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import CreatePaymentIntentConttroller from './app/controllers/stripe/CreatePaymentIntentController'



import OrderController from './app/controllers/OrderController'

const routes = new Router()
const upload = multer(multerconfig)



routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductController.store) //uploads.single('file') pra roda um arquivo por vez
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories',  upload.single('file'), CategoryController.store) 
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

routes.post('/create-payment-intent', CreatePaymentIntentConttroller.store)

export default routes 
