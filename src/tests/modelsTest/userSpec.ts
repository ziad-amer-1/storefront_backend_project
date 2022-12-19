import { UserModel } from '../../models/user.model'
import db from '../../database'
import { UserType } from '../../types/user.type'

const userModel = new UserModel()

describe('User Model Test', () => {
  describe('Test methods existence', () => {
    it('should have a method that returns all users', () => {
      expect(userModel.index).toBeDefined()
    })
    it('should have a method that returns a single user', () => {
      expect(userModel.show).toBeDefined()
    })
    it('should have a method that creates a user', () => {
      expect(userModel.create).toBeDefined()
    })
    it('should have a method that updates a user', () => {
      expect(userModel.update).toBeDefined()
    })
    it('should have a method that deletes a user', () => {
      expect(userModel.delete).toBeDefined()
    })
    it('should have a method that authenticates the user', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  describe('Test user model Logic', () => {
    const user: UserType = {
      firstname: 'ziad',
      lastname: 'amer',
      password: 'ziad123'
    }

    // before writing our logic i should make sure that my user is created
    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id = createdUser.id
    })

    it('Create user should resturn a new user', async () => {
      const createdUser = await userModel.create({
        firstname: 'test',
        lastname: 'test',
        password: 'test'
      })
      expect(createdUser).toEqual({
        id: createdUser.id,
        firstname: 'test',
        lastname: 'test'
      } as UserType)
    })

    it('Get All Users should return all available users in database', async () => {
      const users = await userModel.index()
      expect(users.length).toBe(2)
    })

    it('Get Single User with id should return a user ', async () => {
      const singleUser = await userModel.show(user.id as unknown as string)
      expect(singleUser.id).toBe(user.id)
      expect(singleUser.firstname).toBe(user.firstname)
      expect(singleUser.lastname).toBe(user.lastname)
    })

    it('Update User should return a user with new values', async () => {
      const updatedUser = await userModel.update({
        ...user,
        firstname: 'ziadamer',
        lastname: 'elmessery',
        password: 'ziad123456'
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.firstname).toBe('ziadamer')
      expect(updatedUser.lastname).toBe('elmessery')
    })

    it('Delete method should delete user from database', async () => {
      const deletedUser = await userModel.delete(user.id as unknown as string)
      expect(deletedUser).toBe(`DELETED User With id = ${user.id} Successfully`)
    })

    // after writing our logic i should make sure that my user is deleted
    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
      await connection.query(sql)
      connection.release()
    })
  })
})
