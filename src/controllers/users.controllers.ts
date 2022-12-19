import express from 'express'
import { UserModel } from '../models/user.model'
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'

dotenv.config()

const router = express.Router()

const userModel = new UserModel()

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await userModel.index()
    res.json({
      data: users,
      status: 'Success',
      message: 'Users Fetched Successfully'
    })
  } catch (err) {
    next(err)
  }
}
export const show = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await userModel.show(req.params.userId as unknown as string)
    res.status(200).json({
      user: user,
      status: 'Success',
      message: 'User Fetched Successfully'
    })
  } catch (err) {
    next(err)
  }
}
export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await userModel.create(req.body)
    const tokenSecret = jwt.sign({ user: req.body }, process.env.TOKEN_SECRET as Secret)
    res.status(200).json({
      data: user,
      token: tokenSecret,
      status: 'Success',
      message: 'User Created Successfully'
    })
  } catch (err) {
    // res.send(err)
    next(err)
  }
}
export const remove = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const deletedUserMessage = await userModel.delete(req.params.userId)
    return res.json({
      message: deletedUserMessage,
      status: 'Success'
    })
  } catch (err) {
    next(err)
  }
}
export const update = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await userModel.update(req.body)
    return res.json({
      data: user,
      status: 'Updated User Successfully'
    })
  } catch (err) {
    next(err)
  }
}
export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const headerAuthentication = req.headers.authorization
    // console.log(headerAuthentication)
    const token = (headerAuthentication as string).split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as Secret)
  } catch (err) {
    res.status(401).json({
      message: `Acess Denied, Invalid token ${err}`
    })
    return
  }

  try {
    const { firstname, password } = req.body
    const user = await userModel.authenticate(firstname, password)

    if (user == null) {
      return res.status(401).json({
        status: 'error',
        message: 'the first name and pasword do not match  try again'
      })
    }

    return res.status(200).json({
      status: 'success',
      data: user,
      message: 'User Authenticated Successfully'
    })
  } catch (err) {
    return next(err)
  }
}
