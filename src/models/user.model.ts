import { UserType } from '../types/user.type'
import db from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

function hashingPassword(password: string) {
  const salt = parseInt(SALT_ROUNDS as string, 10)
  return bcrypt.hashSync(`${password}${BCRYPT_PASSWORD}`, salt)
}

export class UserModel {
  async index(): Promise<UserType[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get Users ${err}`)
    }
  }
  async show(id: string): Promise<UserType> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, firstname, lastname FROM users WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot get The User with id = ${id} ${err}`)
    }
  }
  async create(user: UserType): Promise<UserType> {
    try {
      const connection = await db.connect()
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING id, firstname, lastname'
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        hashingPassword(user.password)
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot create User ${err}`)
    }
  }
  async delete(id: string): Promise<string> {
    try {
      const connection = await db.connect()
      const sql = `
        DELETE FROM users WHERE id = ($1);
      `
      // const alterSequenceQuery = ''
      await connection.query(sql, [id])
      connection.release()
      return `DELETED User With id = ${id} Successfully`
    } catch (err) {
      throw new Error(`
      Unable to Delete User with id =  ${id}: ${(err as Error).message}
      `)
    }
  }
  async update(user: UserType): Promise<UserType> {
    try {
      const connection = await db.connect()
      const sql = `
        UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4
        RETURNING id, firstname, lastname
      `
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        hashingPassword(user.password),
        user.id
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Unable to Update user with The id = '${user.id}'`)
    }
  }
  async authenticate(firstname: string, password: string): Promise<UserType | null> {
    try {
      const connection = await db.connect()
      const sql = `SELECT password FROM users WHERE firstname = $1`
      const result = await connection.query(sql, [firstname])

      if (result.rows.length) {
        const { password: hashedPassword } = result.rows[0]

        const isPasswordRight = bcrypt.compareSync(
          `${password}${process.env.BCRYPT_PASSWORD}`,
          hashedPassword
        )

        if (isPasswordRight) {
          const userInfo = await connection.query(
            `SELECT id, firstname, lastname FROM users WHERE firstname = $1`,
            [firstname]
          )

          return userInfo.rows[0]
        }
      }

      connection.release()
      return null
    } catch (err) {
      throw new Error(`Cannot Authenticate user: ${(err as Error).message}`)
    }
  }
}
