import { OrderType } from '../types/Order.type'
import db from '../database'
import dotenv from 'dotenv'
dotenv.config()

export class OrderModel {
  async index(): Promise<OrderType[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get Orders ${err}`)
    }
  }
  async show(id: string): Promise<OrderType> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM orders WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot get The Order with id = ${id} ${err}`)
    }
  }
  async create(order: OrderType): Promise<OrderType> {
    try {
      const connection = await db.connect()
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id, user_id, status'
      const result = await connection.query(sql, [order.user_id, order.status])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot create order ${err}`)
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const connection = await db.connect()
      const sql = `
        DELETE FROM orders WHERE id = ($1);
      `
      await connection.query(sql, [id])
      connection.release()
      return `DELETED order With id = ${id} Successfully`
    } catch (err) {
      throw new Error(`
      Unable to Delete order with id =  ${id}: ${(err as Error).message}
      `)
    }
  }
  async update(order: OrderType): Promise<OrderType> {
    try {
      const connection = await db.connect()
      const sql = `
        UPDATE orders SET user_id = $1, status = $2 WHERE id = $3
        RETURNING id, user_id, status
      `
      const result = await connection.query(sql, [order.user_id, order.status, order.id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to Update Order with The id = ${order.id}`)
    }
  }
  async currentOrderByUser(user_id: number): Promise<OrderType> {
    try {
      const connection = await db.connect()
      const sql = `SELECT * FROM orders WHERE user_id = $1`
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to get the current order by user id = ${user_id}`)
    }
  }
}
