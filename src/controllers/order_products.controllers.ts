import express from 'express'
import { Order_products_model } from '../models/order_products.model'

const orderProductsModel = new Order_products_model()

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const order_products = await orderProductsModel.index()
    res.json({
      data: order_products,
      status: 'Success',
      message: 'order_products Fetched Successfully'
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
    const single_order_products = await orderProductsModel.show(req.params.order_products_id as unknown as string)
    res.status(200).json({
      data: single_order_products,
      status: 'Success',
      message: 'Order product Fetched Successfully'
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
    const order_product = await orderProductsModel.create(req.body)
    res.json({
      data: order_product,
      status: 'Success',
      message: 'Order product Created Successfully'
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
    const deletedorder_productsMessage = await orderProductsModel.delete(req.params.order_products_id)
    res.json({
      message: deletedorder_productsMessage,
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
    const order_product = await orderProductsModel.update(req.body)
    res.json({
      data: order_product,
      status: 'Updated Order Products Successfully'
    })
  } catch (err) {
    next(err)
  }
}
