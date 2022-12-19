import express from 'express'
import * as controllers from '../../controllers/products.controllers'

const routes = express.Router()

routes.get('/', controllers.index)
routes.get('/:productId', controllers.show)
routes.post('/', controllers.create)
routes.delete('/:productId', controllers.remove)
routes.patch('/', controllers.update)

export default routes
