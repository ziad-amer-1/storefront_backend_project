import express from 'express'
import { ProductModel } from '../models/product.model'

const productModel = new ProductModel()

export const index = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const products = await productModel.index()
    res.json({
      data: products,
      status: 'Success',
      message: 'Products Fetched Successfully'
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
    const product = await productModel.show(req.params.productId as unknown as string)
    res.status(200).json({
      data: product,
      status: 'Success',
      message: 'Product Fetched Successfully'
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
    const product = await productModel.create(req.body)
    res.json({
      data: product,
      status: 'Success',
      message: 'Product Created Successfully'
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
    const deletedProductMessage = await productModel.delete(req.params.productId)
    res.json({
      message: deletedProductMessage,
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
    const product = await productModel.update(req.body)
    res.json({
      data: product,
      status: 'Updated Product Successfully'
    })
  } catch (err) {
    next(err)
  }
}
