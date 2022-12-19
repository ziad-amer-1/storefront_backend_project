import supertest from 'supertest'
import db from '../../database'
import { UserModel } from '../../models/user.model'
import { UserType } from '../../types/user.type'
import app from '../../index'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('Test User API Endpoints', () => {
  const user: UserType = {
    firstname: 'ziad',
    lastname: 'amer',
    password: 'ziad123'
  }

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    user.id = createdUser.id
  })

  describe('Test CRUD methods', () => {
    it('should return 200 CREATED status code', async () => {
      const res = await request.post('/api/users').set('Content-Type', 'application/json').send({
        firstname: 'ziad',
        lastname: 'amer'
      })

      const { token: userJWT } = res.body
      const { firstname, lastname, id } = res.body.data
      token = userJWT

      expect(res.status).toBe(200)
      expect(firstname).toBe('ziad')
      expect(lastname).toBe('amer')
      expect(id).toBe(2)
    })

    it('authenticate user with the right firstname and password', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstname: 'ziad',
          password: 'ziad123'
        })

      const { firstname, lastname } = res.body.data

      expect(res.status).toBe(200)
      expect(firstname).toBe(user.firstname)
      expect(lastname).toBe(user.lastname)
    })

    it('authenticate user with the wrong firstname and password', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstname: 'wrong',
          password: 'wrong123'
        })

      expect(res.status).toBe(401)
    })

    it('should return 200 to get all user', async () => {
      const res = await request.get('/api/users').send()

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })

    it('should return 200 to get a single user by id', async () => {
      const res = await request.get(`/api/users/${user.id}`).send()

      const { id, firstname, lastname } = res.body.user

      expect(res.status).toBe(200)
      expect(firstname).toBe(user.firstname)
      expect(lastname).toBe(user.lastname)
      expect(id).toBe(user.id)
    })

    it('should return 200 to update a user and give us a new user', async () => {
      const res = await request
        .patch(`/api/users`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          firstname: 'ziadamer',
          lastname: 'elmessery',
          password: 'ziad123456'
        })
      const { id, firstname, lastname } = res.body.data
      expect(res.status).toBe(200)
      expect(id).toBe(user.id)
      expect(firstname).toBe('ziadamer')
      expect(lastname).toBe('elmessery')
    })

    it('should return 200 to delete a user by id', async () => {
      const res = await request.delete(`/api/users/${user.id}`).send()
      expect(res.status).toBe(200)
      expect(res.body.message).toBe(`DELETED User With id = ${user.id} Successfully`)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(`DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;`)
    connection.release()
  })
})
