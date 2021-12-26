import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../database/prismaClient'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password}: IAuthenticateClient) {
    try {
      const client = await prisma.clients.findFirst({
        where: {
          username
        }
      })

      if (!client) {
        throw new Error('Username or Password invalid.')
      }

      const passwordMatch = await compare(password, client.password)

      if (!passwordMatch) {
        throw new Error('Username or Password invalid.')
      }

      const token = sign({ username }, process.env.APP_SECRET!, { 
        subject: client.id, 
        expiresIn: '1d' 
      })
      
      return token
    } catch (err) {
      throw err
    }
  }
}