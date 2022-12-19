import { OrderModel } from '../../models/order.model'
import { UserModel } from '../../models/user.model'
import db from '../../database'
import { OrderType } from '../../types/Order.type'
import { UserType } from '../../types/user.type'

const orderModel = new OrderModel()
const userModel = new UserModel()

describe('Order Model Test', () => {
  describe('Test Method existence', () => {
    it('should have a method that returns all orders', () => {
      expect(orderModel.index).toBeDefined()
    })
    it('should have a method that returns a single order', () => {
      expect(orderModel.show).toBeDefined()
    })
    it('should have a method that creates a order', () => {
      expect(orderModel.create).toBeDefined()
    })
    it('should have a method that updates a order', () => {
      expect(orderModel.update).toBeDefined()
    })
    it('should have a method that deletes a order', () => {
      expect(orderModel.delete).toBeDefined()
    })
  })
  describe('Test order model Logic', () => {
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
    })

    it('Create order should resturn a new order', async () => {
      const createdOrder = await orderModel.create(order)
      expect(createdOrder).toEqual({
        id: 1,
        user_id: 1,
        status: 'active'
      } as OrderType)
    })

    it('Get All Orders should return all available Orders in database', async () => {
      const orders = await orderModel.index()
      expect(orders.length).toBe(1)
    })

    it('Get Single Order with id should return a Order ', async () => {
      const singleOrder = await orderModel.show(order.id as unknown as string)
      expect(singleOrder.id).toBe(order.id)
      expect(singleOrder.user_id).toBe(order.user_id)
    })

    it('Update Order should return a order with new values', async () => {
      const updatedOrder = await orderModel.update({
        ...order,
        status: 'complete'
      })
      expect(updatedOrder.id).toBe(order.id)
      expect(updatedOrder.status).toBe('complete')
    })

    it('Delete method should delete Order from database', async () => {
      const deletedOrder = await orderModel.delete(order.id as unknown as string)
      expect(deletedOrder).toBe(`DELETED order With id = ${order.id} Successfully`)
    })

    // after writing our logic i should make sure that my user is deleted
    
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
})
