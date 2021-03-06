import { hash } from 'bcrypt'

import { prisma } from '../../../../database/prismaClient'

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {

  async execute({ username, password }: ICreateDeliveryman) {
    try {
      const deliverymanExists = await prisma.deliveryman.findFirst({
        where: {
          username: { mode: 'insensitive' }
        }
      })
  
      if (deliverymanExists) {
        throw new Error('Deliveryman already exists')
      }
  
      const hashedPassword = await hash(password, 10)
  
      const deliveryman = await prisma.deliveryman.create({
        data: {
          username,
          password: hashedPassword
        }
      })
  
      return deliveryman
    } catch (err) {
      throw err
    }
  }
}