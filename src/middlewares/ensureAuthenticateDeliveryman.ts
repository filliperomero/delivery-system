import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export const ensureAuthenticateDeliveryman = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, process.env.APP_SECRET!) as IPayload

    request.deliverymanId = sub

    return next()
  } catch (err) {
    return response.status(401).json({ message: 'Invalid Token' })
  }
}