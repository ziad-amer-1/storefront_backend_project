import express from 'express'
import usersRoutes from './api/users.route'
import productsRoutes from './api/products.route'
import ordersRoutes from './api/orders.route'
import orderProductsRoutes from './api/order_products.routre'

const routes = express.Router()

routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)
routes.use('/orders', ordersRoutes)
routes.use('/order_products', orderProductsRoutes)

export default routes
