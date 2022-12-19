import express from 'express'
import { OrderModel } from '../models/order.model'

const orderModel = new OrderModel()

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orders = await orderModel.index()
    res.json({
      data: orders,
      status: 'Success',
      message: 'Orders Fetched Successfully'
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
    const order = await orderModel.show(req.params.orderId as unknown as string)
    res.status(200).json({
      data: order,
      status: 'Success',
      message: 'Order Fetched Successfully'
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
    const order = await orderModel.create(req.body)
    res.json({
      data: order,
      status: 'Success',
      message: 'Order Created Successfully'
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
    const deletedOrderMessage = await orderModel.delete(req.params.orderId)
    res.json({
      message: deletedOrderMessage,
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
    const order = await orderModel.update(req.body)
    res.json({
      data: order,
      status: 'Updated Order Successfully'
    })
  } catch (err) {
    next(err)
  }
}
