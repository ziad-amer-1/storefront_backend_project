import express from 'express'
import * as controllers from '../../controllers/users.controllers'

const routes = express.Router()

routes.get('/', controllers.index)
routes.get('/:userId', controllers.show)
routes.post('/', controllers.create)
routes.delete('/:userId', controllers.remove)
routes.patch('/', controllers.update)
routes.post('/authenticate', controllers.authenticate)


export default routes
