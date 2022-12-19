import express from 'express'
import * as controllers from '../../controllers/order_products.controllers'

const routes = express.Router()

routes.get('/', controllers.index)
routes.get('/:order_products_id', controllers.show)
routes.post('/', controllers.create)
routes.delete('/:order_products_id', controllers.remove)
routes.patch('/', controllers.update)

export default routes
