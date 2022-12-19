import { ProductType } from '../types/product.type'
import db from '../database'
import dotenv from 'dotenv'
dotenv.config()

export class ProductModel {
  async index(): Promise<ProductType[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM product'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get products ${err}`)
    }
  }
  async show(id: string): Promise<ProductType> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM product WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot get The product with id = ${id} ${err}`)
    }
  }
  async create(product: ProductType): Promise<ProductType> {
    try {
      const connection = await db.connect()
      const sql = 'INSERT INTO product (name, price) VALUES ($1, $2) RETURNING id, name, price'
      const result = await connection.query(sql, [product.name, product.price])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot create product ${err}`)
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const connection = await db.connect()
      const sql = `
        DELETE FROM product WHERE id = ($1);
      `
      await connection.query(sql, [id])
      connection.release()
      return `DELETED Product With id = ${id} Successfully`
    } catch (err) {
      throw new Error(`
      Unable to Delete Product with id =  ${id}: ${(err as Error).message}
      `)
    }
  }
  async update(product: ProductType): Promise<ProductType> {
    try {
      const connection = await db.connect()
      const sql = `
        UPDATE product SET name = $1, price = $2 WHERE id = $3
        RETURNING id, name, price
      `
      const result = await connection.query(sql, [product.name, product.price, product.id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to Update user with The id = '${product.id}'`)
    }
  }
}
