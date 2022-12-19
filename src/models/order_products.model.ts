import { order_products_type } from '../types/order_products.type'
import db from '../database'
import dotenv from 'dotenv'
dotenv.config()

export class Order_products_model {
  async index(): Promise<order_products_type[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM order_products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get Order_products ${err}`)
    }
  }
  async show(id: string): Promise<order_products_type> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM order_products WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot get The Order products with id = ${id} ${err}`)
    }
  }
  async create(order_products: order_products_type): Promise<order_products_type> {
    try {
      const connection = await db.connect()
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity_of_each_product) VALUES ($1, $2, $3) RETURNING id, order_id, product_id, quantity_of_each_product'
      const result = await connection.query(sql, [
        order_products.order_id,
        order_products.product_id,
        order_products.quantity_of_each_product
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot create order products ${err}`)
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const connection = await db.connect()
      const sql = `
        DELETE FROM order_products WHERE id = ($1);
      `
      await connection.query(sql, [id])
      connection.release()
      return `DELETED order products With id = ${id} Successfully`
    } catch (err) {
      throw new Error(`
      Unable to Delete order products with id =  ${id}: ${(err as Error).message}
      `)
    }
  }
  async update(order_products: order_products_type): Promise<order_products_type> {
    try {
      const connection = await db.connect()
      const sql = `
        UPDATE order_products SET order_id = $1, product_id = $2, quantity_of_each_product = $3 WHERE id = $4
        RETURNING *
      `
      const result = await connection.query(sql, [
        order_products.order_id,
        order_products.product_id,
        order_products.quantity_of_each_product,
        order_products.id
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to Update Order with The id = ${order_products.id}`)
    }
  }
}
