import { UserModel } from '../../models/user.model'
import db from '../../database'
import { UserType } from '../../types/user.type'

const userModel = new UserModel()

describe('Authentication Model Test', () => {

  describe('Test methods exist', () => {
    it('should have an authentication user model', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  
  describe('Authentication Logic', () => {
    const user: UserType = {
      firstname: 'ziad',
      lastname: 'amer',
      password: 'ziad123'
    }


    // before we do our testing I should create my user
    beforeAll(async () => {
      const createdUser = await userModel.create(user)
    })
    

    // if we pass correct user we should get the user information
    it('Athenticate method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.firstname,
        user.password as string
      )
      expect(authenticatedUser?.firstname).toBe(user.firstname)
      expect(authenticatedUser?.lastname).toBe(user.lastname)
    })

    // if we pass wrong user we should get null
    it('Authenticate method should return null for wrong user information', async () => {
      const authenticatedUser = await userModel.authenticate('wrong name', 'wrong password')
      expect(authenticatedUser).toBe(null)
    })



    // after we do our testing I should delete my user
    afterAll(async () => {
      const connection = await db.connect()
      const sql = `DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
      await connection.query(sql)
      connection.release()
    })


  })
})
