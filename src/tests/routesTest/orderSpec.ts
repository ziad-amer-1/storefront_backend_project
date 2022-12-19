import supertest from 'supertest'
import db from '../../database'
import { OrderModel } from '../../models/order.model'
import { UserModel } from '../../models/user.model'
import { OrderType } from '../../types/Order.type'
import { UserType } from '../../types/user.type'
import app from '../../index'

const orderModel = new OrderModel()
const userModel = new UserModel()
const request = supertest(app)

describe('Test Order API Endpoints', () => {
  const user: UserType = {
    id: 1,
    firstname: 'ziad',
    lastname: 'amer',
    password: 'ziad123'
  }
  const order: OrderType = {
    id: 1,
    user_id: 1,
    status: 'active'
  }

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    order.id = createdUser.id
  })

  describe('Test CRUD methods', () => {
    it('should return 200 CREATED status code', async () => {
      const res = await request
        .post('/api/orders')
        .set('Content-Type', 'application/json')
        .send(order)

      const { id, status, user_id } = res.body.data

      expect(id).toBe(1)
      expect(res.status).toBe(200)
      expect(user_id).toBe(1)
      expect(status).toBe('active')
    })

    it('should return 200 to get all orders', async () => {
      const res = await request.get('/api/orders').send()

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('should return 200 to get a single order by id', async () => {
      const res = await request.get(`/api/orders/${order.id}`).send()

      const { id, status, user_id } = res.body.data

      expect(id).toBe(1)
      expect(res.status).toBe(200)
      expect(user_id).toBe(1)
      expect(status).toBe('active')
    })

    it('should return 200 to update a order and give us a new order', async () => {
      const res = await request
        .patch(`/api/orders`)
        .set('Content-Type', 'application/json')
        .send({
          ...order,
          quantity_of_each_product: 5,
          status: 'complete'
        })
      const { id, status, user_id } = res.body.data
      expect(res.status).toBe(200)
      expect(id).toBe(order.id)
      expect(status).toBe('complete')
    })

    it('should return 200 to delete a order by id', async () => {
      const res = await request.delete(`/api/orders/${order.id}`).send()
      expect(res.status).toBe(200)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `
        DELETE FROM orders;\n
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
        DELETE FROM users;\n
        ALTER SEQUENCE users_id_seq RESTART WITH 1;
      `
    await connection.query(sql)
    connection.release()
  })
})
