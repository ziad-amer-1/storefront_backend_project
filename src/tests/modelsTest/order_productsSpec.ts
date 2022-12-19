import { Order_products_model } from '../../models/order_products.model'
import { ProductModel } from '../../models/product.model'
import { OrderModel } from '../../models/order.model'
import { UserModel } from '../../models/user.model'
import db from '../../database'
import { OrderType } from '../../types/Order.type'
import { UserType } from '../../types/user.type'
import { order_products_type } from '../../types/order_products.type'
import { ProductType } from '../../types/product.type'

const orderModel = new OrderModel()
const userModel = new UserModel()
const productModel = new ProductModel()
const orderProductsModel = new Order_products_model()

describe('Order Products Model Test', () => {
  describe('Test Method existence', () => {
    it('should have a method that returns all order products', () => {
      expect(orderProductsModel.index).toBeDefined()
    })
    it('should have a method that returns a single order product', () => {
      expect(orderProductsModel.show).toBeDefined()
    })
    it('should have a method that creates a order product', () => {
      expect(orderProductsModel.create).toBeDefined()
    })
    it('should have a method that updates a order product', () => {
      expect(orderProductsModel.update).toBeDefined()
    })
    it('should have a method that deletes a order product', () => {
      expect(orderProductsModel.delete).toBeDefined()
    })
  })
  describe('Test order products model Logic', () => {
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

    // before writing our logic i should make sure that my user is created
    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      const createdProduct = await productModel.create(product)
      const createdOrder = await orderModel.create(order)
    })

    it('Create order should resturn a new order products', async () => {
      const createdOrderProducts = await orderProductsModel.create(order_products)
      expect(createdOrderProducts).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity_of_each_product: 1
      } as order_products_type)
    })

    it('Get All Order products should return all available order products in database', async () => {
      const createdOrderProducts = await orderProductsModel.index()
      expect(createdOrderProducts.length).toBe(1)
    })

    it('Get Single Order product with id should return a Order product ', async () => {
      const singleOrderProduct = await orderProductsModel.show(
        order_products.id as unknown as string
      )
      expect(singleOrderProduct.id).toBe(order_products.id)
      expect(singleOrderProduct.order_id).toBe(order_products.order_id)
      expect(singleOrderProduct.product_id).toBe(order_products.product_id)
      expect(singleOrderProduct.quantity_of_each_product).toBe(
        order_products.quantity_of_each_product
      )
    })

    it('Update Order product should return a order with new values', async () => {
      const updatedOrderProduct = await orderProductsModel.update({
        ...order_products,
        order_id: 1,
        product_id: 1,
        quantity_of_each_product: 10
      })
      expect(updatedOrderProduct.id).toBe(order_products.id)
      expect(updatedOrderProduct.order_id).toBe(1)
      expect(updatedOrderProduct.product_id).toBe(1)
      expect(updatedOrderProduct.quantity_of_each_product).toBe(10)
    })

    it('Delete method should delete Order Product from database', async () => {
      const deletedOrderProduct = await orderProductsModel.delete(order.id as unknown as string)
      expect(deletedOrderProduct).toBe(
        `DELETED order products With id = ${order_products.id} Successfully`
      )
    })

    // after writing our logic i should make sure that my user is deleted

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
})
