import { ProductModel } from '../../models/product.model'
import db from '../../database'
import { ProductType } from '../../types/product.type'

const productModel = new ProductModel()

describe('Product Model Test', () => {
  describe('Test Method existence', () => {
    it('should have a method that returns all users', () => {
      expect(productModel.index).toBeDefined()
    })
    it('should have a method that returns a single user', () => {
      expect(productModel.show).toBeDefined()
    })
    it('should have a method that creates a user', () => {
      expect(productModel.create).toBeDefined()
    })
    it('should have a method that updates a user', () => {
      expect(productModel.update).toBeDefined()
    })
    it('should have a method that deletes a user', () => {
      expect(productModel.delete).toBeDefined()
    })
  })
  describe('Test product model Logic', () => {
    const product: ProductType = {
      name: 'bag',
      price: 10
    }

    // before writing our logic i should make sure that my user is created
    beforeAll(async () => {
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id
    })

    it('Create product should resturn a new product', async () => {
      const createdProduct = await productModel.create({
        name: 'phone',
        price: 100
      })
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'phone',
        price: 100
      } as ProductType)
    })

    it('Get All Products should return all available Products in database', async () => {
      const products = await productModel.index()
      expect(products.length).toBe(2)
    })

    it('Get Single Product with id should return a Product ', async () => {
      const singleProduct = await productModel.show(product.id as unknown as string)
      expect(singleProduct.id).toBe(product.id)
      expect(singleProduct.name).toBe(product.name)
      expect(singleProduct.price).toBe(product.price)
    })

    it('Update Product should return a product with new values', async () => {
      const updatedProduct = await productModel.update({
        ...product,
        name: 'new phone',
        price: 200
      })
      expect(updatedProduct.id).toBe(updatedProduct.id)
      expect(updatedProduct.name).toBe('new phone')
      expect(updatedProduct.price).toBe(200)
    })

    it('Delete method should delete Product from database', async () => {
      const deletedUser = await productModel.delete(product.id as unknown as string)
      expect(deletedUser).toBe(`DELETED Product With id = ${product.id} Successfully`)
    })

    // after writing our logic i should make sure that my user is deleted
    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM product;\nALTER SEQUENCE product_id_seq RESTART WITH 1;`
      await connection.query(sql)
      connection.release()
    })
  })
})
