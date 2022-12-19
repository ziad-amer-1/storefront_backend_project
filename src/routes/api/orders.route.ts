import express from 'express'
import * as controllers from '../../controllers/orders.controllers'

const routes = express.Router()

routes.get('/', controllers.index)
routes.get('/:orderId', controllers.show)
routes.post('/', controllers.create)
routes.delete('/:orderId', controllers.remove)
routes.patch('/', controllers.update)

export default routes
