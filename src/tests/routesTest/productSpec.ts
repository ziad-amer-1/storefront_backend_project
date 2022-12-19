import supertest from 'supertest'
import db from '../../database'
import { ProductModel } from '../../models/product.model'
import { ProductType } from '../../types/product.type'
import app from '../../index'

const productModel = new ProductModel()
const request = supertest(app)

describe('Test Product API Endpoints', () => {
  const product: ProductType = {
    name: 'phone',
    price: 100
  }

  beforeAll(async () => {
    const createdProduct = await productModel.create(product)
    product.id = createdProduct.id
  })

  describe('Test CRUD methods', () => {
    it('should return 200 CREATED status code', async () => {
      const res = await request.post('/api/products').set('Content-Type', 'application/json').send({
        name: 'phone',
        price: 100
      })

      const { id, name, price } = res.body.data

      expect(id).toBe(2)
      expect(res.status).toBe(200)
      expect(name).toBe('phone')
      expect(price).toBe(100)
    })

    it('should return 200 to get all products', async () => {
      const res = await request.get('/api/products').send()

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should return 200 to get a single product by id', async () => {
      const res = await request.get(`/api/products/${product.id}`).send()

      const { id, name, price } = res.body.data

      expect(res.status).toBe(200)
      expect(name).toBe(product.name)
      expect(price).toBe(product.price)
      expect(id).toBe(product.id)
    })

    it('should return 200 to update a product and give us a new product', async () => {
      const res = await request
        .patch(`/api/products`)
        .set('Content-Type', 'application/json')
        .send({
          ...product,
          name: 'new phone',
          price: 250
        })
      const { id, name, price } = res.body.data
      expect(res.status).toBe(200)
      expect(id).toBe(product.id)
      expect(name).toBe('new phone')
      expect(price).toBe(250)
    })

    it('should return 200 to delete a product by id', async () => {
      const res = await request.delete(`/api/products/${product.id}`).send()
      expect(res.status).toBe(200)
      expect(res.body.message).toBe(`DELETED Product With id = ${product.id} Successfully`)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(`DELETE FROM product;\nALTER SEQUENCE product_id_seq RESTART WITH 1;`)
    connection.release()
  })
})
