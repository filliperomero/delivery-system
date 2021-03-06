import { hash } from 'bcrypt'

import { prisma } from '../../../../database/prismaClient'

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {

  async execute({ username, password }: ICreateClient) {
    try {
      const clientExists = await prisma.clients.findFirst({
        where: {
          username: { mode: 'insensitive' }
        }
      })
  
      if (clientExists) {
        throw new Error('Client already exists')
      }
  
      const hashedPassword = await hash(password, 10)
  
      const client = await prisma.clients.create({
        data: {
          username,
          password: hashedPassword
        }
      })
  
      return client
    } catch (err) {
      throw new Error('Something happened')
    }
  }
}