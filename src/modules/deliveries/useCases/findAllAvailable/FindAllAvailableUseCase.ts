import { prisma } from '../../../../database/prismaClient'

export class FindAllAvailableUseCase {

  async execute() {
    try {
      const deliveries = await prisma.deliveries.findMany({
        where: {
          end_at: null,
          id_deliveryman: null
        }
      })
      
      return deliveries
    } catch (err) {
      throw err
    }
  }
}