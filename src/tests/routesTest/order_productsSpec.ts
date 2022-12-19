import supertest from 'supertest'
import { Order_products_model } from '../../models/order_products.model'
import { ProductModel } from '../../models/product.model'
import { OrderModel } from '../../models/order.model'
import { UserModel } from '../../models/user.model'
import db from '../../database'
import { OrderType } from '../../types/Order.type'
import { UserType } from '../../types/user.type'
import { order_products_type } from '../../types/order_products.type'
import { ProductType } from '../../types/product.type'
import app from '../../index'

const orderModel = new OrderModel()
const userModel = new UserModel()
const productModel = new ProductModel()
const orderProductsModel = new Order_products_model()
const request = supertest(app)

describe('Test Order API Endpoints', () => {
  const order_products: order_products_type = {
    id: 1,
    order_id: 1,
    product_id: 1,
    quantity_of_each_product: 1
  }
  const product: ProductType = {
    id: 1,
    name: 'phone',
    price: 10
  }
  const order: OrderType = {
    id: 1,
    user_id: 1,
    status: 'active'
  }
  const user: UserType = {
    id: 1,
    firstname: 'ziad',
    lastname: 'amer',
    password: 'ziad123'
  }

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    const createdProduct = await productModel.create(product)
    const createdOrder = await orderModel.create(order)
  })

  describe('Test CRUD methods', () => {
    it('should return 200 CREATED status code', async () => {
      const res = await request
        .post('/api/order_products')
        .set('Content-Type', 'application/json')
        .send(order_products)

      const { id, order_id, product_id, quantity_of_each_product } = res.body.data

      expect(id).toBe(1)
      expect(res.status).toBe(200)
      expect(order_id).toBe(1)
      expect(product_id).toBe(1)
      expect(quantity_of_each_product).toBe(1)
    })

    it('should return 200 to get all order products', async () => {
      const res = await request.get('/api/order_products').send()

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('should return 200 to get a single order product by id', async () => {
      const res = await request.get(`/api/order_products/${order_products.id}`).send()

      const { id, order_id, product_id, quantity_of_each_product } = res.body.data

      expect(id).toBe(1)
      expect(res.status).toBe(200)
      expect(order_id).toBe(1)
      expect(product_id).toBe(1)
      expect(quantity_of_each_product).toBe(1)
    })

    it('should return 200 to update a order and give us a new order product', async () => {
      const res = await request
        .patch(`/api/order_products`)
        .set('Content-Type', 'application/json')
        .send({
          ...order_products,
          order_id: 1,
          product_id: 1,
          quantity_of_each_product: 10
        })
      const { id, order_id, product_id, quantity_of_each_product } = res.body.data
      expect(res.status).toBe(200)
      expect(id).toBe(order.id)
      expect(order_id).toBe(1)
      expect(product_id).toBe(1)
      expect(quantity_of_each_product).toBe(10)
    })

    it('should return 200 to delete a order product by id', async () => {
      const res = await request.delete(`/api/order_products/${order.id}`).send()
      expect(res.status).toBe(200)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql = `
      DELETE FROM order_products;\n
      ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n
      DELETE FROM orders;\n
      ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
      DELETE FROM product;\n
      ALTER SEQUENCE product_id_seq RESTART WITH 1;\n
      DELETE FROM users;\n
      ALTER SEQUENCE users_id_seq RESTART WITH 1;
    `
    await connection.query(sql)
    connection.release()
  })
})
